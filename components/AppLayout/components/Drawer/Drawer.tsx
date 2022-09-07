import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useComponentUtils } from 'ui/hooks/components.hooks'
import Footer from '../Footer'
import NavBar from '../NavBar'
import style from './Drawer.module.scss'

const Drawer = ({ children }: any) => {
  return <DrawerView>{children}</DrawerView>;
}

const DrawerView = ({ children }: any) => {
  const router = useRouter()
  const { buildClassName } = useComponentUtils()
  const [isLogin, setisLogin] = useState(true)
  useEffect(() => {
    setisLogin((router.route !== '/login'))
  }, [router.route])


  return (
    <div className={buildClassName([style.drawer, isLogin ? style.grid : ''])}>
      {isLogin && <aside className={style.aside}>
        <button>mobile</button>
        kjsldkfj
      </aside>}
      <main className={style['drawer-static']}>
        {isLogin && <NavBar />}
        {children}
        {/* <Footer /> */}
      </main>
    </div>
  )
}

export default Drawer;