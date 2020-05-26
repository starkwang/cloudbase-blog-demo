import Link from 'next/link'
import Nav from '../components/nav'

import config from '../config'

import '../styles/index.less'

export default function Home({ articles }) {
  return (
    <div className="container">
      <h1 className="title">{config.title}</h1>
      <Nav />
      {
        articles.map(article => {
          return (
            <li className="post" key={article.title}>
              <p>{article.date}</p>
              <Link href={`/post/[slug]`} as={`/post/${article.slug}`}>
                <a>{article.title}</a>
              </Link>
            </li>
          )
        })
      }
    </div>
  )
}

export async function getStaticProps() {
  const { db } = require('../service/db')
  const { data } = await db.collection('articles').where({}).get()
  return {
    props: {
      articles: data
        .sort((a, b) => {
          return b.createTime.getTime() - a.createTime.getTime()
        })
        .map(x => {
          return {
            title: x.title,
            slug: x.slug,
            date: x.createTime.toLocaleDateString()
          }
        })
    }
  }
}
