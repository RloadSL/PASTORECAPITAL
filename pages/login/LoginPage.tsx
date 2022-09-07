/* eslint-disable react-hooks/exhaustive-deps */
import style from "./LoginPage.module.scss";
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
import { useComponentUtils } from "ui/hooks/components.hooks";
import Card from "components/Card";

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
  const { signIn, authError, cleanError, isLogged } = useAuthentication()
  const _signIn = (value: LOGINVALUE) => {
    cleanError()
    signIn(value)
    alert('KK')
  }

  useMemo(() => {
    if (authError.length > 0) {
      setTimeout(() => {
        cleanError()
      }, 2000);
    }
  }, [authError.length])


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
  const { buildClassName } = useComponentUtils()

  return (
    <div className={style.loginPage}>
      <div className={style.mainContainer}>
        <div className={style.colLeft}>
          <h1 className={buildClassName([style.loginTitle])}>
            Lorem ipsum dolor sit amet consectetur adipisicing
          </h1>
        </div>
        <div className={style.colRight}>
          <Card>
          <div>
                <Link href={'/sign-up'}><a>SignUp</a></Link>
              </div>
              <p>
                <FormattedMessage id="page.login.title" />
              </p>
            <div>


              <FormApp validationSchema={validationSchema} initialValues={{ email: '', password: '' }} onSubmit={(values: any) => signIn(values)}>
                <InputApp labelID="page.login.labelEmail" type="email" name='email' />
                <InputApp labelID="page.login.labelPassword" type="password" name='password' />
                <ButtonApp type="submit" labelID="page.login.btnSubmit" />
              </FormApp>

              {
                errorAuth && <p>
                  Error de servidor
                </p>
              }
            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}

export default LoginPage