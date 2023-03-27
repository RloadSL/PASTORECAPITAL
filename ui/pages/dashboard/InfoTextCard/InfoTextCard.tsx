import React from 'react'
import style from './info-text-card.module.scss'
import Image from 'next/image'
import Chips from 'components/Chips'
import Link from 'next/link'
import { useComponentUtils } from 'ui/hooks/components.hooks'
import LockedContent from 'components/LockedContent'

interface InfoTextCardProps {
  imageHref: any
  alt: string
  chip?: string
  text: any
  title: string
  href?: any
  isLocked?: boolean
  blockContent?: boolean
}

const InfoTextCard = ({
  imageHref,
  alt,
  chip,
  text,
  title,
  href,
  blockContent,
  isLocked
}: InfoTextCardProps) => {
  const { limitTextLength } = useComponentUtils()
  return (
    <div className={style.infoTextCard}>
      {chip && (
        <div className={style.top}>
          <div className={style.infoTextCard_chip}>
            <Link href={'#'}>
              <a>
                <Chips chips={[{ label: chip }]} color='lightMain' />
              </a>
            </Link>
          </div>
        </div>
      )}
      <div className={style.bottom}>
        {isLocked && blockContent ? (
          <LockedContent />
        ) : (
          <div
            className={style.infoTextCard_image}
            style={{ backgroundImage: `url(${imageHref})` }}
          ></div>
        )}
        <div className={style.infoTextCard_text}>
          <Link href={href || '#'}>
            <a href=''>
              <h3>{title}</h3>
            </a>
          </Link>
          <p>{limitTextLength(250, text || '')}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoTextCard
