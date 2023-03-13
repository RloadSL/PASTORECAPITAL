import Card from 'components/Card'
import Chips from 'components/Chips'
import { Webinars } from 'domain/Webinars/Webinars'
import Image from 'next/image'
import React, { useRef } from 'react'
import style from './item-list-webinar.module.scss'
import { hashIDGenerator, randomIntFromInterval } from 'ui/utils/component.utils'

const colorPalette = [
  '#E8E288',
  '#ff8360',
  '#F15BB5',
  '#4CC9F0',
  '#7209B7'
]

interface ItemListWebinarProps {
  item: Webinars,
  onClick: Function,
  showThumb?: boolean,
  chips?: Array<any>
  hasColorSpot?: boolean
}

/**
 * Componente que renderiza un card de webinar
 * @param item Componente de un webinar
 * @param onClick 
 * @param showThumb Para mostrar o mno la imagen de relleno del webinar
 * @param chips Fecha del webinar
 * @param hasColorDot Para mostrar o no la bolita de color del webinar
 * @returns 
 */

const ItemListWebinar = ({ item, onClick, showThumb = false, chips, hasColorSpot = false }: ItemListWebinarProps) => {
  const randomColor = useRef(item.id !== undefined ? colorPalette[Math.abs(hashIDGenerator(item.id)) % 5] : colorPalette[randomIntFromInterval(0, 5)]);


  return (
    <div className={style.webinar}>
      <Card>
        <div onClick={() => onClick(item.id)} className={style.cardContainer} style={{display:`${hasColorSpot ? 'flex':''}`}}>
          {hasColorSpot && (
            <div
              className={style.colorSpot}
              style={{ backgroundColor: randomColor.current }}
            ></div>
          )
          }
          <div>
            {showThumb && (
              <div style={(item.thumb?.url) ? { backgroundImage: `url(${item.thumb?.url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { backgroundSize: '80px' }} className={style.imageContainer}>
              </div>)
            }
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className={style.chipsContainer}>
              {chips && <Chips chips={chips} color={'lightMain'} />}
            </div>
          </div>
        </div>
      </Card>
    </div>


  )
}

export default React.memo(ItemListWebinar)