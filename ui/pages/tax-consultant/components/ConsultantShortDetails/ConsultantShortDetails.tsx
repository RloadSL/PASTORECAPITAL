/* eslint-disable @next/next/no-img-element */
import Chips from 'components/Chips'
import UserImage from 'components/UserImage'
import style from './consultantShortDetails.module.scss'

interface ConsultantShortDetailsProps {
  country: any
  avatar: any
  name: string
  lastname: string
  keywords: Array<string> | undefined
  state: 'new' | 'active' | 'disabled' | undefined
}

const ConsultantShortDetails = ({
  country,
  name,
  lastname,
  avatar,
  keywords,
  state }: ConsultantShortDetailsProps) => {
  return (
    <div
      className={`flex-container align-center ${style.consultantShortDetailsContainer} ${state !== 'new' ? '' : style.new
        }`}
    >
      <div className={style.userImage}>
        <UserImage image={avatar?.url || avatar} size={'medium'} userImageStyle={['rounded', 'nobordered']} />
      </div>

      <div className={style.userInfo}>
        <p>
          {country?.flagUrl && <div className='flex-container'><div className={style.flagIcon} style={{ backgroundImage: `url(${country?.flagUrl})` }}></div><span>{country ? country.label : 'Sin país asignado'}</span></div>}
        </p>
        <p className={style.title}>
          {name} {lastname}
        </p>
        {(keywords && keywords?.length > 0) ? (
          <div className={style.chipsContainer}>
            <Chips chips={keywords.slice(0, 3)} color='lightMain' />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ConsultantShortDetails;