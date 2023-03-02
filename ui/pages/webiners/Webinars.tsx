import ButtonApp from 'components/ButtonApp'
import InputFileFormikApp from 'components/FormApp/components/InputFileFormikApp'
import ItemList from 'components/ItemList'
import LinkApp from 'components/LinkApp'
import Loading from 'components/Loading'
import Modal from 'components/Modal'
import SearchBar from 'components/SearchBar'
import { Webinars } from 'domain/Webinars/Webinars'
import { ELASTIC_QUERY } from 'infrastructure/elasticsearch/search.elastic'
import webinarsRepository from 'infrastructure/repositories/webinars.repository'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'
import { Calendar } from 'react-calendar'
import SetWebinar from './components/CreateWebinar/SetWebinar'
import ItemListWebinar from './components/ItemListWebinar/ItemListWebinar'
import WebinarsCalendar from './components/WebinarsCalendar/WebinarsCalendar'
import useWebinars from './hooks/webinars.hook'
import style from './webinars.module.scss'

const Webinars = () => {
  const [openedit, setopenedit] = useState(false)
  const {
    isloaded,
    pages,
    webinars,
    query,
    handleSearchWebinars,
    setWebinars,
    onFilter,
    loadMore
  } = useWebinars()

  const { push } = useRouter()
  useEffect(() => {
    handleSearchWebinars()
  }, [query])

  const onSetWebinars = async (webinar: Webinars) => {
    const newWebinar = await webinarsRepository.set(webinar)
    setWebinars(pre => [newWebinar, ...pre])
    setopenedit(false)
  }

  const goToDetail = (id: string) => {
    push({
      pathname: '/webinars/' + id
    })
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
              <ItemListWebinar onClick={goToDetail} item={item} />
            </div>
          ))}
          <div>
            {pages?.current < pages?.total_pages && (
              <ButtonApp onClick={loadMore}>LoadMore</ButtonApp>
            )}
          </div>
        </div>
        <div>
          <WebinarsCalendar items={webinars} />
          <LinkApp linkHref='/webinars/deferred' target='_self' label='deferred' linkStyle='button'/>
           
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
