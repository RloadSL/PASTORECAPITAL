import { Post } from 'domain/Post/Post'
import { FormattedMessage } from 'react-intl'
import style from './latestArticles.module.scss'

interface LATESTARTICLESPROPS {
  articlesList: Post[]
}

export default function LatestArticles({ articlesList }: LATESTARTICLESPROPS) {
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
                <p className={style.articleTitle}>{article.title.raw}</p>
                <p>{article.excerpt.raw}</p>
                <div className={style.authorContainer}><span className={style.author}>{article.author?.name}</span><span>{article.created_at.toLocaleDateString()}</span></div>
              </div>
            </li>
          )
        })}
      </ul>

    </div>
  )
}