import { find, flow, get, isEmpty, keys, map, orderBy, reduce, size, unescape } from 'lodash-es'
import { lazy } from 'react'

const pages = import.meta.glob('/src/pages/**/index.jsx')
const metaes = import.meta.glob('/src/pages/**/index.meta.js')
const loaders = import.meta.glob('/src/pages/**/index.loader.js')
const layouts = import.meta.glob('/src/pages/**/index.layout.jsx')
const posts = import.meta.glob(['/src/pages/**/*.md', '!/src/pages/**/*.draft.md'])

const FILE_NAME = {
  MAIN: 'index.jsx',
  LOADER: 'index.loader.js',
  LAYOUT: 'index.layout.jsx',
  META: 'index.meta.js'
}

const getClosestLayout = (layouts) => {
  const layoutPathList = flow(
    () => keys(layouts),
    (paths) => orderBy(paths, path => size(path), 'desc'),
    (paths) => map(paths, path => path.replace(FILE_NAME.LAYOUT, ''))
  )()

  return (pagePath) => {
    const layoutPath = pagePath.replace(FILE_NAME.MAIN, FILE_NAME.LAYOUT)
    const sameLayerLayout = get(layouts, [layoutPath])
    if (sameLayerLayout) {
      return sameLayerLayout
    }

    const closestLayoutPath = find(layoutPathList, (layoutPath) => {
      return pagePath.startsWith(layoutPath)
    })
    if (isEmpty(closestLayoutPath)) {
      return
    }

    const closestLayout = get(layouts, [`${closestLayoutPath}${FILE_NAME.LAYOUT}`])
    return closestLayout
  }
}

const getCodeHighlightWithClickToClipboard = (highlightResult = {}) => {
  const { lang = '', code = '', highlight = '' } = highlightResult
  const codeHighlightWithClickToClipboard = `
    <div class='relative'>
      <div class='absolute left-2 top-2 rounded-md border bg-background text-foreground p-2 text-sm ${isEmpty(lang) ? 'hidden' : ''}'>
        ${lang.toUpperCase()}
      </div>
      <button
        class='
          absolute right-2 top-2 rounded-md border bg-background text-foreground p-2 text-sm
          [&_span]:hidden
          [&[data-status="init"]_[data-label="init"]]:inline
          [&[data-status="success"]_[data-label="success"]]:inline
          [&[data-status="error"]_[data-label="error"]]:inline
        '
        data-status='init'
        data-code='${code}'
        onclick='(function(element){
          const copyToClipboard = navigator && navigator.clipboard && navigator.clipboard.writeText;
          if (!copyToClipboard) {
            element.dataset.status = "error";
            return false;
          }
          element.dataset.status = "success"
          navigator.clipboard.writeText(element.dataset.code);
          setTimeout(function(ele){ element.dataset.status = "init"; }, 3000, element);
        })(this)'
      >
        <span data-label='init'>
          Copy
        </span>
        <span data-label='success'>
          Copied!
        </span>
        <span data-label='error'>
          Error.
        </span>
      </button>
      ${highlight}
    </div>
  `
  return codeHighlightWithClickToClipboard
}

const getConvertedPosts = (posts) => {
  const convertedPosts = reduce(posts, (collect, post, postKey) => {
    const postFolder = postKey.replace('/index.md', '')
    const result = (async () => {
      const { codeToHtml } = await import('shiki')
      const { html: originHtml, attributes } = await post()
      const html = unescape(
        originHtml
          // RWD table
          .replace(/<table[\s\S]*?<\/table>/g, (match) => {
            return `<div data-table class="[&[data-table]]:overflow-x-auto">${match}</div>`
          })
          // Format links
          // .replace(/\bhttps?:\/\/[^\s<]+|\bwww\.[^\s<]+/g, (match) => {
          //   return `<a href="${match}">${match}</a>`
          // })
          // Outside links need to open new tab
          .replace(/<a([^>]*\shref="https:\/\/[^"]*")/g, '<a$1 target="_blank" class="break-all" referrerpolicy="no-referrer"')
          // Same folder image
          .replace(/<img src="([^"]+)"/g, (_, imageFileName) => {
            const fileUrl = `${postFolder}/${imageFileName}`
            return `<img src="${fileUrl}"`
          })
      )

      const matches = [...html.matchAll(/<pre><code class="language-(.*)">([\s\S]*?)<\/code><\/pre>/g)].map((matches) => {
        const [replacement, lang, code] = matches
        return { replacement, lang, code }
      })
      const results = await Promise.all(
        matches.map((match) => {
          const { lang, code } = match
          return codeToHtml(code, {
            lang,
            themes: { light: 'github-light', dark: 'github-dark' },
            defaultColor: false
          }).then((highlight) => ({ lang, code, highlight }))
        })
      )
      let highlightHtml = html
      for (const [index, match] of matches.entries()) {
        const { replacement } = match
        const highlightResult = get(results, index, {})
        highlightHtml = highlightHtml.replace(
          replacement,
          getCodeHighlightWithClickToClipboard(highlightResult)
        )
      }
      return { html: highlightHtml, attributes }
    })
    collect[postKey] = result
    return collect
  }, {})
  return convertedPosts
}

const getRoutes = () => {
  const convertedPosts = getConvertedPosts(posts)
  const getClosestLayoutFromGlob = getClosestLayout(layouts)
  const routes = flow(
    () => {
      const entires = {
        ...pages,
        ...convertedPosts
      }
      return entires
    },
    (pagesEntries) => Object.keys(pagesEntries).reduce((collect, filePath) => {
      const page = pagesEntries[filePath]
      const fileName = filePath.replace('/src/pages', '').replace('.jsx', '').replace('.md', '')
      const path = filePath.replace('.md', '.jsx')
      const loaderPath = path.replace(FILE_NAME.MAIN, FILE_NAME.LOADER)
      const metaPath = path.replace(FILE_NAME.MAIN, FILE_NAME.META)
      if (!fileName) {
        return collect
      }

      const normalizedPathName = fileName
        .replace('$', ':')
        .replace(/\/index/, '')
        .split('/')
        .map(splitPath => splitPath.toLowerCase())
        .join('/')

      const isIndex = fileName === '/index'
      const pageLoader = get(loaders, loaderPath)
      const pageMeta = get(metaes, metaPath)
      const layout = getClosestLayoutFromGlob(path)
      const isMarkdown = filePath.endsWith('.md')
      collect.push({
        isMarkdown,
        markdown: isMarkdown ? page : undefined,
        filePath,
        path: isIndex ? '/' : `${normalizedPathName}/`,
        element: isMarkdown ? undefined : lazy(page),
        layout: layout ? lazy(layout) : undefined,
        meta: (isMarkdown || !pageMeta)
          ? undefined
          : () => pageMeta().then((module) => module.default),
        loader: pageLoader
          ? (...args) => pageLoader().then((module) => module.default(...args))
          : null
      })
      return collect
    }, [])
  )()
  return routes
}

export default getRoutes
