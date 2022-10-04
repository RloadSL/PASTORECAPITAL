
import { useCallback } from 'react'
import style from './Card.module.scss'

export interface CARDPROPS {
  children: any,
  cardStyle?: 'autocomplite' | 'elevationSmall'| Array<'autocomplite' | 'elevationSmall'>
}

/**
 * Función del componente Card
 * @param customStyle Estilos del componente
 * @returns 
 */

const Card = ({children,cardStyle}:CARDPROPS) => {

  const styles = useCallback( (cardStyle:any)=>{
    if(!cardStyle) return '';
    if(typeof cardStyle === 'string'){
      return style[cardStyle];
    }else{
      return cardStyle.map((className: string) => style[className]).toString().replace(/,/g,' ')
    }
  }, [cardStyle])


  return (
    <div className={`${style.card} ${styles(cardStyle)}`}>
     {children} 
    </div>
  )
}
export default Card;
