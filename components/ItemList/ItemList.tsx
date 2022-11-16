import { useComponentUtils } from 'ui/hooks/components.hooks'
import style from './item-list.module.scss'

interface LISTCONTAINERPROPS {
  items: Array<any>
}

const ItemView = ({ item, children }: any) => {
  return (
    <div className={style.listContainer}>
      <li className={style.item}>
        <div className={style.itemContainer}>{children || item}</div>
      </li>
    </div>
  )
}

const ItemList = ({ items }: LISTCONTAINERPROPS) => {
  return <ItemListView items={items} />
}

const ItemListView = ({ items }: LISTCONTAINERPROPS) => {
  return (
    <div className={style.listContainer}>
      <ul className={`table`}>
        {items.map(item =>
          typeof item === 'string' ? (
            <ItemView   item={item} />
          ) : (
            <ItemView key={item.key}>  {item} </ItemView>
          )
        )}
      </ul>
    </div>
  )
}

export default ItemList
