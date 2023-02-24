import { useComponentUtils } from 'ui/hooks/components.hooks'
import style from './item-list.module.scss'

interface LISTCONTAINERPROPS {
  items: Array<any>
}

const ItemView = ({ item, children }: any) => {
  return (
      <li className={style.item}>
        <div className={style.itemContainer}>{children || item}</div>
      </li>
  )
}

const ItemList = ({ items }: LISTCONTAINERPROPS) => {
  return (
    <div className={style.listContainer}>
      <ul className={`table`}>
        {items.map((item,index:any) =>
          typeof item === 'string' ? (
            <ItemView key={index} item={item} />
          ) : (
            <ItemView key={item.key}>  {item} </ItemView>
          )
        )}
      </ul>
    </div>
  )
}

export default ItemList
