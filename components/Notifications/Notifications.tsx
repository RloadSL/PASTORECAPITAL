import style from './Notifications.module.scss'
import Image from 'next/image'
import bellIcon from '../../assets/img/icons/bell.svg'

interface NOTIFICATIONSPROPS {
  hasNotifications: boolean
}

/**
 * Función principal del componente Notifications
 * @param hasNotifications Prop para pasarle si tiene o no notificaciones el usuario
 * @returns 
 */

const Notifications = ({ hasNotifications = true }: NOTIFICATIONSPROPS) => {
  return <NotificationsView hasNotifications={hasNotifications} />
}

const NotificationsView = ({ hasNotifications }: NOTIFICATIONSPROPS) => {
  return (
    <div className='position-relative'>
      {hasNotifications ? <span className={style.dotAlert}></span> : null}
      <div className={style.notifications}>
        <div className={style.imageContainer}>
          <Image src={bellIcon} alt='' />
        </div>
      </div>
    </div>

  )
}

export default Notifications;