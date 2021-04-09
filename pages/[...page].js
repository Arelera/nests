import Head from 'next/head'
import { getPageData, getAllPageIds } from '../lib/mdpages'
import Markdown from 'markdown-to-jsx'

export default function Page({ title, content }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <h2>{title}</h2>
      <Markdown>{content}</Markdown>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: getAllPageIds(),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const pageData = await getPageData(params.page.join('/'))
  return {
    props: pageData,
  }
}
