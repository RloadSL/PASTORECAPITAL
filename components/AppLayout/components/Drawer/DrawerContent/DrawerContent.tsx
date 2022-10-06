import NavBar from '../../NavBar'
import style from './DrawerContent.module.scss'

interface DRAWERCONTENTPROPS {
  navbar?: Boolean,
  footer?: Boolean,
  children: any
}

/**
 * Función principal del componente DrawerContent que renderiza el contenido principal del Drawer
 * @param navbar Prop para renderizar o no el navbar superior de la aplicación
 * @param footer Prop para renderizar o no el footer de la aplicación
 * @returns 
 */

const DrawerContent = ({ navbar, children, footer = false }: DRAWERCONTENTPROPS) => {
  return (
    <div className={style.drawerWrapper}>
      <div className={style.drawerMainContainer}>
      {navbar && <NavBar />}
      {children}

        {/* <div className={style.drawerContent}>
          
        </div> */}
      </div>
    </div>
  )
}

export default DrawerContent