import { useState } from 'react';
import style from './SidebarCollapsable.module.scss'

interface SIDEBARCOLLAPSABLEPROPS {
  children: any,
  label?: string
}

const SidebarCollapsable = ({ children, label }: SIDEBARCOLLAPSABLEPROPS) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    // isCollapsed(!isOpen)
  };

  return (
    <div className={`${isOpen ? style.isOpen : null} ${style.sidebarCollapsableContainer}`}>
      <button className={style.collapsableButton} onClick={toggleSidebar}>
        <span className='only-readers'>abrir opciones</span>
        <div className={style.label}>
          {label}
        </div>
      </button>
      <div className={`${isOpen ? style.isOpen : null} ${style.sideCollapsable}`}>
        {isOpen ? children : null}
      </div>
    </div>


  )
}

export default SidebarCollapsable;
