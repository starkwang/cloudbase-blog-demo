import ReactMarkdown from 'react-markdown'
import Nav from '../../components/nav'

import '../../styles/post.less'

export default ({ title, content }) => {
    return <div className="container">
        <h1 className="title">{title}</h1>
        <Nav/>
        <div className="content">
            <ReactMarkdown source={content} />
        </div>
    </div>
}

export async function getStaticProps({ params }) {
    const { db } = require('../../service/db')
    const { slug } = params
    const res = await db.collection('articles').where({
        slug: slug
    }).get()

    const article = res.data[0]

    return {
        props: {
            title: article.title,
            content: article.content
        }
    }
}

export async function getStaticPaths() {
    const { db } = require('../../service/db')
    const res = await db.collection('articles').where({}).get()
    const articles = res.data
    return {
        paths: articles.map(article => {
            return {
                params: { slug: article.slug }
            }
        }),
        fallback: false
    }
}