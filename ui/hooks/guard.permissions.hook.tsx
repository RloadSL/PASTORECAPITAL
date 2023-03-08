/* eslint-disable react-hooks/exhaustive-deps */
import { PLANS_TYPE } from 'infrastructure/dto/system_config.dto'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'

const system_public_module = [
  '/',
  '/login',
  '/recover-password',
  '/thank-you-purchase',
  '/subscription',
  '/news',
  '/discord',
  '/webinars',
  '/webinars/[w_id]',
  '/amas',
  '/amas/[chatroom_id]',
  '/subscription/[plan-subscription]',
  '/users/[uid]',
  '/users/[uid]/notifications',
  '/users/[uid]/invoices',
  ////////
  '/academy',
  '/academy/tutorials',
  '/academy/courses',
  '/research/flash-updates',
  '/research/bitcoins-altcoins',
  '/research/bitcoins-altcoins/[category-slug]',
  '/tax-consultant',
  '/tax-consultant/consultants',
  '/tax-consultant/consultants/[id]',
  '/tax-consultant/consultants/[id]/services/[service_id]',
  '/tax-consultant/consultants/[id]/services/[service_id]/payment'
]

const system_subscription_permission_module = {
  guest: [...system_public_module],
  basic: [...system_public_module, 
    '/analysis/[category-slug]/[article-slug]'],
  plus: [
    ...system_public_module, 
    '/academy/tutorials/[tutorial-slug]', 
    '/analysis/[category-slug]/[article-slug]'],
  premium: [
    ...system_public_module,
    '/academy/tutorials/[tutorial-slug]',
    '/academy/courses/[course-slug]',
    '/academy/courses/[course-slug]/[lesson-slug]',
    '/analysis/[category-slug]/[article-slug]',
    '/research/bitcoins-altcoins/[category-slug]/[article-slug]',
  ]
}

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
    (route:string,plan:PLANS_TYPE, level: 0 | 1 | 2)=>{
      
      if(level >= 1) return dispatchPermission({garanted:'garant' })


      if(!planKey && !plan) return;
      if(plan) setUserPlanKey(plan);

      const key_sub = plan || planKey || 'guest'
      const authorized_sections = system_subscription_permission_module[key_sub]
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
