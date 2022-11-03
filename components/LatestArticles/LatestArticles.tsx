import { FormattedMessage } from 'react-intl'
import style from './latestArticles.module.scss'

interface LATESTARTICLESPROPS {
  articlesList: any
}

export default function LatestArticles({ articlesList }: LATESTARTICLESPROPS) {
  return (
    <div className={style.latestArticlesContainer}>
      <p className='small-caps'>
        <FormattedMessage id='Artículos destacados' />
      </p>
      <ul>
        {articlesList.map((article:any, index:number) => {
          return (
            <li key={index}>
              <div>
                <p className={style.articleTitle}>{article.title}</p>
                <p>{article.description}</p>
                <div className={style.authorContainer}><span className={style.author}>{article.author}</span><span>{article.date}</span></div>
              </div>
            </li>
          )
        })}
      </ul>

    </div>
  )
}