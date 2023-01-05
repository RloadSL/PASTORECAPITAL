import ButtonApp from 'components/ButtonApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import Loading from 'components/Loading'
import { Field, Form, Formik } from 'formik'
import { Role, UserDto } from 'infrastructure/dto/users.dto'
import { UserRepositoryImplInstance } from 'infrastructure/repositories/users.repository'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import style from './user.module.scss'
import { useIntl } from 'react-intl'
import { ROLES } from 'domain/Constants/roles'
const User: NextPage<any> = () => {
  const { query, replace } = useRouter()
  const [userDto, setUserDto] = useState<UserDto | undefined>()

  useEffect(() => {
    let fetching = true
    _getData(fetching)
    return () => {
      fetching = false
    }
  }, [query.uid])

  const _getData = (fetching: boolean) => {
    UserRepositoryImplInstance.read(query.uid as string).then(user => {
      if (user && fetching === true) {
        setUserDto(user.toJson())
      } else {
        alert('Invalid user')
        replace('/administration/users/')
      }
    })
  }

  const _editUserData = (data: any) => {
    console.log(data)
  }

  const _onSaveRole = async (data: Role) => {
    await UserRepositoryImplInstance.update(query.uid as string, {role : data})
    _getData(true);
  }

  return userDto ? (
    <UserView onSaveRole={_onSaveRole} userDataDto={userDto} onSubmit={_editUserData} />
  ) : (
    <Loading loading={true}></Loading>
  )
}

const UserView = ({
  userDataDto,
  onSubmit,
  onSaveRole
}: {
  userDataDto: UserDto
  onSubmit: Function,
  onSaveRole: Function
}) => {
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
  )

  const renderFormik = () => {
    return (
      <Formik
        initialValues={userDataDto}
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

            <div
              style={{
                marginTop: '20px',
                maxWidth: '300px',
                margin: 'auto'
              }}
            >
              <ButtonApp
                buttonStyle='primary'
                type='submit'
                labelID='btn.edit'
              />
            </div>
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
          onSaveRole( ROLES.find(item => item.key === values.role))
        }}
      >
        {({ values, errors, touched }) => (
          <Form className={style.form}>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-around',
                alignItems: 'center'
              }}
            >
              <p style={{marginRight: 20}}>Role activo del usuario:</p>
              {ROLES.map((role: Role) => (
                <div role='group' key={role.key}>
                  <label>
                    <Field type='radio' name='role' value={role.key} />
                    {role.label}
                  </label>
                </div>
              ))}
              <div
                style={{
                  marginTop: '20px',
                  maxWidth: '300px',
                  margin: 'auto'
                }}
              >
                <ButtonApp
                  buttonStyle='link'
                  type='submit'
                  labelID='btn.save'
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    )
  }

  return (
    <div className={style.user}>
      <div className={style.header}>
        <h1 className='main-title'>Información de usuario</h1>
      </div>
      <div>
        <div className={style.userMainDetails}>{renderFormik()}</div>
        <div>
          <p>Alta de usuario: {userDataDto.created_at?.toLocaleString()}</p>
        </div>
        {userDataDto.role.level < 1 && (
          <div className='plan'>Renderizar subscription</div>
        )}
        <div className='role'>
          <p className='small-caps margin-top-50'>Configurar rol del usuario</p>
          <div>
            <div>{renderFormikRole()}</div>

            {userDataDto.role.level === 1 && (
              <div>
                <ButtonApp
                  buttonStyle='primary'
                  type='button'
                  labelID='btn.manage'
                  onClick={() => push(asPath + 'colaboration')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
