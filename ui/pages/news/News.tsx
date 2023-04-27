/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import ItemList from 'components/ItemList'
import SearchBar from 'components/SearchBar'
import { useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { news, newsCategories } from 'ui/utils/test.data'
import NewsListItem from './components/newsListItem'
import style from './news.module.scss'
import starIcon from '../../../assets/img/icons/star.svg'
import { NextPage } from 'next'
import useNews from './hooks/news.hook'
import { News, TICKERS } from 'domain/News/News'
import newsRepository from 'infrastructure/repositories/news.repository'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import LoadMore from 'components/LoadMoreLoading/LoadMoreLoading'

/**
 * Componente News y NewsFilter
 * @returns
 */

const NewsFilters = ({ onFilter, onTicker, isloaded }: any) => {
  const [isActive, setIsActive] = useState<string[]>(['AllTickers'])
  const tickers = useRef(Object.keys(TICKERS)).current
  const intl = useIntl()


  return (
    <div className={style.news_filter}>
      <div  className={style.news_filter_list}>
        <ul className={style.newsCategories}>
          <li>
            <ButtonApp
              disable={!isloaded}
              onClick={() => {
                onTicker(['AllTickers'])
                setIsActive(['AllTickers'])
              }}
              labelID='page.news.All Tickers'
              type='button'
              buttonStyle={isActive.includes('AllTickers') ? 'dark' : 'default'}
              size='small'
            />
          </li>
          <li>
            <ButtonApp
              disable={!isloaded}
              onClick={() => {
                onTicker(['Mis favoritas'])
                setIsActive(['Mis favoritas'])}}
              type='button'
              buttonStyle={
                isActive.includes('Mis favoritas') ? 'dark' : 'default'
              }
              size='small'
              icon={starIcon}
              labelID='page.news.Favorites'
            />
          </li>
        </ul>
        <ul className={style.newsCategories}>
          {tickers.map((ticker: string) => {
            return (
              <li key={ticker} className={style.newsCategories_cat}>
                <ButtonApp
                  disable={!isloaded}
                  onClick={() => {
                    setIsActive(pre => {
                      if (pre.includes(ticker)) {
                        const i = pre.findIndex(item => ticker === item)
                        if (i != -1) pre.splice(i, 1)
                      } else {
                       pre = [ticker]
                        const i = pre.findIndex(item => 'AllTickers' === item)
                        if (i != -1) pre.splice(i, 1)
                      }

                      if (ticker === 'AllTickers' || pre.length == 0)
                        pre = ['AllTickers']
                      if (ticker === 'Mis favoritas') pre = ['Mis favoritas']
                      else {
                        const i = pre.findIndex(
                          item => 'Mis favoritas' === item
                        )
                        if (i != -1) pre.splice(i, 1)
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
      <SearchBar placeholder={intl.formatMessage({id:'component.filter-search-bar.label'})} onFilter={onFilter} />
    </div>
  )
}

const News: NextPage = () => {
  const userLogged = useSelector(getUserLogged)
  const [isActive, setIsActive] = useState(false)
  const [{showFav,favNews}, setFavNews] = useState<{showFav: boolean, favNews: News[]}>({showFav:false,favNews:[]})

  const {
    total_pages,
    news,
    isloaded,
    query,
    handleSearchNews,
    onFilter,
    loadMore,
    page
  } = useNews()
  const handleFav = async (action: 'remove' | 'add' | 'get', favNew?: News) => {
    switch (action) {
      case 'add':
        if (favNew) await newsRepository.addToFav(favNew, userLogged?.uid)
        break
      case 'remove':
        if (favNew){
          setFavNews(pre => {
            const {favNews} = pre
            const i = favNews.findIndex(
              item => favNew.id === item.id
            )
            if (i != -1) favNews.splice(i, 1)
            return {...pre, favNews: [...favNews]}
          })
          
          await newsRepository.removeFav(favNew.id as string)
        } 
        break
      case 'get':
        newsRepository.getFavs(userLogged?.uid).then(res => {
          setFavNews({showFav: true , favNews: [...res]})
        })
        break
      default:
        break
    }
  }

  const onClickFilter = (t: string) => {
    if (t.indexOf('Mis favoritas') != -1) {
      handleFav('get')
    } else {
      setFavNews({showFav: false , favNews : []})
      onFilter(undefined, t)
    }
    setIsActive(!isActive)
  }

  useEffect(() => {
    handleSearchNews(null, isloaded)
  }, [query])

  return (
    <div className={style.news}>
      <header>
        <h1 className='main-title'>
          <FormattedMessage id={'news'} />
        </h1>
        <NewsFilters
          isloaded={isloaded}
          onTicker={(t: string[]) => onClickFilter(t.toString())}
          onFilter={({ search, tags }: any) => {
            onFilter(search)
          }}
          newsCats={newsCategories}
          onClickFilter={onClickFilter}
        />
      </header>
      <div className={style.news_container}>
        {isloaded ? <ItemList
          items={(showFav ? favNews : news).map(newItem => (
            <div key={newItem.news_url}>
              <NewsListItem
                uid={userLogged?.uid}
                toggleFavs={(action: 'add' | 'remove') =>
                  handleFav(action, newItem)
                }
                key={newItem.news_url}
                item={newItem}
              />
            </div>
          ))}
        /> : <LoadMore/>}

        {(page < total_pages && !showFav && isloaded) && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ButtonApp buttonStyle={'link'} onClick={loadMore}>
              <p>Load more</p>
            </ButtonApp>
          </div>
        )}
      </div>
    </div>
  )
}

export default News
