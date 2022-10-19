import { User } from "domain/User/User"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { getUserLogged } from "ui/redux/slices/authentication/authentication.selectors"




export const useGuardPermissions = () => {
  const userLogged:User = useSelector(getUserLogged)
  const router = useRouter()

  const roleGranted = () => { 
    const { role } = userLogged;  

  }

  const subscriptionGranted = () => { 
    const { subscription } = userLogged;  
    
  }

  const editionSetionGranted = () => {
    console.log('editionSetionGranted')
    if(!userLogged)  return false;

    const { edition_section, role } = userLogged;  
    
    if(role.level >= 1){
      return true;
    }

    return false;
  }

  return {
    roleGranted,
    subscriptionGranted,
    editionGranted : editionSetionGranted()
  }
}