/* eslint-disable react-hooks/exhaustive-deps */
import SearchBar from 'components/SearchBar'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { getConsultants } from 'ui/redux/slices/tax-consultants/tax-consultants.selectors'
import { searchConsultants } from 'ui/redux/slices/tax-consultants/tax-consultants.slice'
import { AppDispatch } from 'ui/redux/store'
import CardConsultant from '../components/CardConsultant'
import style from './consultants.module.scss'

const Consultants = () => {
  const dispatch = useDispatch<AppDispatch>()
  const consultants: any[] = useSelector(getConsultants)
  const userLogged = useSelector(getUserLogged)
  const { query } = useRouter()
  const searchString = typeof window !== 'undefined' ? query.s : ''

  const [search, setSearch] = useState(searchString as string)
  const [pagination, setPagination] = useState(1)

  useEffect(() => {
    if (userLogged?.uid) {
      dispatch(searchConsultants())
    }
  }, [])

  const _onFilter = (s: string) => {
    if (userLogged?.uid) {
      dispatch(
        searchConsultants({
          query: { match: { data: search }  },
          paginator: {
            from: pagination,
            size: 6
          }
        })
      )
    }
  }

  return (
    <>
      <ConsultantsViews consultants={consultants} onFilter={_onFilter} />
    </>
  )
}

const ConsultantsViews = ({
  consultants,
  onFilter
}: {
  consultants: any[]
  onFilter: Function
}) => {
  const { replace, asPath, query } = useRouter()
  return (
    <div className={style.Cosultants}>
      <header>
        <h1>Asesor fiscal</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </header>
      <div className={style.filtersConatiner}>
        <SearchBar
          enableTags={false}
          onFilter={(f: any) => {
            onFilter(f.search)
          }}
        />
      </div>
      <div className={style.Listconsultants}>
        {
          consultants.map(item => {
            return ( <CardConsultant {...item} key={item.id}/> )
          })
        }
      </div>
    </div>
  )
}


export default Consultants
