import { NextPage } from "next";
import { useAthentication } from "../../ui/hooks/authentication.hook";
import SignUpForm from "./components/SignUpForm";

 const SignUp: NextPage = ()=>{
  const {signUp} = useAthentication()
  

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