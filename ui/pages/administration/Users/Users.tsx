import { Menu, MenuItem } from '@szhsin/react-menu'
import ButtonApp from 'components/ButtonApp'
import SelectFormikApp from 'components/FormApp/components/SelectFormikApp/SelectFormikApp'
import ItemList from 'components/ItemList'
import SearchBar from 'components/SearchBar'
import { ErrorApp } from 'domain/ErrorApp/ErrorApp'
import { User } from 'domain/User/User'
import { Form, Formik } from 'formik'
import { UserRepositoryImplInstance } from 'infrastructure/repositories/users.repository'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { useSystem } from 'ui/hooks/system.hooks'
import ActionsAdmin from './components/ActionsAdmin/ActionsAdmin'
import style from './users.module.scss'
const Users = () => {
  const { pushErrorsApp } = useSystem()
  const [users, setUsers] = useState<User[]>([])
  const [isloaded, setLoaded] = useState(false)

  useEffect(() => {
    _handleGetUsers()
  }, [])

  const _handleGetUsers = async () => {
    let fetching = true
    if (!isloaded) {
      const response = await UserRepositoryImplInstance.getAll()
      if (response instanceof ErrorApp) {
        return pushErrorsApp(response)
      }
      if (fetching) {
        setLoaded(true)
        setUsers(pre => [...response, ...pre])
      }
    }
    return () => (fetching = false)
  }

  return <UsersView users={users} />
}

const UsersView = ({ users }: { users: User[] }) => {
  const { push, asPath } = useRouter();

  const renderUserItem = (user: User) => {
    return (
      <div className={style.userItem} key={user.uid}>
        <div className={`${style.information} ${style.checked}`}>
          <div>
            <input style={{ cursor: 'pointer' }} type="checkbox" />
          </div>

        </div>
        <div className={style.information}>
          <div className={style.name}>{`${user.name} ${user.lastname}`}</div>
          <div className={style.email}>{user.email}</div>
        </div>
        <div className={style.information}>
          <div className={style.role}>
            <div className={style.roleLabel}>{user.role.label}</div>
            {user.role.level === 0 && <div className={style.subscrition}> /
              {user.subscription.plan.label}
            </div>}
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
              <MenuItem className={style.menuOption} onClick={() => push(`${asPath}${user.uid}`)}>Detalle</MenuItem>
              <MenuItem className={style.menuOption} onClick={() => alert('Bloquer')}>Bloquear</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    )
  }

  const renderFilters = () => {
    const handleOnChange = (event: { role_level: number, subscription_level: number }) => {
      console.log("Form::onChange", event);
    };

    return (
      <Formik
        initialValues={{ role_level: null, subscription_level: null } as any}
        onSubmit={handleOnChange}
      >
        {({ values, errors, touched, submitForm }) => (
          <Form>
            <SelectFormikApp
              onChange={(e: any) => submitForm()}
              selectOptions={[
                { label: 'User', value: 0 },
                { label: 'Colaborator', value: 1 },
                { label: 'Administrator', value: 2 }
              ]}
              labelID={'page.administration.users.filter.role_level'}
              name={'role_level'}
            />
            <SelectFormikApp
              onChange={(e: any) => submitForm()}
              selectOptions={[
                { label: 'User', value: 0 },
                { label: 'Colaborator', value: 1 },
                { label: 'Administrator', value: 2 }
              ]}
              labelID={'page.administration.users.filter.role_level'}
              name={'subscription_level'}
            />
          </Form>
        )}
      </Formik>
    )
  }

  return (
    <div className={style.usersPage}>
      <div className={style.header}>
        <h1 className='main-title'>Usuarios de la plataforma</h1>
      </div>
      <div className={style.content}>
        <div className={style.filters}>
          <div className={style.filtersSearchContainer}>
            <SearchBar
              enableTags={false}
              placeholder={'page.administration.users.filter.placeholder'}
              onFilter={(value: { search?: string; tags?: string }) =>
                console.log(value)
              }
            />
          </div>
          <div className={style.filtersSelectsContainer}>
            {renderFilters()}
          </div>
        </div>

        <ItemList items={users.map(user => renderUserItem(user))} />
      </div>
      <div className={style.actions}>
        <ActionsAdmin></ActionsAdmin>
      </div>
    </div>
  )
}

export default Users
