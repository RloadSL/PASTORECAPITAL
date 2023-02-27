import ButtonApp from 'components/ButtonApp'
import InputFileFormikApp from 'components/FormApp/components/InputFileFormikApp'
import ItemList from 'components/ItemList'
import Loading from 'components/Loading'
import Modal from 'components/Modal'
import SearchBar from 'components/SearchBar'
import { Webinars } from 'domain/Webinars/Webinars'
import { ELASTIC_QUERY } from 'infrastructure/elasticsearch/search.elastic'
import webinarsRepository from 'infrastructure/repositories/webinars.repository'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Calendar } from 'react-calendar'
import { LoadingIndicator } from 'react-select/dist/declarations/src/components/indicators'
import { isLoading } from 'ui/redux/slices/authentication/authentication.selectors'
import SetWebinar from './components/CreateWebinar/SetWebinar'
import ItemListWebinar from './components/ItemListWebinar/ItemListWebinar'
import WebinarsCalendar from './components/WebinarsCalendar/WebinarsCalendar'
import style from './webinars.module.scss'

const Webinars = () => {
  const [openedit, setopenedit] = useState(false)
  const [webinars, setWebinars] = useState<Webinars[]>([])
  const [isloaded, setLoaded] = useState(false)
  const [query, setQuery] = useState<ELASTIC_QUERY>({ query: '' })
  const [pages, setPages] = useState<any>()
  useEffect(() => {
    _handleSearchWebinars(query)
  }, [query])

  const onSetWebinars = async (webinar: Webinars) => {
    await webinarsRepository.set(webinar)
    setopenedit(false)
  }
  const _handleSearchWebinars = async (query: ELASTIC_QUERY) => {
    let fetching = true
    if (!isloaded) {
      const response = await webinarsRepository.elasticSearch(query)
      if (fetching) {
        setLoaded(true)
        setPages(response.page)
        setWebinars(pre => [...response.results, ...pre])
      }
    }
    return () => (fetching = false)
  }

  const _loadMore = () => {
    if (isloaded) {
      setLoaded(false)
      setQuery(pre => {
        const current = pre.page?.current || 1

        return {
          ...pre,
          page: {
            current: current + 1,
            size: 10
          }
        }
      })
    }
  }

  const onFilter = async (s: string) => {
    if (isloaded) {
      setLoaded(false)
      setWebinars([])
      setQuery(pre => ({
        ...pre,
        query: s
      }))
    }
  }

  return (
    <div>
      <h1>Webinars</h1>
      <div>
        <ButtonApp onClick={() => setopenedit(true)}>Open edit</ButtonApp>
      </div>
      <div className={style.filtersSearchContainer}>
        <SearchBar
          enableTags={false}
          placeholder={'page.administration.users.filter.placeholder'}
          onFilter={(value: { search?: string; tags?: string }) =>
            onFilter(value.search as string)
          }
        />
      </div>
      <div>
        <div>
          {webinars.map(item => (
            <div key={item.id}>
              <ItemListWebinar item={item} />
            </div>
          ))}
          <div>
            {pages?.current < pages?.total_pages && (
              <ButtonApp onClick={_loadMore}>LoadMore</ButtonApp>
            )}
          </div>
        </div>
        <div>
            <WebinarsCalendar items={webinars}/>
        </div>
        {openedit && (
          <Modal onBtnClose={() => setopenedit(false)}>
            <SetWebinar onCreate={onSetWebinars} />
          </Modal>
        )}
      </div>
      <Loading loading={!isloaded} variant='inner-secondary' />
    </div>
  )
}

export default Webinars
