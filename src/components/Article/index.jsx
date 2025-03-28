import parse from 'html-react-parser'
import { filter, flow, get, isEmpty, map } from 'lodash-es'
import { Check, Copy, FilePlus2, Link as LinkIcon, Pencil, PencilLine } from 'lucide-react'
import { tryit } from 'radash'
import { lazy, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'
import useSWR from 'swr'
import { useCopyToClipboard, useCounter } from 'usehooks-ts'

import { usePageImages } from '@/apis/usePageImages'
import ArticleActions from '@/components/ArticleActions'
import LazyImagePreview from '@/components/LazyImage/Dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import useI18N, { LANG } from '@/hooks/useI18N'

import FadeIn from '../FadeIn'
import SkeletonArticle from '../SkeletonArticle'

const LazyComment = lazy(() => import('@/components/Comments'))

const i18nMapping = {
  [LANG.EN]: {
    COPY: 'Copy',
    COPIED: 'Copied!',
    COPY_ERROR: 'Error.'
  },
  [LANG.ZH_TW]: {
    COPY: '複製',
    COPIED: '已複製！',
    COPY_ERROR: '錯誤'
  }
}

const getSections = (html) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const result = flow(
    () => [...(doc.querySelectorAll('h3 a') || [])],
    (links) => filter(links, (link) => link.href.includes('#')),
    (hashLinks) => map(hashLinks, (hashLink) => ({
      hash: hashLink.getAttribute('href'),
      label: get(hashLink, 'textContent', 'Empty').replace('🔗 ', '')
    }))
  )()
  return result
}

const useMainImageData = (mainImageName = 'index') => {
  const { isLoading, data: pageImages } = usePageImages()
  const { mainPathName } = useI18N(i18nMapping)
  const imagePathFromSrc = useMemo(() => {
    const imagePathFromSrc = `/src/pages${(mainPathName.endsWith('/') ? mainPathName : `${mainPathName}/`)}images/${mainImageName}`
    return imagePathFromSrc
  }, [mainPathName, mainImageName])
  if (isLoading || !imagePathFromSrc) {
    return null
  }

  const mainImageUrl = imagePathFromSrc.replace('/', '')
  const imageData = pageImages[`${mainImageUrl}.jpg`] || pageImages[`${mainImageUrl}.png`]
  return imageData
}

const useArticleHtml = (html) => {
  const { pathname, mainPathName } = useI18N()
  const { isLoading, data: pageImages } = usePageImages()
  const [, copy] = useCopyToClipboard()
  const [copied, setCopied] = useState(false)
  const sections = useMemo(() => getSections(html), [html])
  const articleHtml = useMemo(() => {
    const onCopy = (code) => async () => {
      const [error] = await tryit(() => copy(code))()
      setCopied(true)
      if (error) {
        setCopied(false)
        return
      }
  
      setTimeout(() => setCopied(false), 1200)
    }

    if (isLoading) {
      return ''
    }

    if (isEmpty(pageImages)) {
      return parse(html)
    }

    const convertedHtml = parse(html, {
      replace: (domNode) => {
        const dataComponent = get(domNode, 'attribs["data-component"]')
        if (domNode.type === 'tag' && domNode.name === 'button' && dataComponent === 'copy-to-clipboard') {
          const code = get(domNode, 'attribs.data-code', '')
          return (
            <Button
              variant='outline'
              size='icon'
              className='absolute right-2 top-2 rounded-md border bg-background p-2 text-foreground [&[disabled]]:pointer-events-none [&[disabled]]:opacity-50'
              onClick={onCopy(code)}
              disabled={copied}
            >
              <FadeIn>
                {!copied && <Copy />}
                {copied && <Check />}
              </FadeIn>
            </Button>
          )
        }

        if (domNode.type === 'tag' && domNode.name === 'img') {
          const { src, alt } = domNode.attribs
          const pageImageData = pageImages[src.replace(pathname, mainPathName).replace('/', '')]
          return (
            <LazyImagePreview
              imageData={pageImageData}
              alt={alt}
              className='w-full rounded-lg object-contain'
              isLoading={isLoading}
            />
          )
        }

        if (domNode.type === 'tag' && domNode.name === 'a' && domNode.attribs.href.startsWith('/')) {
          const text = domNode.children.map((child) => child.type === 'text' ? child.data : '').join('')
          return (
            <Link
              to={domNode.attribs.href}
              viewTransition
            >
              {text}
            </Link>
          )
        }

        if (domNode.type === 'tag' && domNode.name === 'a' && domNode.attribs.href.startsWith('#')) {
          const text = domNode.children.map((child) => child.type === 'text' ? child.data : '').join('')
          return (
            <a
              id={domNode.attribs.href.replace('#', '')}
              href={domNode.attribs.href}
              onClick={(e) => {
                e.preventDefault()
                const header = document.querySelector('header')            
                const offset = (header ? get(header.getBoundingClientRect(), 'height', 70) : 70) + 30
                const top = e.target.getBoundingClientRect().top + window.scrollY - offset
                window.scrollTo({ top, behavior: 'smooth' })
              }}
              className='flex items-center gap-2'
            >
              <LinkIcon />
              {text}
            </a>
          )
        }
      }
    })
    return convertedHtml
  }, [html, pageImages, isLoading, pathname, mainPathName, copied, copy])
  return { sections, articleHtml }
}

const DEFAULT_TITLE = 'YUSONG.TW'

const Article = (props) => {
  const { filePath, markdown } = props
  const articleRef = useRef()
  const topRef = useRef()
  const { pathname } = useLocation()
  const { isZhTw, lang } = useI18N()
  const { data, isValidating: isMarkdownLoading } = useSWR(filePath, markdown, { suspense: true })
  const { isLoading } = usePageImages()
  const { html, attributes } = data
  const { title, description, createdAt, modifiedAt, tags, mainImage } = attributes
  const mainImageData = useMainImageData(mainImage)
  const { sections, articleHtml } = useArticleHtml(html)
  const { count, increment } = useCounter(0)
  const displayTitle = `${title}${title === DEFAULT_TITLE ? '' : ` | ${DEFAULT_TITLE}`}`
  
  const shareData = {
    title: displayTitle,
    url: window.location.href
  }

  if (isMarkdownLoading || isEmpty(articleHtml)) {
    return (
      <>
        {!isMarkdownLoading && (
          <Helmet key={pathname}>
            <title>
              {displayTitle}
            </title>
            <meta name='description' content={description} />
            <meta property='og:type' content='article' />
            <meta property='og:url' content={shareData.url} />
            <meta property='og:title' content={displayTitle} />
            <meta property='og:description' content={description} />
          </Helmet>
        )}
        <SkeletonArticle />
      </>
    )
  }

  return (
    <>
      <Helmet key={pathname}>
        <title>
          {displayTitle}
        </title>
        <meta name='description' content={description} />
        <meta property='og:type' content='article' />
        <meta property='og:url' content={shareData.url} />
        <meta property='og:title' content={displayTitle} />
        <meta property='og:description' content={description} />
      </Helmet>
      <div className='prose prose-lg mx-auto flex flex-col gap-2 dark:prose-invert'>
        <h1
          ref={topRef}
          className='!mb-4 text-4xl font-bold text-gray-900 dark:text-white'
          onClick={increment}
        >
          {title}
        </h1>
        <div className='flex flex-row items-center justify-between'>
          <div className={`flex flex-wrap gap-2 ${isEmpty(tags) ? 'hidden' : ''}`}>
            <Badge variant='secondary' className='h-9'>
              {createdAt === modifiedAt && (
                <>
                  <FilePlus2 className='mr-1 size-4' />
                  {new Date(createdAt).toLocaleDateString()}
                </>
              )}
              {createdAt !== modifiedAt && (
                <>
                  <PencilLine className='mr-1 size-4' />
                  {new Date(modifiedAt).toLocaleDateString()}
                </>
              )}
            </Badge>
            <div className='h-9'>
              <Separator orientation='vertical' />
            </div>
            {tags.map((tag, index) => {
              return (
                <Link
                  key={index}
                  to={`/${isZhTw ? '' : `${lang}/`}search?tags=${tag}`}
                  viewTransition
                >
                  <Badge variant='secondary' className='h-9'>
                    {tag}
                  </Badge>
                </Link>
              )
            })}
          </div>
          <a
            href={`https://github.com/sky172839465/yusong.tw/blob/main/${filePath}`}
            target='_blank'
            className={count >= 10 ? 'inline' : 'hidden'}
          >
            <Button variant='outline'>
              <Pencil />
              <span className='hidden md:inline'>
                Edit on GitHub
              </span>
            </Button>
          </a>
        </div>
        <LazyImagePreview
          imageData={mainImageData}
          alt={title}
          className={`w-full rounded-lg object-contain md:object-cover ${isEmpty(mainImageData) ? 'my-8' : ''}`}
          isLoading={isLoading}
          loading='eager'
        />
        <div
          key={pathname}
          ref={articleRef}
          className='max-w-none !bg-background !text-foreground'
        >
          {articleHtml}
        </div>
        <ArticleActions
          topRef={topRef}
          shareData={shareData}
          sections={sections}
        />
        <LazyComment />
      </div>
    </>
  )
}

export default Article
