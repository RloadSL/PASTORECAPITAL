import { News } from 'domain/News/News'
import Link from 'next/link'
import { useState, memo } from 'react'
import style from './news-list-item.module.scss'

const NewsListItem = ({
  item,
  isFavorite,
  toggleFavs
}: {
  item: News
  isFavorite: boolean
  toggleFavs: Function
}) => {
  const [isActive, setIsActive] = useState<string | undefined>()

  return (
    <div className={style.newsContent}>
      <div className={style.newsContent_info}>
        <p className={style.newsContent_info_title}>
          <Link href={item.news_url}>
            <a target={'_blank'} rel='noopener noreferrer'>
              {item.title}
            </a>
          </Link>
        </p>
        <p>{item.text}</p>
        <div className={style.newsContent_info_footer}>
          <div className={style.tickers}>
            {item.tickers.map(item => (
              <div key={item}>{item}</div>
            ))}
          </div>
          <p className={style.newsContent_date}>
            <span> {item.source_name}</span> |{' '}
            <span>{item.date.toLocaleDateString()}</span> | 
            <span>{item.sentiment}</span>
          </p>
        </div>
      </div>
      <div className={style.newsContent_fav}>
        <button
          className={`${style.favButton} ${
            isFavorite ? style.favButton_isActive : ''
          }`}
          onClick={() => toggleFavs()}
        >
          <span className='only-readers'>Añadir a favoritos</span>
        </button>
      </div>
    </div>
  )
}

export default memo(NewsListItem)
