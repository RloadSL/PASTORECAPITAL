import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from './DrawerNav.module.scss'
export default function DrawerNav ({ children }: any) {
  const router = useRouter()
  const [visibleDrawer, setVisibleDrawer] = useState(true)
  useEffect(() => {
    setVisibleDrawer(router.route !== '/login')
  }, [router.route])
  

  return (
    <>
      <div className={styles['drawer-container']}>
        {visibleDrawer && <div className={styles['drawer']}>
            <h1>Drawer</h1>
        </div>}
        <div className={styles['drawer-static']}>
          {children}
        </div>
      </div>
    </>
  )
}
