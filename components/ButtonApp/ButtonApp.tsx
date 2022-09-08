import { FormattedMessage } from "react-intl"
import style from './Button.module.scss'
type TYPEBUTTON = 'button' | 'submit'

interface BUTTONPROPS {
  labelID: string,
  onClick?: Function,
  type: TYPEBUTTON,
}

/**
 * Función de componente principal de Botón
 * @param  labelID Key del json de traducción
 * @param  onClick Función de manejo del evento click
 * @param type Tipo de botón
 * @returns 
 */

const ButtonApp = ({ labelID, onClick, type = 'submit' }: BUTTONPROPS) => {
  const handleClick = () => {
    console.log('click desde el botón')
  }
  return (
    <button type={type} className={style.button} onClick={() => { if (onClick) onClick() }}>
      <FormattedMessage id={labelID} />
    </button>)
}

export default ButtonApp