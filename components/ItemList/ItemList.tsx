import { useComponentUtils } from 'ui/hooks/components.hooks'
import style from './item-list.module.scss'

interface LISTCONTAINERPROPS {
  items?: Array<any>
  children?: any
}

const ItemView = ({ item, children }: any) => {
  return (
      <li className={style.item}>
        <div className={style.itemContainer}>{children || item}</div>
      </li>
  )
}

const ItemList = ({ items , children}: LISTCONTAINERPROPS) => {
  return (
    <div className={style.listContainer}>
      <ul className={`table`}>
        {(items || children).map((item:any) =>
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
