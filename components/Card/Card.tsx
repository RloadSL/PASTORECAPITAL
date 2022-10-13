
import { useCallback } from 'react'
import style from './Card.module.scss'

export interface CARDPROPS {
  children: any,
  cardStyle?: 'default' | 'outlined' | 'autocomplite' | 'elevationSmall'| Array<'autocomplite' | 'elevationSmall'>
  backgroundColor?: string
}

/**
 * Función del componente Card
 * @param cardStyle Tipo de card
 * @returns 
 */

const Card = ({children,cardStyle = 'default', backgroundColor='white'}:CARDPROPS) => {

  const styles = useCallback( (cardStyle:any)=>{
    if(!cardStyle) return '';
    if(typeof cardStyle === 'string'){
      return style[cardStyle];
    }else{
      return cardStyle.map((className: string) => style[className]).toString().replace(/,/g,' ')
    }
  }, [cardStyle])


  return (
    <div style={{backgroundColor:backgroundColor}} className={`${style.card} ${styles(cardStyle)}`}>
     {children} 
    </div>
  )
}
export default Card;
