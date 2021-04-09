import fs from 'fs'
import path from 'path'
import glob from 'glob'
import matter from 'gray-matter'
import remark from 'remark'

const mdpagesDir = path.join(process.cwd(), 'mdpages')

export function getAllPageIds() {
  return glob
    .sync('mdpages/**/**.md')
    .map((id) => id.replace('mdpages', '').replace(/\.md$/, ''))
}

export async function getPageData(id) {
  const filePath = path.join(mdpagesDir, `${id}.md`)
  const fileData = fs.readFileSync(filePath, 'utf8')

  const matterResults = matter(fileData)

  const processed = await remark().process(matterResults.content)

  return {
    id,
    ...matterResults.data,
    content: processed.contents,
  }
}
