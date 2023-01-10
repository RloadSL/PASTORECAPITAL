import React, { useCallback, useState } from 'react'
import * as yup from 'yup'
import { FormattedMessage, useIntl } from 'react-intl'
import style from '../../LoginPage.module.scss'
import FormApp from 'components/FormApp'
import InputApp from 'components/FormApp/components/InputCheckApp/InputApp'
import ButtonApp from 'components/ButtonApp'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'ui/redux/store'
import { signInEmailPassword } from 'ui/redux/slices/authentication/autentication.slice'
import email from '../../../../../assets/img/icons/envelope.svg'
import password from '../../../../../assets/img/icons/lock.svg'

interface LOGINPAGEVIEWPROPS {
  signIn: Function
  validationSchema: any
}
interface LOGINVALUE {
  email: string
  password: string
}

/**
 * Función del componente SignIn
 */

const SignIn = ({ onSignIn }: { onSignIn?: Function }) => {
  const intl = useIntl()
  const dispatch = useDispatch<AppDispatch>()
  const signIn = (data: LOGINVALUE) => dispatch(signInEmailPassword(data))

  const _signIn = async (data: LOGINVALUE) => {
    if (onSignIn) onSignIn()
    await signIn(data)
  }

  const validationSchema = useCallback(
    () =>
      yup.object({
        email: yup
          .string()
          .email(intl.formatMessage({ id: 'page.login.incorrectEmail' }))
          .required(intl.formatMessage({ id: 'page.login.errorRequired' })),
        password: yup
          .string()
          .trim()
          .min(6, intl.formatMessage({ id: 'forms.errors.incorrectPassword' }))
          .required(intl.formatMessage({ id: 'page.login.errorRequired' }))
      }),
    [intl]
  )
  return (
    <SignInView
      signIn={(value: LOGINVALUE) => _signIn(value)}
      validationSchema={validationSchema}
    ></SignInView>
  )
}

/**
 * Función del componente SignInView
 * @param signIn Función para realizar el Sign In en Firebase
 * @param validationSchema Esquema de validación del formulario de YUP
 * @returns
 */

const SignInView = ({ signIn, validationSchema }: LOGINPAGEVIEWPROPS) => {
  const [initialValue, setinitialValue] = useState({ email: '', password: '' })
  return (
    <div className={style.signInContainer}>
      <div className={style.formTitleContainer}>
        <p className={style.subtitle}>
          <FormattedMessage id='page.login.signInCaps' />
        </p>
        <h2 className={style.formTitle}>
          <FormattedMessage
            id='page.login.signInTitle'
            values={{ br: <br /> }}
          />
        </h2>
      </div>
      <div>
        <FormApp
          validationSchema={validationSchema}
          initialValues={initialValue}
          onSubmit={(values: any) => {
            signIn(values)
            setinitialValue({ email: '', password: '' })
          }}
        >
          <InputApp
            labelID='page.login.labelEmail'
            type='email'
            name='email'
            onChange={(k:string,v:string) => setinitialValue({...initialValue, email: v})}
            value={initialValue.email}
            icon={email}
          />

          <InputApp
            labelID='page.login.labelPassword'
            type='password'
            name='password'
            onChange={(k:string,v:string) => setinitialValue({...initialValue, password: v})}
            value={initialValue.password}
            icon={password}
          />
          <Link href={'/recover-password'}>
            <a className={`small-text ${style.recoverPass}`}>
              <FormattedMessage id='page.login.labelRecoverPassword' />
            </a>
          </Link>
          <div style={{ marginTop: '20px' }}>
            <ButtonApp
              buttonStyle='secondary'
              type='submit'
              labelID='page.login.labelSignInButton'
            />
          </div>
        </FormApp>
      </div>
    </div>
  )
}

export default SignIn
