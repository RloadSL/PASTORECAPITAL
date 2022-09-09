/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import FormApp from 'components/FormApp'
import InputApp from 'components/FormApp/components/InputApp'
import React, { useCallback } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'ui/redux/store'
import * as yup from 'yup'
const ValidateSecurityCode = () => {
  const intl = useIntl()
  const dispatch = useDispatch<AppDispatch>()
  const _validateCode = (code: string) => alert('Validar code')

  //@maria traducciones
  const validationSchema = useCallback(
    () =>
      yup.object({
        code: yup
          .string()
          .length(4, intl.formatMessage({ id: 'forms.errors.invalidCode' }))
          .required(intl.formatMessage({ id: 'forms.errors.errorRequired' }))
      }),
    [intl]
  )

  return (
    <ValidateSecurityCodeView
      validationSchema={validationSchema()}
      sendMail={(code: string) => _validateCode(code)}
    />
  )
}

const ValidateSecurityCodeView = ({
  validationSchema,
  sendMail
}: {
  validationSchema: any
  sendMail: Function
}) => {
  return (
    <div className={'SendCodeMail'}>
      <div>
        <FormApp
          validationSchema={validationSchema}
          initialValues={{ code: '' }}
          onSubmit={(values: any) => sendMail(values)}
        >
          <InputApp labelID='forms.labels.securityCode' type='number' name='code' />

          <ButtonApp type='submit' labelID='page.recover-password.form.validateCode.submit' />
        </FormApp>
      </div>
    </div>
  )
}

export default ValidateSecurityCode
