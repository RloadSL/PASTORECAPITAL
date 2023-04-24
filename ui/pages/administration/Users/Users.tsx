import { Menu, MenuItem } from '@szhsin/react-menu'
import ButtonApp from 'components/ButtonApp'
import SelectFormikApp from 'components/FormApp/components/SelectFormikApp/SelectFormikApp'
import ItemList from 'components/ItemList'
import SearchBar from 'components/SearchBar'
import { ErrorApp } from 'domain/ErrorApp/ErrorApp'
import { User } from 'domain/User/User'
import { Form, Formik } from 'formik'
import { ELASTIC_QUERY } from 'infrastructure/elasticsearch/search.elastic'
import { UserRepositoryImplInstance } from 'infrastructure/repositories/users.repository'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { useSystem } from 'ui/hooks/system.hooks'
import ActionsAdmin from './components/ActionsAdmin/ActionsAdmin'
import style from './users.module.scss'
import { FormattedMessage } from 'react-intl'
const Users = () => {
  const { pushErrorsApp } = useSystem()
  const [users, setUsers] = useState<User[]>([])
  const [isloaded, setLoaded] = useState(false)
  const [query, setQuery] = useState<ELASTIC_QUERY>({ query: '' })
  const [pages, setPages] = useState<any>()

  useEffect(() => {
    _handleGetUsers(query)
  }, [query])

  const _handleGetUsers = async (query:ELASTIC_QUERY) => {
    let fetching = true
    if (!isloaded) {
      const response = await UserRepositoryImplInstance.elasticSearchUsers(query)
      if (fetching) {
        setLoaded(true)
        setPages(response.page)
        setUsers(pre => [...response.results, ...pre])
      }
    }
    return () => (fetching = false)
  }

  const _onFilter = async (s: string) => {
    if (isloaded) {
      setLoaded(false);
      setUsers([])
      setQuery(pre => ({
        ...pre,
        query: s
      }))
    }
  }

  const _loadMore = () => {
    if(isloaded){
      setLoaded(false);
      setQuery(pre =>{
        const current = pre.page?.current || 1
  
        return {
          ...pre,
          page:{
            current: current + 1,
            size: 10
          }
        }
      })
    }
  }

  return <UsersView users={users} hasLoadMore={(pages?.current < pages?.total_pages)} onloadMore={_loadMore} onFilter={_onFilter} />
}

const UsersView = ({
  users,
  onFilter,
  onloadMore,
  hasLoadMore
}: {
  users: User[]
  onFilter: Function
  onloadMore: Function,
  hasLoadMore:boolean
}) => {
  const { push, asPath } = useRouter()

  const renderUserItem = (user: User) => {
    return (
      <div className={style.userItem} key={user.uid}>
        <div className={`${style.information} ${style.checked}`}>
          <div>
            <input style={{ cursor: 'pointer' }} type='checkbox' />
          </div>
        </div>
        <div className={style.information}>
          <div className={style.name}>{`${user.name} ${user.lastname}`}</div>
          <div className={style.email}>{user.email}</div>
        </div>
        <div className={style.information}>
          <div className={style.role}>
            <div className={style.roleLabel}>{user.role.label}</div>
            {user.role.level === 0 && (
              <div className={style.subscription}>
                {' '}
                /{user.subscription.plan.label}
              </div>
            )}
          </div>
        </div>
        <div className={style.actions}>
          <div className={style.menuContainer}>
            <Menu
              align='end'
              offsetY={5}
              className={style.menu}
              menuButton={
                <button
                  className={`menu-options-btn ${style['menu-options-btn']}`}
                >
                  <span className='only-readers'>opciones</span>
                </button>
              }
            >
              <MenuItem
                className={style.menuOption}
                onClick={() => push(`${asPath}${user.uid}`)}
              >
                Detalle
              </MenuItem>
              <MenuItem
                className={style.menuOption}
                onClick={() => console.error('Bloquer')}
              >
                Bloquear
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className={style.usersPage}>
      <div className={style.maxContainer}>      
      <div className={style.header}>
        <h1 className='main-title'><FormattedMessage id='u_platforms'/></h1>
      </div>
      <div className={style.content}>
        <div className={style.filters}>
          <div className={style.filtersSearchContainer}>
            <SearchBar
              enableTags={false}
              placeholder={'page.administration.users.filter.placeholder'}
              onFilter={(value: { search?: string; tags?: string }) =>
                onFilter(value.search)
              }
            />
          </div>
          {/* <div className={style.filtersSelectsContainer}>
            {renderFilters()}
          </div> */}
        </div>

        <ItemList items={users.map(user => renderUserItem(user))} />
      </div>
      {hasLoadMore && <div className={style.loadMoreBtn}>
        <ActionsAdmin onLoadMore={() => onloadMore()}></ActionsAdmin>
      </div>}
      </div>
    </div>
  )
}

export default Users
