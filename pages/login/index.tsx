/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthentication } from "../../ui/hooks/authentication.hook";
import SignInForm from "./components/SignInForm";
interface LOGINVALUE {email:string, password:string};

const LoginPage: NextPage = ()=>{
  const router = useRouter()
  const {signIn, cleanError, isLogged} = useAuthentication();
  const _onSubmit= (value:LOGINVALUE)=>{
    cleanError()
    signIn(value)
  }

  useEffect(() => {
    console.log(isLogged)
    if(isLogged) router.push('/');
  }, [isLogged])
  

  return( <LoginPageView  onSubmit={(value:LOGINVALUE)=>_onSubmit(value)}/>);
}

const LoginPageView = ({onSubmit, error}:{onSubmit:Function , error?:string}) =>{
  console.log('LoginPageView' ,error)
  return (
  <div className="container">
      <SignInForm onSubmit={(value:{email:string, password:string})=>onSubmit(value)}/>
    <div>
      <Link href={'/sign-up'}>SignUp</Link>
    </div>
    {
      error && <p>
        {error}
      </p>
    }
  </div>
  )
}

export default LoginPage