import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { User } from "../../domain/User/User"
import { ErrorAuth } from "../../infrastructure/firebase/authentication.firebase"
import { signInEmailPassword } from "../redux/slices/authentication/autentication.slice"
import { authenticationError, getUserLogged } from "../redux/slices/authentication/authentication.selectors"
import { AppDispatch } from "../redux/store"

export const useAthentication = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userLogged:User = useSelector(getUserLogged)
  const authError:ErrorAuth = useSelector(authenticationError)
  const route = useRouter()
  const login = (email:string, password:string) => dispatch(signInEmailPassword({email:'', password: ''}))
  useEffect(() => {
     route.push('/login')
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [userLogged])
}