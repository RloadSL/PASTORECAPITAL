import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Footer from '../Footer'
import NavBar from '../NavBar'
import styles from './Drawer.module.scss'
export default function Drawer({ children }: any) {
  const router = useRouter()
  const [visibleDrawer, setVisibleDrawer] = useState(true)
  const [visibleNavBar, setvisibleNavBar] = useState(true)
  useEffect(() => {
    setVisibleDrawer((router.route !== '/login' && router.route !== '/sign-up'))
  }, [router.route])
  useEffect(() => {
    setvisibleNavBar((router.route !== '/login' && router.route !== '/sign-up'))
  }, [router.route])

  return (
    <main className={router.route !== '/login' ? styles.grid : ''}>
      {visibleDrawer && <aside className={styles.aside}>
        <button>mobile</button>
        kjsldkfj
      </aside>}
      <div className={styles['drawer-static']}>
        {visibleNavBar && <NavBar />}
        {/* <NavBar /> */}
        {children}
        {/* <Footer /> */}
      </div>
    </main>
  )
}
