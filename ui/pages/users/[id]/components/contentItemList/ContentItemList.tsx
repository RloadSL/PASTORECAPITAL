import { Menu, MenuItem } from '@szhsin/react-menu'
import { NotificationDto } from 'infrastructure/dto/notification.dto'
import { FormattedMessage } from 'react-intl'
import style from './content-item-list.module.scss'

interface contentItemListProps {
  item: any,
  actions: any,
  message?: string,
  activeDot?:boolean
}

const ContentItemList = ({ item, actions, message,  activeDot }: contentItemListProps) => {
  return (
    <div className={style.contentItemList}>
      <div className={style.contentItemList_info}>
        <div className={`${style.activeDot} ${(!item.read || activeDot) ? style.active : ''}`}>
        </div>
        <div className={style.contentItemList_label}>
          {message ? message : item.message}
        </div>
      </div>
      <div className={style.actionMenu}>
        <div className={style.actionMenu_container}>
          <Menu
            align='end'
            offsetY={5}
            className={style.menu}
            menuButton={
              <button
                className={`menu-options-btn ${style['menu-options-btn']}`}
              >
                <span className='only-readers'>opciones</span>
              </button>
            }
          >
            {
              Object.keys(actions).map(key => {
                const el = actions[key]
                return (
                  <MenuItem key={key} onClick={() => el.action(item)}>
                    <FormattedMessage id={el.label} />
                  </MenuItem>
                )
              })
            }
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default ContentItemList