/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import ItemList from 'components/ItemList'
import SearchBar from 'components/SearchBar'
import { useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { news,newsCategories } from 'ui/utils/test.data'
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

const NewsFilters = ({newsCats,onFilter}:any) => {
  const [isActive, setIsActive] = useState<string>('');
  

  return (
    <div className={style.news_filter}>
      <div>
        <ul className={style.newsCategories}>
        {newsCats.map((cat:any) => {
          return (
            <li key={cat.id} className={style.newsCategories_cat}>
              <ButtonApp
                onClick={()=>{
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

const News:NextPage = () => {
  const [isActive, setIsActive] = useState(false);
  const {
    isloaded,
    total_pages,
    news,
    query,
    handleSearchNews,
    setNews,
    onFilter,
    loadMore
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
          <FormattedMessage id={'Noticias'} />
        </h1>
        <NewsFilters onFilter={({search, tags}: any)=>{onFilter(search)}} newsCats={newsCategories} onClickFilter={onClickFilter}/>
      </header>
      <div className={style.news_container}>
        <InfiniteScroll
          next={()=>loadMore()}
          dataLength={news.length}
          loader={<LoadMoreLoading/>}
          hasMore={total_pages > query.page}
        >
        <ItemList
          items={news.map((newItem) => (
            <NewsListItem isFavorite={false} toggleFavs={()=>alert('FAV')} key={newItem.news_url} item={newItem} />
          ))}
        />
        </InfiniteScroll>
       
      </div>
    </div>
  )
}

export default News;