import { useRouter } from 'next/router'
import styles from './Drawer.module.scss'
import { useCallback } from 'react'




import Footer from '../Footer'
import NavBar from '../NavBar'
import style from './Drawer.module.scss'

const Drawer = ({ children }: any) => {
  return <DrawerView>{children}</DrawerView>;
}

const DrawerView = ({ children }: any) => {
  const router = useRouter()

  const visible = useCallback(
    () => router.route !== '/login',
    [router.route],
  )
  return (
    <main className={visible() ? styles.grid : ''}>
      {visible() && <aside className={styles.aside}>

        <button>mobile</button>
        MOBILE
      </aside>}

      <div className={styles['drawer-static']}>
        {visible() && <NavBar />}
        {children}
        
      </div>
    </main>

  )
}

export default Drawer;