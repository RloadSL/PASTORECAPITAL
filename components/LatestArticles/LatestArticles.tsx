import { Post } from 'domain/Post/Post'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import style from './latestArticles.module.scss'

interface LATESTARTICLESPROPS {
  articlesList: Post[],
  onClickItem: Function
}

export default function LatestArticles({ articlesList , onClickItem}: LATESTARTICLESPROPS) {
const { asPath, query } = useRouter()
  return (
    <div className={style.latestArticlesContainer}>
      <p className='small-caps'>
        <FormattedMessage id='page.analysis.articles.featured_articles' />
      </p>
      <ul>
        {articlesList.map((article) => {
          return (
            <li onClick={()=>onClickItem(article)} style={{cursor: 'pointer'}} key={article.id}>
              <div>
               
                  <p className={style.articleTitle}>{article.title.rendered}</p>
                
                
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