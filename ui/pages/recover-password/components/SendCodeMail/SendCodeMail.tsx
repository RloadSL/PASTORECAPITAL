import ButtonApp from "components/ButtonApp";
import FormApp from "components/FormApp";
import InputApp from "components/FormApp/components/InputCheckApp/InputApp";
import { useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { sendEmailCode } from "ui/redux/slices/authentication/autentication.slice";
import { AppDispatch } from "ui/redux/store";
import * as yup from 'yup'
import email from '../../../../../assets/img/icons/envelope.svg'


const SendCodeMail = ({ onSend }: { onSend: Function }) => {
  const intl = useIntl()
  const dispatch = useDispatch<AppDispatch>()
  const _sendEmailCode = (values: { email: string }) => {
    dispatch(sendEmailCode(values))
    onSend(values.email)
  };

  const validationSchema = useCallback(
    () =>
      yup.object({
        email: yup
          .string()
          .email(intl.formatMessage({ id: 'forms.errors.incorrectEmail' }))
          .required(intl.formatMessage({ id: 'forms.errors.errorRequired' }))
      }),
    [intl]
  )

  return (<SendCodeMailView validationSchema={validationSchema()} sendMail={(values: { email: string }) => _sendEmailCode(values)} />)
}

const SendCodeMailView = ({ validationSchema, sendMail }: { validationSchema: any, sendMail: Function }) => {
  return (
    <>
      <div className={'style.formTitleContainer'}>
        <p className={'small-caps'}>
          <FormattedMessage
            id='page.recover-password.recoverCaps'
          />
        </p>
        <h2 className='main-title'>
          <FormattedMessage
            id='page.recover-password.title'
            values={{ br: <br /> }}
          />
        </h2>
        <p>
          <FormattedMessage
            id='page.recover-password.recoverDetails'
          />
        </p>
      </div>

      <div className='margin-top-20'>
        <div>
          <FormApp
            validationSchema={validationSchema}
            initialValues={{ email: '' }}
            onSubmit={(values: any) => sendMail(values)}
          >
            <InputApp labelID='forms.labels.email' type='email' name='email' icon={email}/>
            <ButtonApp buttonStyle="secondary" type='submit' labelID='page.recover-password.form.sendEmail.submit' />
          </FormApp>
        </div>
      </div>
    </>
  )
}

export default SendCodeMail