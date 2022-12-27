import style from './card-consultant.module.scss'
import { Avatar } from 'domain/Interfaces/Avatar'
import { Country } from '../../../../../domain/Interfaces/Country'
import Image from 'next/image'
import Link from 'next/link'

const CardConsultant = ({
  id,
  country,
  name,
  lastname,
  avatar,
  keywords,
  state
}: {
  id: string
  country: Country
  avatar: Avatar
  name: string
  lastname: string
  keywords: string[]
  state: 'new' | 'active' | 'disabled'
}) => {
  return (
    <Link href={`/tax-consultant/consultants/${id}`}>
      <a>
        <div
          className={`${style.CardConsultant} ${
            state !== 'new' ? '' : style.new
          }`}
        >
          <div className={style.wraper}>
            <div className={style.header}>
              {avatar?.url && (
                <div className={style.avatar}>
                  <Image src={avatar.url} alt={name} />
                </div>
              )}
              <div className={style.fullname}>
                <p>{country ? country.label : 'Sin país asignado'}</p>
                <p>
                  {name} {lastname}
                </p>
              </div>
            </div>
            <div className={style.bodey}>
              <p>{keywords}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default CardConsultant
