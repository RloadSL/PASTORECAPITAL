import { FormattedMessage } from "react-intl"
import style from './Button.module.scss'
import Image from 'next/image'
type TYPEBUTTON = 'button' | 'submit'

interface BUTTONPROPS {
  labelID: string,
  onClick?: Function,
  type?: TYPEBUTTON,
  buttonStyle?: 'transparent' | 'primary' | 'secondary' | 'default' | 'tab' | 'dark' | 'link' | 'delete';
  size?: 'small' | 'default'
  icon?: any
}

/**
 * Función de componente principal de Botón
 * @param labelID Key del json de traducción
 * @param onClick Función de manejo del evento click
 * @param type Type del botón
 * @param buttonStyle Estilo visual CSS del bótón transparent | primary | secondary | default | tab
 * @param icon Icono si el botón tiene imagen
 * @returns 
 */

const ButtonApp = ({ labelID, onClick, icon, buttonStyle = 'default', type = 'submit', size='default' }: BUTTONPROPS) => {
  console.log(style[buttonStyle])
  return (
    <button type={type} className={`${icon ? 'flex-container space-between align-center':''} ${style.button} ${style[buttonStyle]} ${style[size]}`} onClick={() => { if (onClick) onClick() }}>
      <FormattedMessage id={labelID} />
      {icon ? <span className={style.icon}><Image src={icon} alt={''}/></span> : null}
    </button>)
}

export default ButtonApp