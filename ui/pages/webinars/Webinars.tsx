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
import { FormattedMessage } from 'react-intl'
import SetWebinar from './components/CreateWebinar/SetWebinar'
import ItemListWebinar from './components/ItemListWebinar/ItemListWebinar'
import WebinarsCalendar from './components/WebinarsCalendar/WebinarsCalendar'
import useWebinars from './hooks/webinars.hook'
import style from './webinars.module.scss'
import addIcon from '../../../assets/img/icons/add.svg'
import calendarIcon from '../../../assets/img/icons/calendar.svg'



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
    <div className={style.webinars}>
      <header>
        <div>
          <h1 className={`${style.topTitle} main-title`}>
            <FormattedMessage id='mainMenu.item.label.webinars' />
          </h1>
          <p>
            <FormattedMessage id="loremipsum" />
          </p>
        </div>
        <div className={style.createRoomBtnContainer}>
          <ButtonApp
            buttonStyle='primary'
            labelID='page.amas.createRoom.label'
            onClick={() => setopenedit(true)}
            type='button'
            icon={addIcon}
          />
        </div>
      </header>
      <div className={style.filtersSearchContainer}>
        <SearchBar
          enableTags={false}
          placeholder={'page.administration.users.filter.placeholder'}
          onFilter={(value: { search?: string; tags?: string }) =>
            onFilter(value.search as string)
          }
        />
      </div>
      <h2 className={style.subtitle}>
        <FormattedMessage id='page.webinars.subtitle' />
      </h2>
      <div className={style.webinarsContainer}>
        <div >
          <ul>
            {webinars.map(item => (
              <li key={item.id}>
                <ItemListWebinar showThumb={false} hasColorSpot={true} onClick={goToDetail} item={item} chips={[{ label: `${item.date?.toLocaleDateString()} ${item.date?.toLocaleTimeString()}`, icon: calendarIcon }]} />
              </li>
            ))}
          </ul>
          <div>
            {pages?.current < pages?.total_pages && (
              <ButtonApp onClick={loadMore}>LoadMore</ButtonApp>
            )}
          </div>
        </div>
        <div>
          <WebinarsCalendar items={webinars} />
          <div className={style.linkDeferred}>
            <LinkApp linkHref='/webinars/deferred' target='_self' label='deferred' icon={calendarIcon} />
          </div>
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
