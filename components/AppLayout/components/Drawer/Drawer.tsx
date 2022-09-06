import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import Footer from '../Footer'
import NavBar from '../NavBar'
import styles from './Drawer.module.scss'
export default function Drawer({ children }: any) {
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
