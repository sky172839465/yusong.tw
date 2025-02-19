import fs from 'fs'
import yaml from 'js-yaml'
import { toString } from 'lodash-es'
import path from 'path'
import { tryit } from 'radash'
import { simpleGit } from 'simple-git'

const updateArticleFrontmatter = async () => {
  const stdout = await simpleGit().raw(['diff', '--name-status', 'origin/main'])
  const lines = stdout.trim().split('\n')

  const modifiedMarkdownFiles = lines
    .map(line => line.split('\t'))
    .filter(([status, file]) => (status === 'M' || status === 'A') && file.endsWith('.md'))
    .map(([, file]) => file)

  const today = new Date().toISOString()

  await Promise.all(modifiedMarkdownFiles.map(async (file) => {
    const filePath = path.join(process.cwd(), file)
    const [error] = await tryit(() => fs.promises.access(path.dirname(filePath)))()
    if (error) {
      return
    }

    let content = await fs.promises.readFile(filePath, 'utf8')
    const match = content.match(/^---\n([\s\S]+?)\n---/)

    if (!match) {
      return
    }

    let frontmatter = yaml.load(match[1])
    if (!frontmatter.modifiedAt) {
      return
    }

    console.log('modifiedAt', toString(frontmatter.modifiedAt), today)
    if (toString(frontmatter.modifiedAt).includes(today.split('T')[0])) {
      return
    }

    frontmatter.modifiedAt = today
    const updatedFrontmatter = `---\n${yaml.dump(frontmatter).replaceAll('\'', '"')}---`
    content = content.replace(match[0], updatedFrontmatter)
    return fs.promises.writeFile(filePath, content, 'utf8')
  }))

  process.exit(0)
}

updateArticleFrontmatter()
