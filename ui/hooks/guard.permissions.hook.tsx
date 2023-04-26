/* eslint-disable react-hooks/exhaustive-deps */
import { PLANS_TYPE } from 'infrastructure/dto/system_config.dto'
import accesibilityService from 'infrastructure/services/accesibility.service'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'


const initialState = { subscriptionGranted: true }

function reducerPermission (
  state: any,
  action: { garanted: 'garant' | 'no_garant' }
) {
  switch (action.garanted) {
    case 'garant':
      return { ...state, subscriptionGranted: true }
    case 'no_garant':
      return { ...state, subscriptionGranted: false }
    default:
      throw new Error()
  }
}

export const useGuardPermissions = () => {
  const {route} = useRouter()
  const userLogged = useSelector(getUserLogged)
  const [planKey, setUserPlanKey] = useState<PLANS_TYPE | undefined>()
  const [permisssioState, dispatchPermission] = useReducer(
    reducerPermission,
    initialState
  )
  const checkPermissions = useCallback(
    async (route:string,plan:PLANS_TYPE, level: 0 | 1 | 2)=>{
      
      if(level >= 1) return dispatchPermission({garanted:'garant' })
      if(!accesibilityService.isLoaded){
        await accesibilityService.getPermissions();
      }

      if(!planKey && !plan) return;
      if(plan) setUserPlanKey(plan);

      const key_sub = plan || planKey || 'guest'
      const authorized_sections = [...accesibilityService[key_sub],...accesibilityService.system_public_module]
      const authorized = authorized_sections.includes(route)
      dispatchPermission({garanted: authorized ? 'garant' : 'no_garant'})
    },
    [planKey]
  ) 
  
  useEffect(() => {
    if(userLogged)
     checkPermissions(route, userLogged?.subscription.plan.key, userLogged?.role.level)
  }, [route, userLogged])

  return {
    permisssioState,
    dispatchPermission,
    setUserPlanKey,
    checkPermissions
  }
}
