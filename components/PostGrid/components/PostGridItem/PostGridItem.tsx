import Card from 'components/Card'
import PostExcerpt from 'components/PostExcerpt'
import { Course } from 'domain/Course/Course'
import React from 'react'
import style from './PostGridItem.module.scss'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import menuButton from '../../../../assets/img/icons/menu-dots-vertical.png';
import Image from 'next/image'


/**
 * Función principal del componente item grid que renderiza el elemeto que se estrcutura en el grid
 * @param gridItem Elemento para renderizar
 * @returns
 */

const PostGridItem = ({
  gridItem,
  onClickItem,
  isAdmin = false,
  deleteCourse
}: {
  gridItem: Course
  onClickItem: Function
  isAdmin:boolean,
  deleteCourse: Function
}) => {
  return <PostGridItemView deleteCourse={deleteCourse} isAdmin={isAdmin} onClickItem={onClickItem} gridItem={gridItem} />
}

const PostGridItemView = ({ gridItem, onClickItem , isAdmin, deleteCourse}: any) => {
  const _renderHeder = ()=>{
    return (
      <div className={style.header} style={{display:'flex' , justifyContent:'space-between'}}>
        <small style={{ color: 'red' }}>{gridItem.status}</small>
        <Menu
          align='end'
          offsetY={5}
          
          menuButton={
          <button className={style.btnmenu}>
            <Image objectFit='cover' width={25} height={25} src={menuButton} alt=''/>
          </button>}
        >
          <MenuItem onClick={() => onClickItem('edit')}>Editar</MenuItem>
          <MenuItem onClick={()=>{deleteCourse({id:gridItem.id, status:gridItem.status})}}>Eliminar</MenuItem>
        </Menu>
        </div>
    )
  }

  return (
    <Card>
      <div className={style.cardContainer}>
        {isAdmin && _renderHeder()}
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
