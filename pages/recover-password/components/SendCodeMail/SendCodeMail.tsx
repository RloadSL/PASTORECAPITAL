import ButtonApp from "components/ButtonApp";
import FormApp from "components/FormApp";
import InputApp from "components/FormApp/components/InputApp";
import { useCallback } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { sendEmailCode } from "ui/redux/slices/authentication/autentication.slice";
import { AppDispatch } from "ui/redux/store";
import * as yup from 'yup'


const SendCodeMail = () => {
  const intl = useIntl()
  const dispatch = useDispatch<AppDispatch>()
  const _sendEmailCode = (values: {email:string}) => dispatch(sendEmailCode(values));

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

  return (<SendCodeMailView validationSchema={validationSchema()} sendMail={(values:{email:string})=> _sendEmailCode(values)}/>)
}

const  SendCodeMailView = ({validationSchema, sendMail}:{validationSchema:any, sendMail:Function}) => {
  return (
    <div className={"SendCodeMail"}>
      <div>
        <FormApp
          validationSchema={validationSchema}
          initialValues={{ email: ''}}
          onSubmit={(values: any) => sendMail(values)}
        >
          <InputApp labelID='forms.labels.email' type='email' name='email' />

          <ButtonApp type='submit' labelID='page.recover-password.form.sendEmail.submit' />
        </FormApp>
      </div>
    </div>
  )
}

export default SendCodeMail