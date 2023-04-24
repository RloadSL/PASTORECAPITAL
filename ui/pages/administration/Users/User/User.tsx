import ButtonApp from 'components/ButtonApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import Loading from 'components/Loading'
import { Field, Form, Formik } from 'formik'
import { Role, UserDto } from 'infrastructure/dto/users.dto'
import { UserRepositoryImplInstance } from 'infrastructure/repositories/users.repository'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import React, { useEffect, useRef, useState } from 'react'
import style from './user.module.scss'
import { useIntl } from 'react-intl'
import { ROLES } from 'domain/Constants/roles'
import LinkApp from 'components/LinkApp'
import systemRepository from 'infrastructure/repositories/system.repository'
import { AuthImplInstance } from 'infrastructure/repositories/authentication.repository'
import { useSystem } from 'ui/hooks/system.hooks'
import { InfoApp } from 'domain/InfoApp/InfoApp'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import SelectFormikApp from 'components/FormApp/components/SelectFormikApp/SelectFormikApp'
const User: NextPage<any> = () => {
  const { query, replace } = useRouter()
  const [userDto, setUserDto] = useState<UserDto | undefined>()
  const { pushInfoApp } = useSystem()
  useEffect(() => {
    let fetching = true
    if (query.uid) _getData(fetching)
    return () => {
      fetching = false
    }
  }, [query.uid])

  const _getData = (fetching: boolean) => {
    UserRepositoryImplInstance.read(query.uid as string).then(user => {
      if (user && fetching === true) {
        setUserDto(user.toJson())
      } else {
        console.error('Invalid user')
        replace('/')
      }
    })
  }

  const _noti = () => pushInfoApp(new InfoApp({ code: 'user.updated', message: 'user.updated' }, 'success'))

  const _editUserData = async (data: any) => {
    await AuthImplInstance.updateUserAuthenticationData({ uid: query.uid, ...data })
    _noti()
  }

  const _onSaveRole = async (data: Role) => {
    await UserRepositoryImplInstance.update(query.uid as string, { role: data })
    _getData(true);
    _noti()
  }

  const _onSaveUpdate = async (data: any) => {
    await UserRepositoryImplInstance.update(query.uid as string, data)
    _getData(true);
    _noti()
  }

  const _onCancelSubscription = async () => {
    await systemRepository.cancelSubscription({ sub_id: userDto?.subscription.stripe_sub_id as string })
    _noti()
  }
  return userDto ? (
    <UserView 
      onCancelSubscription={_onCancelSubscription} 
      onSaveRole={_onSaveRole} 
      userDataDto={userDto} 
      onSaveUpdate = {_onSaveUpdate}
      onSubmit={_editUserData} />
  ) : (
    <Loading loading={true}></Loading>
  )
}

const UserView = ({
  userDataDto,
  onSubmit,
  onCancelSubscription,
  onSaveRole,
  onSaveUpdate
}: {
  userDataDto: UserDto
  onSubmit: Function,
  onSaveRole: Function,
  onSaveUpdate:Function,
  onCancelSubscription: Function
}) => {
  const userLogged = useSelector(getUserLogged)

  const { push, basePath, asPath } = useRouter()
  const intl = useIntl()
  const validationSchema = useRef(
    yup.object({
      name: yup
        .string()
        .required(intl.formatMessage({ id: 'page.login.errorRequired' })),
      lastname: yup
        .string()
        .required(intl.formatMessage({ id: 'page.login.errorRequired' })),
      email: yup
        .string()
        .email(intl.formatMessage({ id: 'page.login.incorrectEmail' }))
        .required(intl.formatMessage({ id: 'page.login.errorRequired' }))
    })
  ).current

  const renderFormik = () => {
    return (
      <Formik
        initialValues={{
          name: userDataDto.name,
          lastname: userDataDto.lastname,
          email: userDataDto.email,
          default_lang: userDataDto.default_lang
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          onSubmit(values)
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <InputFormikApp
              labelID='page.login.labelname'
              type='text'
              name='name'
            />

            <InputFormikApp
              labelID='page.login.labellastname'
              type='text'
              name='lastname'
            />

            <InputFormikApp
              labelID='page.login.labelEmail'
              type='text'
              name='email'
            />

              <SelectFormikApp
                selectOptions={[
                  { value: 'es', label: 'Español' },
                  { value: 'en', label: 'Inglés' },
                ]}
                labelID={'page.login.lang.select'}
                name={'default_lang'}
              />

              <ButtonApp
                buttonStyle='primary'
                type='submit'
                labelID='btn.edit'
              />
          </Form>
        )}
      </Formik>
    )
  }

  const renderFormikRole = () => {
    return (
      <Formik
        initialValues={{
          role: userDataDto.role.key
        }}
        onSubmit={values => {
          onSaveRole(ROLES.find(item => item.key === values.role))
        }}
      >
        {({ values, errors, touched }) => (
          <Form className={style.form}>
            <div className={style.roles_checks}>
              <div className={style.roles_checks_list}>
                <p style={{ marginRight: 20 }}>Role activo del usuario:</p>
                {ROLES.map((role: Role) => (
                  <div role='group' key={role.key}>
                    <label>
                      <Field type='radio' name='role' value={role.key} />
                      {role.label}
                    </label>
                  </div>
                ))}
              </div>

              {userDataDto.role.level === 1 && <div className={style.manageCollaborator}>
                <ButtonApp
                  buttonStyle='transparent'
                  type='button'
                  labelID='Permisos del colaborador'
                  onClick={() => push(asPath + 'colaboration')}
                />
              </div>}
            </div>
            <div className={style.roles_buttons}>
              <ButtonApp
                buttonStyle='primary'
                type='submit'
                labelID='page.administration.users.update.role'
              />
            </div>
          </Form>
        )}
      </Formik>
    )
  }


  

  return (
    <div className={style.user}>
      <div className={style.header}>
        <h1 className='main-title'>
          Configuración de usuario</h1>
        <div>
          <div>
            <p>Fecha de alta: {userDataDto.created_at?.toLocaleString('es-Es', {day: '2-digit', month: '2-digit', year:'numeric'})}</p>
          </div>
          {userDataDto.role.level <= 1 && (
            <div className={style.plan}>
              <div>Plan activo: {userDataDto.subscription.plan.label}</div>
              <div style={{ display: 'flex' }}>
                {userDataDto.uid === userLogged?.uid && <LinkApp linkStyle='classic' target='_self' linkHref='/subscription' label='btn.subscribe' />}
                {userDataDto.subscription.plan.level > 0 && <ButtonApp onClick={onCancelSubscription}>Cancelar</ButtonApp>}
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className='margin-top-50'>
          <p className='small-caps'>Datos de Usuario</p>
        </div>
        <div className={style.userMainDetails}>{renderFormik()}</div>
        {userLogged?.role.level == 2 && <div className={style.user_roleConfiguration}>
          <p className='small-caps'>Configurar rol del usuario</p>
          <div className={style.roles}>
            <div>{renderFormikRole()}</div>

          </div>
        </div>}
          <br/>
        <div className={style.user_roleConfiguration}>
          <p className='small-caps'>Habilitar autenticación de doble factor</p>
          <div className={style.roles}>
            <div>
            <div className={style.roles_buttons}>
              <ButtonApp
                buttonStyle={userDataDto.a2f ? 'dark' : 'primary'}
                type='button'
                labelID={userDataDto.a2f ? 'page.administration.users.a2f.disable' : 'page.administration.users.a2f.enable'}
                onClick={()=>onSaveUpdate({a2f: userDataDto.a2f ? false: true})}
              />
            </div>
            </div>
          </div>
        </div>
          <br/>
        <div className={style.user_roleConfiguration}>
          <p className='small-caps'>Configuración de notificaciones</p>
          <div className={style.roles}>
            <div>
            <div className={style.roles_buttons}>
              <ButtonApp
                buttonStyle={'primary'}
                type='button'
                labelID={'btn.edit'}
                onClick={()=>onSaveUpdate({a2f: userDataDto.a2f ? false: true})}
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
