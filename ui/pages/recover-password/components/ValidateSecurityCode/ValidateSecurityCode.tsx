/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import FormApp from 'components/FormApp'
import InputApp from 'components/FormApp/components/InputApp'
import Loading from 'components/Loading'
import React, { useCallback } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  sendEmailCode,
  validateCode
} from 'ui/redux/slices/authentication/autentication.slice'
import { isLoading } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
import * as yup from 'yup'

/**
 *
 * Formulario de validación de código de seguridad
 */
const ValidateSecurityCode = ({ email }: { email: string }) => {
  const intl = useIntl()
  const dispatch = useDispatch<AppDispatch>()
  const _validateCode = (code: number) => {
    if (email) dispatch(validateCode({ code, email }))
  }

  const _sendEmailCode = () => {
    dispatch(sendEmailCode({ email }))
  }

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
      sendEmailCode={_sendEmailCode}
      validateCode={(code: number) => _validateCode(code)}
    />
  )
}

const ValidateSecurityCodeView = ({
  validationSchema,
  validateCode,
  sendEmailCode
}: {
  validationSchema: any
  validateCode: Function
  sendEmailCode: Function
}) => {
  const loading = useSelector(isLoading)

  return loading ? (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '200px'
      }}
    >
      <Loading variant='inner-primary' loading />
    </div>
  ) : (
    <>
      <div>
        <p className={'small-caps'}>
          <FormattedMessage id='page.recover-password.recoverCaps' />
        </p>
        <h2 className='main-title'>
          <FormattedMessage
            id='page.recover-password.form.validateCode.title'
            values={{ br: <br /> }}
          />
        </h2>
        <p>
          <FormattedMessage id='page.recover-password.form.validateCode.description' />
        </p>
      </div>
      <div>
        <div>
          <FormApp
            validationSchema={validationSchema}
            initialValues={{ code: '' }}
            onSubmit={(values: any) => validateCode(values.code)}
          >
            <InputApp
              placeholder='0000'
              labelID='forms.labels.securityCode'
              type='number'
              name='code'
              inputStyle='code'
              maxLength={4}
            />
            <ButtonApp
              buttonStyle='secondary'
              type='submit'
              labelID='btn.send'
            />
          </FormApp>
        </div>
        <div style={{ marginLeft: '-10px' }}>
          <ButtonApp
            size='small'
            buttonStyle='link'
            labelID='forms.labels.resend-code'
            onClick={() => sendEmailCode()}
          />
        </div>
      </div>
    </>
  )
}

export default ValidateSecurityCode
