import React, { useCallback } from 'react'
import * as yup from 'yup'
import { FormattedMessage, useIntl } from 'react-intl'
import style from '../../LoginPage.module.scss'
import FormApp from 'components/FormApp'
import InputApp from 'components/FormApp/components/InputApp'
import ButtonApp from 'components/ButtonApp'
import { CreateUser } from 'infrastructure/dto/users.dto'
import InputCheckApp from 'components/FormApp/components/InputCheckApp'
import { signUpEmailPassword } from 'ui/redux/slices/authentication/autentication.slice'
import { AppDispatch } from 'ui/redux/store'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import email from '../../../../../assets/img/icons/envelope.svg'
import password from '../../../../../assets/img/icons/lock.svg'
import user from '../../../../../assets/img/icons/user.svg'

interface SINGUPVIEW {
  signUp: Function
  validationSchema: any
}

/**
 * Función del componente SignUp
 * @returns 
 */

const SignUp = () => {
  const intl = useIntl()

  const dispatch = useDispatch<AppDispatch>()
  const signUp = (data: CreateUser) => dispatch(signUpEmailPassword(data))

  const validationSchema = useCallback(
    () =>
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
          .required(intl.formatMessage({ id: 'page.login.errorRequired' })),
        password: yup
          .string()
          .trim()
          .min(6, intl.formatMessage({ id: 'forms.errors.incorrectPassword' }))
          .required(intl.formatMessage({ id: 'page.login.errorRequired' })),
        repeatPassword: yup
          .string()
          .oneOf([yup.ref('password')], intl.formatMessage({ id: 'forms.errors.matchPass' })),
        accept: yup
          .boolean()
          .oneOf([true], intl.formatMessage({ id: 'page.login.errorRequired' }))
      }),
    [intl]
  )
  return (
    <SignUpView
      signUp={(value: CreateUser) => {
        signUp(value)
        console.log('signUp')
      }}
      validationSchema={validationSchema}
    ></SignUpView>
  )
}

/**
 * Función del componente SignUpView
 * @param signUp Función para realizar el Sign Up en Firebase
 * @param validationSchema Esquema de validación del formulario de YUP
 * @returns 
 */

const SignUpView = ({ signUp, validationSchema }: SINGUPVIEW) => {
  return (
    <div className={style.signUpContainer}>
      <div className={style.formTitleContainer}>
        <p className={style.subtitle}>
          <FormattedMessage id='page.login.signUpCaps' />
        </p>
        <h2 className={style.formTitle}>
          <FormattedMessage
            id='page.login.signUpTitle'
            values={{ br: <br /> }}
          />
        </h2>
      </div>
      <div>
        <FormApp
          validationSchema={validationSchema}
          initialValues={{
            email: '',
            password: '',
            accept: false,
            name: '',
            lastname: '',
            repeatPassword: ''
          }}
          onSubmit={(values: any) => signUp(values)}
        >
          <InputApp icon={user} labelID='page.login.labelname' type='text' name='name' />
          <InputApp
            labelID='page.login.labellastname'
            type='text'
            name='lastname'
            icon={user}
          />
          <InputApp icon={email} labelID='page.login.labelEmail' type='email' name='email' />
          <InputApp
            labelID='page.login.labelPassword'
            type='password'
            name='password'
            icon={password}
          />
          <InputApp
            labelID='page.login.labelRepeatPassword'
            type='password'
            name='repeatPassword'
            icon={password}
          />

          <InputCheckApp labelID='page.signUp.labelAcceptTerms' name='accept' formattedValues={
            {
              b: (children: any) => <Link href={'#'}><a>{children}</a></Link>
            }}
          />
          <ButtonApp
            buttonStyle='secondary'
            type='submit'
            labelID='page.login.labelSignUpButton'
          />
        </FormApp>
      </div>
    </div>
  )
}

export default SignUp