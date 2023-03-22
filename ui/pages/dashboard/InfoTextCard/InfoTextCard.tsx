import React from 'react'
import style from './info-text-card.module.scss'
import Image from 'next/image'
import Chips from 'components/Chips'
import Link from 'next/link'
import { useComponentUtils } from 'ui/hooks/components.hooks'


interface InfoTextCardProps {
  imageHref: any
  alt: string
  chip?: string
  text: string
  title: string
}

const InfoTextCard = ({ imageHref, alt, chip, text, title }: InfoTextCardProps) => {
  const { limitTextLength } = useComponentUtils()

  return (
    <div className={style.infoTextCard}>
      {chip && (
        <div className={style.top}>
          <div className={style.infoTextCard_chip}>
            <Link href={'#'}>
              <a>
                <Chips
                  chips={[{ label: chip }]}
                  color='lightMain'
                />
              </a>
            </Link>
          </div>
        </div>
      )}
      <div className={style.bottom}>
        <div className={style.infoTextCard_image} style={{ backgroundImage: `url(${imageHref})` }}>
        </div>
        <div className={style.infoTextCard_text}>
          <Link href={'#'}>
            <a href="">
              <h3>
                {title}
              </h3>
            </a>
          </Link>
          <p>
            {limitTextLength(250, text || '')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default InfoTextCard