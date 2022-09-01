import { NextPage } from "next";
import Link from "next/link";

const LoginPage: NextPage = ()=>{
  return( <LoginPageView />);
}

const LoginPageView = () =>{
  return (
  <div className="container">
    <div>
      <h1>Formulario de login</h1>
    </div>
    <div>
      <Link href={'/sign-up'}>SignUp</Link>
    </div>
  </div>
  )
}

export default LoginPage