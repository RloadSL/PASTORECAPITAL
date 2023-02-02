import ItemList from 'components/ItemList'
import style from './Notifications.module.scss'
import { notifications } from 'ui/utils/test.data'
import { FormattedMessage } from 'react-intl'
import ContentItemList from '../components/contentItemList/ContentItemList'
import Modal from 'components/Modal'

interface NotificationsProps {
  onClose: Function
}

const Notifications = ({ onClose}: NotificationsProps) => {
  return <NotificationsView onClose={onClose} />
}

const NotificationsView = ({ onClose}: NotificationsProps) => {

  const actionsItemList = {
    view:{label:'contextualMenu.item.label.see',action: () => alert('ver notification')},
    delete:{label:'contextualMenu.item.label.delete',action: () => alert('eliminar')},
  } 

  return (
    <div className={style.notifications}>
      <h1 className='main-title'><FormattedMessage id={'page.notifications.title'}/></h1>
      <div className={style.notifications_container}>
        <ItemList items={notifications.map(notification => <ContentItemList actions={actionsItemList} key={notification.id} item={notification} />)} />
      </div>
      {/* <Modal onBtnClose={() => onClose()}>
        <div className={style.modalContainer}>
        holi
        </div>
      </Modal> */}
    </div>
  )
}

export default Notifications;