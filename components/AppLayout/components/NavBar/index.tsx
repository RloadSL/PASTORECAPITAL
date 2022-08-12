import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Text from '../../../Text'
import styles from './NavBar.module.scss'



const NavBarView = ({back, titlePage}:{back?:Function, titlePage?:string}) => {
  return (
    <div className={styles['navbar-container']}>
      {back && <div className={styles['navbar-back']}>
        <button onClick={()=>back()}><Text id='component.navbar.backbuttom'/></button>
      </div>}
      {titlePage && <div className={styles['navbar-title']}>
        <Text type='h3' id={titlePage}/>
      </div>}
      <div className={styles['navbar-item']}></div>
      <Link href={'/login'}>
        <p>SignIn</p>
      </Link>
    </div>
  )
}


export default function NavBar () {
  const router = useRouter()
  console.log(router.route)
  const titlePage = router.route != '/' ? router.route.replace('/', '') : 'home';
  return <NavBarView  back={router.route === "/" ? router.back : undefined} titlePage={`page.${titlePage}.title`}/>
}