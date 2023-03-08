import ItemList from 'components/ItemList'
import style from './notifications.module.scss'
import { notifications } from 'ui/utils/test.data'
import { FormattedMessage } from 'react-intl'
import ContentItemList from '../components/contentItemList/ContentItemList'
import { useEffect, useState } from 'react'
import notificationRepository from 'infrastructure/repositories/notification.repository'
import { useRouter } from 'next/router'
import { NotificationDto } from 'infrastructure/dto/notification.dto'
import Modal from 'components/Modal'
import ButtonApp from 'components/ButtonApp'
import { useSelector } from 'react-redux'
import { cleanNoti, deleteNotifications, getNotifications } from 'ui/redux/slices/user-information/user-information.slice'
import {
  getNotifications as notiSelector,
  getUserInformationLoading
} from 'ui/redux/slices/user-information/user-information.selectors'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'ui/redux/store'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'

interface NotificationsProps {
  onClose: Function
}

const Notifications = ({ onClose }: NotificationsProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { query } = useRouter()
  const notifications = useSelector(notiSelector)
  const fetching = useSelector(getUserInformationLoading)
  const [view, setView] = useState<NotificationDto | undefined>()
  const userLogged = useSelector(getUserLogged)
  useEffect(() => {
   
    if(userLogged && userLogged.uid != 'not-logged'){
      getData()
      userLogged?.setPersonalStats({id:'notifications_stats' , new_notifications : false})
    }
  }, [query.uid])

  const getData = ()=>{
    if (!fetching && query.uid) {
      
      dispatch(cleanNoti)
      dispatch(
        getNotifications({
          uid: query.uid as string,
          last: notifications.lastNoti
        })
      )
    }
  }

  const _deleteNotification = (noti: NotificationDto) => {
    dispatch(
      deleteNotifications(noti.id as string)
    )
   
  }

  const actionsItemList = {
    view: { label: 'contextualMenu.item.label.see', action: setView },
    delete: {
      label: 'contextualMenu.item.label.delete',
      action: _deleteNotification
    }
  }
  return (
    <div className={style.notifications}>
      <h1 className='main-title'>
        <FormattedMessage id={'page.notifications.title'} />
      </h1>
      <div className={style.notifications_container}>
        <ItemList
          items={notifications.noti.map((noti: NotificationDto) => (
            <ContentItemList
              actions={actionsItemList}
              key={noti.id}
              item={noti}
            />
          ))}
        />
        {notifications.lastNoti && <div>
          <ButtonApp onClick={getData}>LoadMore</ButtonApp>
        </div>}
      </div>
      {view && (
        <Modal onBtnClose={() => setView(undefined)}>
          <div className={style.modalContainer}>{view.message}</div>
        </Modal>
      )}
    </div>
  )
}

export default Notifications
