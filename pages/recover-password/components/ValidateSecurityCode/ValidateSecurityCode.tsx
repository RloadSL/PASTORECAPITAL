/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import FormApp from 'components/FormApp'
import InputApp from 'components/FormApp/components/InputApp'
import React, { useCallback } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { validateCode } from 'ui/redux/slices/authentication/autentication.slice'
import { AppDispatch } from 'ui/redux/store'
import * as yup from 'yup'
const ValidateSecurityCode = ({ email }: { email: string }) => {
  const intl = useIntl()
  const dispatch = useDispatch<AppDispatch>()
  const _validateCode = (code: number) => { if (email) dispatch(validateCode({ code, email })) }

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
      validateCode={(code: number) => _validateCode(code)}
    />
  )
}

const ValidateSecurityCodeView = ({
  validationSchema,
  validateCode
}: {
  validationSchema: any
  validateCode: Function
}) => {
  return (
    <>
      <div>
        <p className={'small-caps'}>
          <FormattedMessage
            id='page.recover-password.recoverCaps'
          />
        </p>
        <h2 className='main-title'>
          <FormattedMessage
            id='page.recover-password.form.validateCode.title'
            values={{ br: <br /> }}
          />
        </h2>
        <p>
          <FormattedMessage
            id='page.recover-password.form.validateCode.description'
          />
        </p>
      </div>
      <div className='margin-top-30'>
        <div>
          <FormApp
            validationSchema={validationSchema}
            initialValues={{ code: '' }}
            onSubmit={(values: any) => validateCode(values.code)}
          >
            <InputApp placeholder='0000' labelID='forms.labels.securityCode' type='number' name='code' inputStyle='code' maxLength={4}/>
            <ButtonApp buttonStyle='secondary' type='submit' labelID='page.recover-password.form.validateCode.submit' />
          </FormApp>
        </div>
      </div>

    </>

  )
}

export default ValidateSecurityCode
