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
        {navbar && <NavBar />}
        {children}
      </div>
    </div>
  )
}

export default DrawerContent