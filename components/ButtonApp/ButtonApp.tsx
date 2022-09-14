import { FormattedMessage } from "react-intl"
import style from './Button.module.scss'
type TYPEBUTTON = 'button' | 'submit'

interface BUTTONPROPS {
  labelID: string,
  onClick?: Function,
  type: TYPEBUTTON,
  buttonStyle?: 'transparent' | 'primary' | 'secondary' | 'default' | 'tab'
}

/**
 * Función de componente principal de Botón
 * @param labelID Key del json de traducción
 * @param onClick Función de manejo del evento click
 * @param type Type del botón
 * @param buttonStyle Estilo visual CSS del bótón transparent | primary | secondary | default | tab
 * @returns 
 */

const ButtonApp = ({ labelID, onClick, buttonStyle = 'default', type = 'submit' }: BUTTONPROPS) => {
  return (
    <button type={type} className={`${style.button} ${style[buttonStyle]}`} onClick={() => { if (onClick) onClick() }}>
      <FormattedMessage id={labelID} />
    </button>)
}

export default ButtonApp