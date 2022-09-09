
import style from './Card.module.scss'

export interface CARDPROPS {
  children: any,
  customStyle: string
}

/**
 * Función del componente Card
 * @param customStyle Estilos desde el padre
 * @returns 
 */

const Card = ({children,customStyle}:CARDPROPS) => {
  return (
    <div className={`${style.card} ${customStyle}`}>
     {children} 
    </div>
  )
}
export default Card;
