import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { User } from "../../domain/User/User"
import { CreateUser } from "../../infrastructure/dto/users.dto"
import { ErrorAuth } from "../../infrastructure/firebase/authentication.firebase"
import { signInEmailPassword, signUpEmailPassword } from "../redux/slices/authentication/autentication.slice"
import { authenticationError, getUserLogged } from "../redux/slices/authentication/authentication.selectors"
import { AppDispatch } from "../redux/store"

export const useAthentication = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userLogged:User = useSelector(getUserLogged)
  //const authError = useSelector(authenticationError)
  const route = useRouter()

  const signUp:Function = (data:CreateUser) => dispatch(signUpEmailPassword(data));
  useEffect(() => {
    console.log(route.route)
    if(route.route != '/sign-up' && route.route != '/login'){
      route.push('/login')
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [userLogged])

  return {
    signUp
  }
}