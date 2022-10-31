import Card from 'components/Card'
import style from './subscriptionBanner.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import LinkApp from 'components/LinkApp'

interface SUBSCRIPTIONBANNERPROPS {
  image?: any // OJO este tipado ¿mejor tipar específico para imágenes?
  colLeftContent?: any
  colRightContent?: any
  linkHref: string
  children?: any,
  backgroundColor?: any
}

const SubscriptionBanner = ({ linkHref,children, image, colLeftContent, colRightContent, backgroundColor }: SUBSCRIPTIONBANNERPROPS) => {

  return (
    <Link href={linkHref}>
      <a>
        <Card backgroundColor={backgroundColor}>
          <div className={style.subscriptionBannerContainer}>
            <div className={style.colLeft}>
              {image ? (
                <div className={style.imageContainer}>
                  <Image src={image} alt='' />
                </div>
              ) : null}
              <div className={image ? style.colLeftContent : ''}>
                {colLeftContent}
              </div>
            </div>
            <div className={style.colRight}>
              {colRightContent}
            </div>
            {children}
          </div>
        </Card>
      </a>
    </Link>
  )
}

export default SubscriptionBanner