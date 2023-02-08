import { Menu, MenuItem } from '@szhsin/react-menu'
import { FormattedMessage } from 'react-intl'
import style from './content-item-list.module.scss'

interface contentItemListProps {
  item: any,
  actions: any
}

const ContentItemList = ({ item, actions }: contentItemListProps) => {
  return (
    <div className={style.contentItemList}>
      <div className={style.contentItemList_info}>
        <div className={`${style.activeDot} ${item.read ? style.active : ''}`}>
        </div>
        <div className={style.contentItemList_label}>
          {item.text}
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
              Object.keys(actions).map(item => {
                const el = actions[item]

                return (
                  <MenuItem key={item} onClick={() => el.action()}>
                    <FormattedMessage id={el.label} />
                  </MenuItem>
                )
              })
            }
            {/* <MenuItem className={'style.menuOption'} target={'_blank'} href={'https://catfriendly.com/wp-content/uploads/2021/02/meow-e1612557327342.jpeg'}>
              <FormattedMessage id={'contextualMenu.item.label.see'}/>
            </MenuItem>
            <MenuItem className={'style.menuOption'} onClick={() => console.error('Bloquer')}>
              <FormattedMessage id={'contextualMenu.item.label.delete'}/>
            </MenuItem> */}
          </Menu>
        </div>
      </div>
    </div>
  )
}

export default ContentItemList