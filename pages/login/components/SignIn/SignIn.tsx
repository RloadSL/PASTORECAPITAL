import React, { useCallback } from 'react'
import * as yup from 'yup'
import { FormattedMessage, useIntl } from 'react-intl'
import { useAuthentication } from 'ui/hooks/authentication.hook'

import FormApp from 'components/FormApp'
import InputApp from 'components/FormApp/components/InputApp'
import ButtonApp from 'components/ButtonApp'
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
  const { signIn } = useAuthentication()
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
    <>
      
        <p>
          <FormattedMessage id='page.login.title' />
        </p>
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
            />
            <ButtonApp type='submit' labelID='page.login.btnSubmit' />
          </FormApp>
        </div>
    
    </>
  )
}

export default SignIn;