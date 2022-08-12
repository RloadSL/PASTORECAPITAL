import Footer from './components/Footer'
import DrawerNav from './components/DrawerNav'
import styles from './AppLayout.module.scss'
import NavBar from './components/NavBar'

export default function AppLayout ({ children }: any) {
  return (
    <main>
      <NavBar></NavBar>
      <DrawerNav>
        {children}
      </DrawerNav>
      <Footer/>
    </main>
  )
}
