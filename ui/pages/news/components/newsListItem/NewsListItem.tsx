import { News } from 'domain/News/News'
import newsRepository from 'infrastructure/repositories/news.repository'
import Link from 'next/link'
import { useState, memo, useRef, useEffect } from 'react'
import style from './news-list-item.module.scss'

const NewsListItem = ({
  item,
  toggleFavs,
  uid
}: {
  item: News
  toggleFavs: Function
  uid: string
}) => {
  const [isActive, setIsActive] = useState<string | undefined>()
  const [isFavorite, setIsFavorite] = useState<boolean>(false)


  useEffect(() => {
   newsRepository.isFav(item.news_url, uid )
   .then(fav => setIsFavorite(fav))
  }, [])
  
  return (
    <div className={style.newsContent}>
      <div className={style.newsContent_info}>
        <h2 className={style.newsContent_info_title}>
          <Link href={item.news_url}>
            <a target={'_blank'} rel='noopener noreferrer'>
              {item.title}
            </a>
          </Link>
        </h2>
        <p>{item.text}</p>
        <div className={style.newsContent_info_footer}>
          <div className={style.tickers}>
            {item.tickers.map(item => (
              <div key={item}>{item}</div>
            ))}
          </div>
          <p className={style.newsContent_date}>
            <span> {item.source_name}</span> |{' '}
            <span>{item.date.toLocaleDateString()}</span>
           {/*  <span>{item.sentiment}</span> */}
          </p>
        </div>
      </div>
      <div className={style.newsContent_fav}>
        <button
          className={`${style.favButton} ${
            isFavorite ? style.favButton_isActive : ''
          }`}
          onClick={() => toggleFavs(isFavorite ? 'remove' : 'add')}
        >
          <span className='only-readers'>Añadir a favoritos</span>
        </button>
      </div>
    </div>
  )
}

export default memo(NewsListItem)
