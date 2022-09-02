import { NextPage } from "next";
import Link from "next/link";
import { useAuthentication } from "../../ui/hooks/authentication.hook";
import SignInForm from "./components/SignInForm";

const LoginPage: NextPage = ()=>{
  const {signIn} = useAuthentication()
  return( <LoginPageView onSubmit={(value:{email:string, password:string})=>signIn(value)}/>);
}

const LoginPageView = ({onSubmit}:{onSubmit:Function}) =>{
  return (
  <div className="container">
      <SignInForm onSubmit={(value:{email:string, password:string})=>onSubmit(value)}/>
    <div>
      <Link href={'/sign-up'}>SignUp</Link>
    </div>
  </div>
  )
}

export default LoginPage