/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp';
import FormApp from 'components/FormApp';
import InputApp from 'components/FormApp/components/InputApp';
import React, { useCallback } from 'react'
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'ui/redux/store';
import * as yup from 'yup'

const SetPassword = () => {
  const intl = useIntl()
  const dispatch = useDispatch<AppDispatch>()
  const _setPassword = (newPAssword:string) => alert('Cambiar password');
  
  //@maria traducciones
  const validationSchema = useCallback(
    () =>
      yup.object({
        password: yup
          .string()
          .trim()
          .min(6, intl.formatMessage({ id: 'forms.errors.incorrectPassword' }))
          .required(intl.formatMessage({ id: 'page.login.errorRequired' })),
        repeatPassword: yup
          .string()
          .oneOf([yup.ref('password')], intl.formatMessage({ id: 'forms.errors.matchPass' })),
      }),
    [intl]
  )

  return (
    <SetPasswordView validationSchema={validationSchema} setPassword={(newPassword:string) => _setPassword(newPassword)}/>
  )
}

const SetPasswordView = ({validationSchema, setPassword}:{validationSchema:any, setPassword:Function}) => {
  return (
    <div className={"SendCodeMail"}>
     
      <div>
        <FormApp
          validationSchema={validationSchema}
          initialValues={{ email: ''}}
          onSubmit={(values: any) => setPassword(values)}
        >
          <InputApp
            labelID='forms.labels.password'
            type='password'
            name='password'
          />
          <InputApp
            labelID='forms.labels.repeatPassword'
            type='password'
            name='repeatPassword'
          />

          <ButtonApp type='submit' labelID='page.recover-password.form.setPassword.submit' />
        </FormApp>
      </div>
    </div>
  )
}

export default SetPassword