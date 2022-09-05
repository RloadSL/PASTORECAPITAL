import Footer from './components/Footer'
import DrawerNav from './components/DrawerNav'
import style from './AppLayout.module.scss'
import NavBar from './components/NavBar'
import Form from 'components/Form/Form'

export default function AppLayout({ children }: any) {
  return (
    <div>
      <DrawerNav>
        {children}
      </DrawerNav>
    </div>
  )
}
