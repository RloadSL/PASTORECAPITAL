
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import styles from './NavBar.module.scss'

export default function NavBar () {
  const router = useRouter()
  const titlePage = router.route != '/' ? router.route.replace('/', '') : 'home';
  return <NavBarView linkToSignIn={(router.route !== '/login')}  back={router.route === "/" ? router.back : undefined} titlePage={`page.${titlePage}.title`}/>
}

const NavBarView = ({back, titlePage, linkToSignIn}:{back?:Function, titlePage?:string, linkToSignIn:boolean}) => {
  const router = useRouter()
  return (
    <div className={styles['navbar-container']}>
      {back && <div className={styles['navbar-back']}>
        <button onClick={()=>back()}><FormattedMessage id='component.navbar.backbuttom'/></button>
      </div>}
      {titlePage && <div className={styles['navbar-title']}>
        <FormattedMessage id={titlePage}/>
       
      </div>}
      <div className={styles['navbar-item']}></div>
      { linkToSignIn && <Link href={'/login'}>
        <a >
        <FormattedMessage id='component.navbar.signUp'/>
        </a>
        
      </Link>}
    </div>
  )
}