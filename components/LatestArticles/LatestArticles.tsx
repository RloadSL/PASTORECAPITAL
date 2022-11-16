import { Post } from 'domain/Post/Post'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import style from './latestArticles.module.scss'

interface LATESTARTICLESPROPS {
  articlesList: Post[]
}

export default function LatestArticles({ articlesList }: LATESTARTICLESPROPS) {
const { asPath, query } = useRouter()

  return (
    <div className={style.latestArticlesContainer}>
      <p className='small-caps'>
        <FormattedMessage id='Artículos destacados' />
      </p>
      <ul>
        {articlesList.map((article, index:number) => {
          return (
            <li key={index}>
              <div>
                <Link href={{pathname: asPath.split('?')[0] + article.slug, query: {
                  ...query,
                  post_id: article.id,
                  post_title: article.title.rendered
                }}}>
                  <p className={style.articleTitle}>{article.title.rendered}</p>
                </Link>
                
                <p>{article.excerpt.rendered}</p>
                <div className={style.authorContainer}><span className={style.author}>{article.author?.name}</span><span>{article.created_at.toLocaleDateString()}</span></div>
              </div>
            </li>
          )
        })}
      </ul>

    </div>
  )
}