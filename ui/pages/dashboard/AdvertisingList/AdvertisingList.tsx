import React from 'react'
import style from './advertising-list.module.scss'
import ad1 from '../../../../assets/img/ad1.png'
import ad2 from '../../../../assets/img/ad2.png'
import ad3 from '../../../../assets/img/ad3.png'
import ad4 from '../../../../assets/img/ad4.png'
import Image from 'next/image'


const adsArr = [
  // // {
  // //   id: '1',
  // //   src: ad1
  // // },
  {
    id: '2',
    src: ad2
  },
  null,
  null,
  null,
  null
]

interface AdvertisingListProps {
}

const AdvertisingList = ({ }: AdvertisingListProps) => {
  return (
    <ul className={style.advertisingList}>
      {adsArr.map((item, index: any) => {
        return (
          <li key={index}>
            {item ? (
              <div>
                <Image src={item.src} alt='' />
              </div>
            ) : (
              <div className={style.emptyAd}>
                <div className={style.emptyAd_content}>
                  <p>Promote your site</p>
                  <p>with us</p>
                </div>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default AdvertisingList