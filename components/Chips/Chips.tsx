import style from './Chips.module.scss'
import Image from 'next/image'
import { FormattedMessage } from 'react-intl'

type COLOR = 'main' | 'lightMain'

interface CHIPPROPS {
  chips: Array<{ label: string; icon?: any }> | Array<string>
  color?: COLOR
  hasIcon?: any
  noTranslate?: boolean
}

/**
 * Función del componente Chip
 * @param chips Chips que se van a renderizar uno o varios
 * @param color Color de los chips
 * @param hasIcon Imagen que se le pasa si el chip tiene icono
 * @returns
 */

const Chips = ({
  hasIcon,
  chips,
  noTranslate = false,
  color = 'main'
}: CHIPPROPS) => {
  return Array.isArray(chips) ? (
    <ChipsView hasIcon={hasIcon} chips={chips} color={color} />
  ) : null
}

const ChipsView = ({
  hasIcon,
  chips,
  noTranslate,
  color = 'main'
}: CHIPPROPS) => {
  return (
    <div className='flex-container wrap'>
      {chips.map((item: any, index: any) => {
        return (
          <div
            key={index}
            className={`${style[color]} ${style.chipContainer} flex-container align-center`}
          >
            {hasIcon || item.icon ? (
              <span className={`${style.hasIcon} flex-container`}>
                <Image
                  src={hasIcon || item.icon}
                  width='18px'
                  height='18px'
                  alt=''
                />
              </span>
            ) : null}
            {/* <span className={style.chipLabel}>{ typeof item  === 'string' ? item : item.label }</span> */}
            {noTranslate ? (
              <span className={style.chipLabel}>
                {typeof item === 'string' ? (
                  <FormattedMessage id={item} />
                ) : (
                  <FormattedMessage id={item.label || 'empty'} />
                )}
              </span>
            ) : (
              <span className={style.chipLabel}>
                {typeof item === 'string' ? item : item.label || 'empty'}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Chips
