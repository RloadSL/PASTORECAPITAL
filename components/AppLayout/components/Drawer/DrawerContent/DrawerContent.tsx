import { useCallback, useEffect, useState } from 'react'
import NavBar from '../../NavBar'
import style from './DrawerContent.module.scss'

interface DRAWERCONTENTPROPS {
  navbar?: Boolean,
  footer?: Boolean,
  children: any,
  routerPath?: any
}

/**
 * Función principal del componente DrawerContent que renderiza el contenido principal del Drawer
 * @param navbar Prop para renderizar o no el navbar superior de la aplicación
 * @param footer Prop para renderizar o no el footer de la aplicación
 * @param routerPath Prop para comprobar la ruta y adaptar el contenedor general si es necesario
 * @returns 
 */

const DrawerContent = ({ navbar, children, footer = false, routerPath }: DRAWERCONTENTPROPS) => {
  const [windowSize, setWindowSize] = useState({ innerWidth: 0, innerHeight: 0 });

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    setWindowSize({ innerWidth, innerHeight });
    const handleWindowResize = () => {
      const { innerWidth, innerHeight } = window;
      setWindowSize({ innerWidth, innerHeight });
    }

    window.addEventListener('resize', handleWindowResize);
    ///console.log(window.innerWidth)


    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const wrapperStyle =  useCallback(
    () => {
      if (routerPath === '/academy/courses/[course-slug]/[lesson-slug]') {
        return style.wrapperLessons
      } else if (routerPath === '/login' || routerPath === '/recover-password') {
        return style.wrapperLogin
      } else {
        return style.wrapperContainer
      }
    },
    [routerPath],
  )

  return (
    <div className={`${style.drawerWrapper} ${wrapperStyle()}`}>
      <div className={style.drawerMainContainer}>
        {navbar && <NavBar windowSize={windowSize}/>}
        {children}
      </div>
    </div>
  )
}

export default DrawerContent