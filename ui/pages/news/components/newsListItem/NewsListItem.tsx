import Link from 'next/link'
import { useState, memo } from 'react';
import style from './news-list-item.module.scss'

const NewsListItem = ({ item }: any) => {
  const [isActive, setIsActive] = useState<string | undefined>();

  const toggleFavs = () => {
    console.log('añadir a favoritos');
    setIsActive(prev => prev ? undefined : item.id)
  }

  return (
    <div className={style.newsContent}>
      <div className={style.newsContent_info}>
        <p className={style.newsContent_date}>{item.date}</p>
        <p className={style.newsContent_info_title}>
          <Link href={item.href}>
            <a target={'_blank'} rel="noopener noreferrer">
              {item.title}
            </a>
          </Link>
        </p>
      </div>
      <div className={style.newsContent_fav}>
        <button className={`${style.favButton} ${isActive === item.id ? style.favButton_isActive : ''}`} onClick={toggleFavs}>
          <span className='only-readers'>Añadir a favoritos</span>
        </button>
      </div>
    </div>
  )
}

export default memo(NewsListItem)