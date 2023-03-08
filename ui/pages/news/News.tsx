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
import { TICKERS } from 'domain/News/News'


/**
 * Componente News y NewsFilter
 * @returns 
 */

const NewsFilters = ({ onFilter, onTicker }: any) => {
  const [isActive, setIsActive] = useState<string[]>(['AllTickers']);
  const tickers = useRef(Object.keys(TICKERS)).current

  return (
    <div className={style.news_filter}>
      <div className={style.news_filter_list}>
        <ul className={style.newsCategories}>
          {tickers.map((ticker: string) => {
            return (
              <li key={ticker} className={style.newsCategories_cat}>
                <ButtonApp
                  onClick={() => {
                    setIsActive((pre) => {
                      if(pre.includes(ticker)){
                        const i = pre.findIndex(item => ticker === item)
                        if(i != -1)pre.splice(i, 1)
                      }else{
                        pre.push(ticker)
                        const i = pre.findIndex(item => 'AllTickers' === item)
                        if(i != -1)pre.splice(i, 1)
                      }
                    
                      if(ticker === 'AllTickers' || pre.length == 0) pre = ['AllTickers']
                      if(ticker === 'Mis favoritas') pre = ['Mis favoritas']
                      else{
                        const i = pre.findIndex(item => 'Mis favoritas' === item)
                        if(i != -1)pre.splice(i, 1)
                      }
                      onTicker(pre)
                      return [...pre]
                    })
                  }}
                  type='button'
                  buttonStyle={isActive.includes(ticker) ? 'dark' : 'default'}
                  size='small'
                  icon={ticker === 'Mis favoritas' ? starIcon : ''}
                >
                  {ticker}
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
    total_pages,
    news,
    query,
    handleSearchNews,
    onFilter,
    loadMore,
    page
  } = useNews()

  const onClickFilter = (t:string) => {
    if(t.indexOf('Mis favoritas') != -1){
      alert('Fav')
    }else{
      onFilter(undefined, t)
    }
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
        <NewsFilters onTicker={(t:string[])=> onClickFilter(t.toString())} onFilter={({ search, tags }: any) => { onFilter(search) }} newsCats={newsCategories} onClickFilter={onClickFilter} />
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