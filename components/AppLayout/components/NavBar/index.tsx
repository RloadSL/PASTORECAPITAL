import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Text from '../../../Text'
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
        <button onClick={()=>back()}><Text id='component.navbar.backbuttom'/></button>
      </div>}
      {titlePage && <div className={styles['navbar-title']}>
        <Text type='h3' id={titlePage}/>
      </div>}
      <div className={styles['navbar-item']}></div>
      { linkToSignIn && <Link href={'/login'}>
        <p>SignIn</p>
      </Link>}
    </div>
  )
}