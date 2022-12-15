/* eslint-disable react-hooks/exhaustive-deps */
import { User } from 'domain/User/User'
import { Role, Subscription } from 'infrastructure/dto/users.dto'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'

const system_public_module = [
  '/',
  '/login',
  '/recover-password',
  '/academy',
  '/academy/tutorials',
  '/academy/courses',
  '/subscription',
  '/research/bitcoins-altcoins',
  '/research/bitcoins-altcoins/[category-slug]',
  '/tax-consultant',
  '/tax-consultant/consultants'
]

const system_subscription_permission_module = {
  guest: [...system_public_module , '/analysis/[category-slug]/[article-slug]'],
  basic: [...system_public_module, '/analysis/[category-slug]/[article-slug]'],
  plus: [...system_public_module, '/academy/tutorials/[tutorial-slug', '/analysis/[category-slug]/[article-slug]'],
  premium: [
    ...system_public_module,
    '/academy/tutorials/[tutorial-slug]',
    '/academy/courses/[course-slug]',
    '/academy/courses/[course-slug]/[lesson-slug]',
    '/analysis/[category-slug]/[article-slug]'
  ]
}

export const useGuardPermissions = () => {
  const userLogged: User = useSelector(getUserLogged)
  const router = useRouter()
  const [subscriptionGranted, setSubscriptionGranted] = useState(true)

  const roleGranted = () => {
    const { role } = userLogged
  }

  const editionSetionGranted = () => {
    if (!userLogged) return false
    const { edition_section, role } = userLogged

    if (role.level >= 1) {
      return true
    }

    return false
  }

  useEffect(() => {
    const _subscriptionGranted = (
      subscription: Subscription,
      role: Role,
      route: string
    ) => {
      //Total permiso para usuarios administradores
      if (role?.level === 2) return setSubscriptionGranted(true)

      const key_sub = subscription?.plan.key || 'guest'
      const authorized_sections = system_subscription_permission_module[key_sub]
      const authorized = authorized_sections.includes(route)

      setSubscriptionGranted(authorized)
    }

    if (userLogged?.uid) {
      _subscriptionGranted(
        userLogged?.subscription,
        userLogged?.role,
        router.route
      )
    }
  }, [router.route])

  return {
    roleGranted,
    subscriptionGranted,
    editionGranted: editionSetionGranted(),
    userChecked: !!userLogged
  }
}
