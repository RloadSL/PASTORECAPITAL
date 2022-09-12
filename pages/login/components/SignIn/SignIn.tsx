import React, { useCallback } from 'react'
import * as yup from 'yup'
import { FormattedMessage, useIntl } from 'react-intl'
import { useAuthentication } from 'ui/hooks/authentication.hook'
import style from '../../LoginPage.module.scss'
import FormApp from 'components/FormApp'
import InputApp from 'components/FormApp/components/InputApp'
import ButtonApp from 'components/ButtonApp'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'ui/redux/store'
import { signInEmailPassword } from 'ui/redux/slices/authentication/autentication.slice'
interface LOGINPAGEVIEWPROPS {
  signIn: Function
  validationSchema: any
}

interface LOGINVALUE {
  email: string
  password: string
}

const SignIn = () => {
  const intl = useIntl()
  const dispatch = useDispatch<AppDispatch>()
  const signIn = (data: LOGINVALUE) => dispatch(signInEmailPassword(data));

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
          .min(6, intl.formatMessage({ id: 'page.login.incorrectPassword' }))
          .required(intl.formatMessage({ id: 'page.login.errorRequired' }))
      }),
    [intl]
  )
  return (
    <SignInView
      signIn={(value: LOGINVALUE) => signIn(value)}
      validationSchema={validationSchema}
    ></SignInView>
  )
}

const SignInView = ({ signIn, validationSchema }: LOGINPAGEVIEWPROPS) => {
  return (

    <div className={style.signInContainer}>
      <div className={style.formTitleContainer}>
        <p className={style.subtitle}>
          <FormattedMessage
            id='page.login.signInCaps'
          />
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
          initialValues={{ email: '', password: '' }}
          onSubmit={(values: any) => signIn(values)}
        >
          <InputApp
            labelID='page.login.labelEmail'
            type='email'
            name='email'
          />

          <InputApp
            labelID='page.login.labelPassword'
            type='password'
            name='password'
            space={false}
          />
          <Link href={'/recover-password'}>
            <a className='smallText'>
              <FormattedMessage id="page.login.labelRecoverPassword" />
            </a>
          </Link>
          <div style={{ marginTop: '20px' }}>
            <ButtonApp buttonStyle="secondary" type='submit' labelID='page.login.labelSignInButton' />
          </div>
        </FormApp>
      </div >
    </div >

  )
}

export default SignIn
