import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Footer from '../Footer'
import NavBar from '../NavBar'
import styles from './DrawerNav.module.scss'
export default function DrawerNav({ children }: any) {
  const router = useRouter()
  const [visibleDrawer, setVisibleDrawer] = useState(true)
  useEffect(() => {
    setVisibleDrawer((router.route !== '/login' && router.route !== '/sign-up'))
  }, [router.route])


  return (
    <main className={styles.grid}>
      {visibleDrawer && <aside className={styles.aside}>
        kjsldkfj
      </aside>}
      <div className={styles['drawer-static']}>

        <NavBar />


        {children}
        <Footer />

      </div>
    </main>
  )
}
