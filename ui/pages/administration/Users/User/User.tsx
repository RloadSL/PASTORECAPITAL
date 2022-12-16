import ButtonApp from 'components/ButtonApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import Loading from 'components/Loading'
import { Form, Formik } from 'formik'
import { UserDto } from 'infrastructure/dto/users.dto'
import { UserRepositoryImplInstance } from 'infrastructure/repositories/users.repository'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import style from './user.module.scss'
import { useIntl } from 'react-intl'
const User: NextPage<any> = () => {
  const { query, replace } = useRouter()
  const [userDto, setUserDto] = useState<UserDto | undefined>()

  useEffect(() => {
    let fetching = true
    const { uid } = query
    UserRepositoryImplInstance.read(uid as string).then(user => {
      if (user && fetching === true) {
        setUserDto(user.toJson())
      } else {
        alert('Invalid user')
        replace('/administration/users/')
      }
    })

    return () => {
      fetching = false
    }
  }, [query.uid])

  const _editUserData = (data: any) => {
    console.log(data)
  }

  return userDto ? (
    <UserView userDataDto={userDto} onSubmit={_editUserData} />
  ) : (
    <Loading loading={true}></Loading>
  )
}

const UserView = ({
  userDataDto,
  onSubmit
}: {
  userDataDto: UserDto
  onSubmit: Function
}) => {
  const { push , basePath, asPath} = useRouter()
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

  return (
    <div className={style.content}>
      <div className={style.header}>
        <h1>Información de usuario</h1>
      </div>
      <div className='body'>
        <div className='info'>{renderFormik()}</div>
        <div>
          <p>Alta de usuario: {userDataDto.created_at?.toLocaleString()}</p>
        </div>
        {userDataDto.role.level < 1 && <div className='plan'>Renderizar subscription</div>}
        <div className='role'>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <div>
              <p>Role: {userDataDto.role.label}</p>
            </div>
            <div>
              <ButtonApp
                 buttonStyle='link'
                 type='button'
                labelID='btn.edit'
              />
            </div>
            {userDataDto.role.level === 1 && (<div>
            <ButtonApp
                buttonStyle='link'
                type='button'
                labelID='btn.manage'
                onClick={()=> push(asPath + 'colaboration')}
              />
            </div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
