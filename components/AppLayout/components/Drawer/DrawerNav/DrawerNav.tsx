import style from './DrawerNav.module.scss'

/**
 * Función principal del componente DrawerNav que renderiza el contenido principal del Drawer
 */

const DrawerNav = ({ children }: any) => {
  return (
    <div className={style.drawerNav}>
      <aside className={style.aside}>
        {children}
      </aside>

    </div>
  )
}

export default DrawerNav