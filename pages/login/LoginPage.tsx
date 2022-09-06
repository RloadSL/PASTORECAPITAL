/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from "components/ButtonApp";
import FormApp from "components/FormApp";
import InputApp from "components/FormApp/components/InputApp";
import * as yup from 'yup';
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useAuthentication } from "../../ui/hooks/authentication.hook";
import { ErrorAuth } from "infrastructure/firebase/authentication.firebase";
import { FormattedMessage, useIntl, } from "react-intl";

interface LOGINVALUE { 
  email: string, 
  password: string 
};

interface LOGINPAGEVIEWPROPS {
  signIn: Function, 
  validationSchema: any, 
  errorAuth: ErrorAuth
}

/** 
* Función principal de Login page
*/
const LoginPage: NextPage = () => {
  const intl = useIntl()
  const router = useRouter()
  const { signIn, cleanError, isLogged, authError } = useAuthentication();
  const _signIn = (value: LOGINVALUE) => {
    cleanError()
    signIn(value)
  }

  const validationSchema = useMemo(() => yup.object({
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'page.login.incorrectEmail' }))
      .required(intl.formatMessage({ id: 'page.login.errorRequired' })),
    password: yup.string().trim().min(6, intl.formatMessage({ id: 'page.login.incorrectPassword' })).required(intl.formatMessage({ id: 'page.login.errorRequired' })),
  }), []);


  useEffect(() => {

    if (isLogged) router.push('/');
  }, [isLogged])


  return (<LoginPageView errorAuth={authError as any} validationSchema={validationSchema} signIn={(value: LOGINVALUE) => _signIn(value)} />);
}

/** 
 * Función de renderizado del componente
 * @param  signIn Función que envía los datos al formulario
 * @param  validationSchema Objecto de yup para validar el formulario 
 * @param errorAuth Valores iniciales del formulario los key tienen que coincidir con los name de los campos input
 * @returns 
 */
const LoginPageView = ({ signIn, validationSchema, errorAuth }: LOGINPAGEVIEWPROPS) => {
  return (
    <div className="login-page container">
      <h1><FormattedMessage id="page.login.title"/></h1>
      <FormApp validationSchema={validationSchema} initialValues={{ email: '', password: '' }} onSubmit={(values: any) => signIn(values)}>
        <InputApp labelID="page.login.labelEmail" type="email" name='email' />
        <InputApp labelID="page.login.labelPassword" type="password" name='password' />
        <ButtonApp type="submit" labelID="page.login.btnSubmit" />
      </FormApp>
      <div>
        <Link href={'/sign-up'}><a>SignUp</a></Link>
      </div>
      {
        errorAuth && <p>
          Error de servidor
        </p>
      }
    </div>
  )
}

export default LoginPage