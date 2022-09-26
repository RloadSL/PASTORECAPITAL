
import style from './Card.module.scss'

export interface CARDPROPS {
  children: any,
  /**@maria Custom style debe recir nombre de clases no styles directos */
  customStyle?: string
}

/**
 * Función del componente Card
 * @param customStyle Estilos del componente
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
