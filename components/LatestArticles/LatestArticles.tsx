import React from 'react'
import { FormattedMessage } from 'react-intl'
import style from './latestArticles.module.scss'

interface LATESTARTICLESPROPS {
  articlesList: any
}

export default function LatestArticles({ articlesList }: LATESTARTICLESPROPS) {
  return (
    <div className={style.latestArticlesContainer}>
      <p>
        <FormattedMessage id='Últimas publicaciones' />
      </p>
      <ul>
        {articlesList.map((article, index) => {
          return (
            <li key={index}>
            <div>
              <p>{article.title}</p>
              <p>{article.description}</p>
              <div></div>
            </div>
          </li>
            )
        })}
      </ul>

    </div>
  )
}