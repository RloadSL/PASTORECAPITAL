import { NextPage } from "next";
import SignUpForm from "./components/SignUpForm";

 const SignUp: NextPage = ()=>{
  const signUp = (userData:{name:string, email:string, password:string})=>{
    console.log('signUp',userData)
  }

  return <SignUpView onSubmitForm={signUp}/>
}

const SignUpView = ({onSubmitForm}: {onSubmitForm: Function})=>{
  return (
    <div className="container">
      <SignUpForm onSubmit={(value:any)=>onSubmitForm(value)}/>
    </div>
  )
}

export default SignUp