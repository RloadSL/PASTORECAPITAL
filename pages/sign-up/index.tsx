import { CreateUser } from "infrastructure/dto/users.dto";
import { NextPage } from "next";
import { useDispatch } from "react-redux";
import { signUpEmailPassword } from "ui/redux/slices/authentication/autentication.slice";
import { AppDispatch } from "ui/redux/store";
import SignUpForm from "./components/SignUpForm";

 const SignUp: NextPage = ()=>{
  const dispatch = useDispatch<AppDispatch>()
  const _signUp = (values:CreateUser) => dispatch(signUpEmailPassword(values))
  return <SignUpView onSubmitForm={_signUp}/>
}

const SignUpView = ({onSubmitForm}: {onSubmitForm: Function})=>{
  return (
    <div className="container">
      <SignUpForm onSubmit={(value:any)=>onSubmitForm(value)}/>
    </div>
  )
}

export default SignUp