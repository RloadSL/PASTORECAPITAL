import { useRouter } from 'next/router'
import styles from './Drawer.module.scss'
import { useCallback } from 'react'
import style from './Drawer.module.scss'
import DrawerContent from './DrawerContent'
import DrawerNav from './DrawerNav'

/**
 * Función principal del componente Drawer
 */

const Drawer = ({ children }: any) => {
  return <DrawerView>{children}</DrawerView>;
}

const DrawerView = ({ children }: any) => {
  const router = useRouter()

  const visible = useCallback(
    () => router.route !== '/login' && router.route !== '/recover-password',
    [router.route],
  )
  return (

    <div className={style.drawer}>
      <div className={visible() ? style.grid : ''}>
        {visible() && <DrawerNav />}
        <DrawerContent navbar={visible()} routerPath={router.route}>
          {children}
        </DrawerContent>
      </div>
    </div>
  )
}

export default Drawer;