import { useState } from 'react';
import style from './MenuCollapsable.module.scss'

interface DRAWERMENUPROPS {
  children: any,
  isCollapsed: any
}

const MenuCollapsable = ({ children, isCollapsed }: DRAWERMENUPROPS) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    isCollapsed(!isOpen)
  };

  return (
    <>
      <div className={`${isOpen ? style.isOpen : null} ${style.sideCollapsableContainer}`}>
        <button className={style.collapsableButton} onClick={toggleDrawer}>
          <span className='only-readers'>abrir opciones</span>
        </button>
        <div className={`${isOpen ? style.isOpen : null} ${style.sideCollapsable}`}>
          {children}
        </div>
      </div>
      <div onClick={toggleDrawer} className={`${isOpen ? style.isOpen : null} ${style.overlay}`}></div>
    </>


  )
}

export default MenuCollapsable;