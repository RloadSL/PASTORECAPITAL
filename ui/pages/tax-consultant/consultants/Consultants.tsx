/* eslint-disable react-hooks/exhaustive-deps */
import SearchBar from 'components/SearchBar'
import { UserConsultant } from 'domain/UserConsultant/UserConsultant'
import { ELASTIC_QUERY } from 'infrastructure/elasticsearch/search.elastic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { getConsultants, getCurrentConsultant } from 'ui/redux/slices/tax-consultants/tax-consultants.selectors'
import { clean, searchConsultants } from 'ui/redux/slices/tax-consultants/tax-consultants.slice'
import { AppDispatch } from 'ui/redux/store'
import CardConsultant from '../components/CardConsultant'
import style from './consultants.module.scss'

const Consultants = () => {
  const dispatch = useDispatch<AppDispatch>()
  const consultantsState: {error:any, items: UserConsultant[], pages:any} = useSelector(getConsultants)
  const userLogged = useSelector(getUserLogged)
  const currentConsultant = useSelector(getCurrentConsultant)
  const { replace } = useRouter()
  const [query, setQuery] = useState<ELASTIC_QUERY>({ query: '' , filters: userLogged?.role.level > 1 ? {} : {state: 'active'}})
  

  useEffect(() => {
    if (userLogged?.uid) {
      dispatch(clean())
      dispatch(searchConsultants(query))
    }
  }, [userLogged, query])

  useEffect(() => {
    if (currentConsultant instanceof UserConsultant && userLogged?.role.level === 1) {
      replace(`/tax-consultant/consultants/${currentConsultant.id}/dashboard/`)
    }
  }, [currentConsultant])

  const _onFilter = (s: string) => {
    if (userLogged?.uid) {
      dispatch(clean())
      dispatch(
        searchConsultants({
          query:s
        })
      )
    }
  }

  return (
    <>
      <ConsultantsViews consultants={consultantsState.items} onFilter={_onFilter} />
    </>
  )
}

const ConsultantsViews = ({
  consultants,
  onFilter
}: {
  consultants: UserConsultant[]
  onFilter: Function
}) => {
  const { replace, asPath, query } = useRouter()
  return (
    <div className={style.consultantsPage}>
      <header>
        <p className='small-caps'><FormattedMessage id={'page.tax-consultant.consultants.smallTitle'} /></p>
        <h1 className={`main-title`}><FormattedMessage id={'page.tax-consultant.consultants.title'} /></h1>
        <p>
          <FormattedMessage id={'page.tax-consultant.consultants.description'} />
        </p>
      </header>

      <div className={style.filtersContainer}>
        <SearchBar
          enableTags={false}
          onFilter={(f: any) => {
            onFilter(f.search)
          }}
        />
      </div>
      <div className={style.consultantsList}>
        {
          consultants.map(item => {
            return (<CardConsultant consultant={item} key={item.id} />)
          })
        }
      </div>
    </div>
  )
}


export default Consultants
