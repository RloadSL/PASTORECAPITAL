import Card from 'components/Card'
import PostExcerpt from 'components/PostExcerpt'
import { Course } from 'domain/Course/Course'
import React from 'react'
import style from './PostGridItem.module.scss'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import menuButton from '../../../../assets/img/icons/menu-dots-vertical.png';
import publishIcon from '../../../../assets/img/icons/public.svg';
import privateIcon from '../../../../assets/img/icons/lock-w.svg';
import Image from 'next/image'
import { gridItems } from 'ui/utils/test.data'


/**
 * Función principal del componente item grid que renderiza el elemeto que se estrcutura en el grid
 * @param gridItem Elemento para renderizar
 * @returns
 */

const PostGridItem = ({
  gridItem,
  onClickItem,
  isAdmin = false
}: {
  gridItem: Course
  onClickItem: Function
  isAdmin: boolean
}) => {
  return <PostGridItemView isAdmin={isAdmin} onClickItem={onClickItem} gridItem={gridItem} />
}

const PostGridItemView = ({ gridItem, onClickItem, isAdmin }: any) => {
  const _renderHeader = () => {
    return (
      <div className={style.header} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className={style.postStatus} style={gridItem.status === 'publish' ? {backgroundColor:'#62dc62'} : {backgroundColor:'#ff5e86'}}>
          {gridItem.status === 'publish' ? <Image src={publishIcon} alt='' /> : <Image src={privateIcon} alt='' />}</div>
        <Menu
          align='end'
          offsetY={5}
          menuButton={
            <button className={style.btnMenu}>
              <span className='only-readers'>opciones</span>
            </button>}
        >
          <MenuItem onClick={() => onClickItem('edit')}>Editar</MenuItem>
          <MenuItem>Eliminar</MenuItem>
        </Menu>
      </div>
    )
  }

  return (
    <Card>
      <div className={style.cardContainer}>
        {isAdmin && _renderHeader()}
        <div onClick={() => onClickItem()}>
          <PostExcerpt
            thumbnail={gridItem.thumbnail_url}
            title={gridItem.title.rendered}
            description={gridItem.excerpt.rendered}
            terms={gridItem.tags}
            level={gridItem.level}
          />
        </div>
      </div>
    </Card>
  )
}

export default React.memo(PostGridItem)
