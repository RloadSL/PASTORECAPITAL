import React from 'react'
import style from './info-color-card.module.scss'
import Image from 'next/image'


interface InfoColorCardProps {
  backgroundColor: string
  iconHref: any
  children?: any
  alt: string
}

const InfoColorCard = ({ backgroundColor, iconHref, alt, children }: InfoColorCardProps) => {
  return (
    <div className={style.infoColorCard} style={{ backgroundColor: backgroundColor }}>
      <div className={style.infoColorCard_image}>
        <Image src={iconHref} alt={alt} />
      </div>
      <div className={style.infoColorCard_text}>
        {children}
      </div>
    </div>
  )
}

export default InfoColorCard