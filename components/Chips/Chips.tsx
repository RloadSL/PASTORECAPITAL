import style from './Chips.module.scss'

type COLOR = 'main' | 'lightMain'

interface CHIPPROPS {
  chips: Array<string>;
  color?: COLOR
}

/**
 * Función del componente Chip
 * @param chips Chips que se van a renderizar uno o varios
 * @param color Color de los chips
 * @returns 
 */

const Chips = ({ chips, color = 'main' }: CHIPPROPS) => {
  return Array.isArray(chips) ? <ChipsView chips={chips} color={color} /> : null
}

const ChipsView = ({ chips, color = 'main' }: CHIPPROPS) => {
  return <div className='flex-container'>
    {chips.map((item: any, index: any) => {
      return (
        <div key={index} className={`${style[color]} ${style.chipContainer}`}>
          <span>{item}</span>
        </div>
      )
    })}
  </div>
}

export default Chips;