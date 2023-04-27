import { FormattedMessage } from "react-intl"
import style from './Button.module.scss'
import Image from 'next/image'
import { useComponentUtils } from "ui/hooks/components.hooks";
type TYPEBUTTON = 'button' | 'submit'

type BUTTONSTYLE = 'transparent' | 'primary' | 'secondary' | 'default' | 'tab' | 'dark' | 'link' | 'delete' | 'outlined'

interface BUTTONPROPS {
  labelID?: string,
  onClick?: Function,
  type?: TYPEBUTTON,
  buttonStyle?: BUTTONSTYLE | Array<BUTTONSTYLE>;
  size?: 'small' | 'default'
  icon?: any
  children?:any
  stopPropagation?:boolean
  disable?:boolean
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

const ButtonApp = ({children ,labelID, onClick, icon, stopPropagation ,buttonStyle = 'default', type = 'submit', size='default', disable=false }: BUTTONPROPS) => {
  const { buildClassName } = useComponentUtils()
  return (
    <button disabled={disable} type={type} className={`${icon ? 'flex-container space-between align-center':''} ${style.button} ${buildClassName(buttonStyle, style)} ${style[size]}`} onClick={(e) => { 
      if(stopPropagation){
        e.preventDefault();
        e.stopPropagation();
      }
      
      if (onClick) onClick() 
      }}>
      {children ? children : <FormattedMessage id={labelID} />}
      {icon ? <span className={style.icon}><Image src={icon} alt={''}/></span> : null}
    </button>)
}

export default ButtonApp