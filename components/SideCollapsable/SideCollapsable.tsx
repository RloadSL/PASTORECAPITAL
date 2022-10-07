import { useState } from 'react';
import style from './SideCollapsable.module.scss'

interface DRAWERMENUPROPS {
  children:any,
  isCollapsed: any
}

const SideCollapsable = ({children, isCollapsed}: DRAWERMENUPROPS) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    isCollapsed(!isOpen)
  };

  console.log('¿esta abierto?',isOpen)

  return (
    <div className={`${isOpen ? style.isOpen : null} ${style.sideCollapsableContainer}`}>
      <button className={style.collapsableButton} onClick={toggleDrawer}>
        <span className='only-readers'>abrir opciones</span>
      </button>
      <div className={`${isOpen ? style.isOpen : null} ${style.sideCollapsable}`}>
      {children}
      </div>
    </div>
  )
}

export default SideCollapsable;