import ButtonApp from 'components/ButtonApp'
import SearchBar from 'components/SearchBar'
import { Webinars } from 'domain/Webinars/Webinars'
import { ELASTIC_QUERY } from 'infrastructure/elasticsearch/search.elastic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ItemListWebinar from '../components/ItemListWebinar/ItemListWebinar'
import useWebinars from '../hooks/webinars.hook'

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
  const {push} = useRouter()
  useEffect(() => {
    handleSearchWebinars({filters: {state : ['DEFERRED']}})
  }, [query])
  
  const goToDetail = (id: string) => {
    push({
      pathname: '/webinars/' + id
    })
  }
  return (
    <div>DeferredWebinars

      <div>
        <SearchBar
          enableTags={false}
          placeholder={'page.administration.users.filter.placeholder'}
          onFilter={(value: { search?: string; tags?: string }) =>
            onFilter(value.search as string)
          }
        />
      </div>
      <div>
          {webinars.map(item => (
            <div key={item.id}>
              <ItemListWebinar showThumb onClick={goToDetail} item={item} />
            </div>
          ))}
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