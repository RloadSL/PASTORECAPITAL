import { NOT_CONSULTANT, UserConsultant } from "domain/UserConsultant/UserConsultant"
import userConsultantRepository from "infrastructure/repositories/userConsultant.repository"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { getUserLogged } from "ui/redux/slices/authentication/authentication.selectors"
import { getCurrentConsultant } from "ui/redux/slices/tax-consultants/tax-consultants.selectors"
import { setCurrentConsultant } from "ui/redux/slices/tax-consultants/tax-consultants.slice"
import { AppDispatch } from "ui/redux/store"

export const useConsultant = ()=>{
  const dispatch = useDispatch<AppDispatch>()
  const consultant = useSelector(getCurrentConsultant)
  const userLogged = useSelector(getUserLogged)
  const {query, replace, pathname} = useRouter()

  useEffect(() => {
    let fetch = true
    if(userLogged?.role.level > 1 && query.id){
      userConsultantRepository.getUserConsultant(query.id as string)
      .then((uConsultant) => setConsultant(uConsultant))
    }

    if (consultant === NOT_CONSULTANT || userLogged?.uid === 'not-logged') {
       if(pathname != '/tax-consultant/consultants' && pathname != '/tax-consultant/consultants/[id]') 
        replace('/tax-consultant/consultants')
    } 

    return () => {
      fetch = false
    }
  }, [userLogged?.uid])
  

  const setConsultant = async (consultant?:UserConsultant | string) => {
    if(typeof consultant === 'string'){
      const uConsultant = await userConsultantRepository.getUserConsultant(consultant)
      dispatch(setCurrentConsultant(uConsultant))
    }

    if(consultant instanceof UserConsultant){
      dispatch(setCurrentConsultant(consultant))
    }
  }

  return {
    consultant,
    setConsultant
  }
}