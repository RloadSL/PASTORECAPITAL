import ButtonApp from 'components/ButtonApp'
import SearchBar from 'components/SearchBar'
import { Webinars } from 'domain/Webinars/Webinars'
import { ELASTIC_QUERY } from 'infrastructure/elasticsearch/search.elastic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import ItemListWebinar from '../components/ItemListWebinar/ItemListWebinar'
import useWebinars from '../hooks/webinars.hook'
import style from './deferred-webinars.module.scss'
import clockIcon from '../../../../assets/img/icons/clock.svg'

const DeferredWebinars = () => {
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
    handleSearchWebinars({ filters: { state: ['DEFERRED'] } })
  }, [query])

  const goToDetail = (id: string) => {
    push({
      pathname: '/webinars/deferred/' + id
    })
  }
  return (
    <div className={style.deferredWebinars}>
      <header>
        <p className='small-caps'><FormattedMessage id='webinars' /></p>
        <p className={`${style.topTitle} main-title`}>
          <FormattedMessage id='Webinars anteriores' />
        </p>
        <p>
          <FormattedMessage id="loremipsum" />
        </p>
      </header>
      <div>
        <SearchBar
          enableTags={false}
          placeholder={'page.webinars.search.label'}
          onFilter={(value: { search?: string; tags?: string }) =>
            onFilter(value.search as string)
          }
        />
      </div>
      <div className={style.webinarsContainer}>
        <ul className={style.webinarsContainer_grid}>
          {webinars.map(item => (
            <li key={item.id}>
              <ItemListWebinar showThumb onClick={goToDetail} item={item} chips={[{ label: `${item.date?.toLocaleDateString()} ${item.date?.toLocaleTimeString()}`, icon: clockIcon }]} />
            </li>
          ))}
        </ul>
        <div>
          {pages?.current < pages?.total_pages && (
            <ButtonApp onClick={loadMore}>LoadMore</ButtonApp>
          )}
        </div>
      </div>
    </div>
  )
}

export default DeferredWebinars