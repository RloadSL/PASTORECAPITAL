/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import ItemList from 'components/ItemList'
import SearchBar from 'components/SearchBar'
import { useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { news, newsCategories } from 'ui/utils/test.data'
import NewsListItem from './components/newsListItem'
import style from './news.module.scss'
import starIcon from '../../../assets/img/icons/star.svg'
import { NextPage } from 'next'
import useNews from './hooks/news.hook'
import InfiniteScroll from 'react-infinite-scroll-component'
import LoadMore from 'components/LoadMoreLoading/LoadMoreLoading'
import LoadMoreLoading from 'components/LoadMoreLoading'


/**
 * Componente News y NewsFilter
 * @returns 
 */

const NewsFilters = ({ newsCats, onFilter }: any) => {
  const [isActive, setIsActive] = useState<string>('');


  return (
    <div className={style.news_filter}>
      <div className={style.news_filter_list}>
        <ul className={style.newsCategories}>
          {newsCats.map((cat: any) => {
            return (
              <li key={cat.id} className={style.newsCategories_cat}>
                <ButtonApp
                  onClick={() => {
                    //Filtro de categorias
                    setIsActive(cat.id)
                  }}
                  type='button'
                  buttonStyle={isActive === cat.id ? 'dark' : 'default'}
                  size='small'
                  icon={cat.slug === 'mis-favoritas' ? starIcon : ''}
                >
                  {cat.title}
                </ButtonApp>
              </li>
            )
          })}
        </ul>
      </div>
      <SearchBar
        placeholder={'Buscar por palabra clave'}
        onFilter={onFilter}
      />
    </div>
  )
}

const News: NextPage = () => {
  const [isActive, setIsActive] = useState(false);
  const {
    isloaded,
    total_pages,
    news,
    query,
    handleSearchNews,
    onFilter,
    loadMore,
    page
  } = useNews()

  const onClickFilter = () => {
    console.log('click en filtro');
    setIsActive(!isActive);
  }

  useEffect(() => {
    handleSearchNews()
  }, [query])

  return (
    <div className={style.news}>
      <header>
        <h1 className='main-title'>
          <FormattedMessage id={'news'} />
        </h1>
        <NewsFilters onFilter={({ search, tags }: any) => { onFilter(search) }} newsCats={newsCategories} onClickFilter={onClickFilter} />
      </header>
      <div className={style.news_container}>

        <ItemList
          items={news.map((newItem) => (
            <div key={newItem.news_url}>
              <NewsListItem isFavorite={false} toggleFavs={() => alert('FAV')} key={newItem.news_url} item={newItem} />
            </div>
          ))}
        />

        {(page < total_pages) && <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ButtonApp buttonStyle={'link'} onClick={loadMore}><p>Load more</p></ButtonApp>
        </div>}
      </div>
    </div>
  )
}

export default News;