
import style from './Card.module.scss'

export interface CARDPROPS {
  children: any,
}
/**
 * Función de componente card
 */

const Card = ({children}:CARDPROPS) => {
  return (
    <div className={style.card}>
     {children} 
    </div>
  )
}
export default Card;
