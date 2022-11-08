import Card from 'components/Card'
import PostExcerpt from 'components/PostExcerpt'
import { Course } from 'domain/Course/Course'
import React, { useCallback, useEffect } from 'react'
import style from './PostGridItem.module.scss'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import publishIcon from '../../../../assets/img/icons/public.svg'
import privateIcon from '../../../../assets/img/icons/lock-w.svg'
import Image from 'next/image'
import tagsIcon from '../../../../assets/img/icons/tags.svg'
import clockIcon from '../../../../assets/img/icons/clock.svg'
import { useComponentUtils } from 'ui/hooks/components.hooks'
import CollapsedPost from 'components/CollapsedPost'
import { Post } from 'domain/Post/Post'

/**
 * Función principal del componente item grid que renderiza el elemeto que se estrcutura en el grid
 * @param gridItem Elemento para renderizar
 * @returns
 */

const PostGridItem = ({
  gridItem,
  onClickItem,
  isAdmin = false,
  deleteItem,
  typeItem = 'excerpt'
}: {
  gridItem: Course //OJO este esta reciebidno course
  onClickItem: Function
  isAdmin: boolean
  deleteItem: Function
  typeItem?: 'privateExcerpt' | 'excerpt'
}) => {
  return (
    <PostGridItemView
      deleteItem={deleteItem}
      isAdmin={isAdmin}
      onClickItem={onClickItem}
      gridItem={gridItem}
      typeItem={typeItem}
    />
  )
}

const PostGridItemView = ({
  gridItem,
  onClickItem,
  isAdmin,
  deleteItem,
  typeItem
}: any) => {
  const { limitTextLength } = useComponentUtils()
  const _renderHeader = () => {
    return (
      <div
        className={style.header}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div
          className={style.postStatus}
          style={
            gridItem.status === 'publish'
              ? { backgroundColor: '#62dc62' }
              : { backgroundColor: '#ff5e86' }
          }
        >
          {gridItem.status === 'publish' ? (
            <Image src={publishIcon} alt='' />
          ) : (
            <Image src={privateIcon} alt='' />
          )}
        </div>
        <Menu
          align='end'
          offsetY={5}
          menuButton={
            <button className='menu-options-btn'>
              <span className='only-readers'>opciones</span>
            </button>
          }
        >
          <MenuItem onClick={() => onClickItem('edit')}>Editar</MenuItem>
          <MenuItem
            onClick={() => {
              deleteItem({ id: gridItem.id, status: gridItem.status })
            }}
          >
            Eliminar
          </MenuItem>
        </Menu>
      </div>
    )
  }

  const makeChips = (metas: Array<any>) => {
    try {
      return metas.map(items => {
        if (items.slug) {
          return {
            label: items.slug,
            icon: tagsIcon
          }
        } else {
          return {
            label: Object.values(items)[0],
            icon: clockIcon
          }
        }
      })
    } catch (error) {
      return []
    }
  }
  const getLevel = useCallback(
    (post: Post) =>
      post.categories.find(
        cat => cat.parent != 0 && cat.parent.slug === 'plans'
      ),
    []
  )

  return (
    <Card>
      <div
        className={
          typeItem === 'excerpt'
            ? style.cardContainer
            : style.privateCardContainer
        }
      >
        {isAdmin && _renderHeader()}
        <div onClick={() => onClickItem()}>
          {typeItem === 'excerpt' ? (
            <PostExcerpt
              thumbnail={gridItem.thumbnail_url}
              title={limitTextLength(60, gridItem.title.rendered || '')}
              description={limitTextLength(
                200,
                gridItem.excerpt.rendered || ''
              )}
              chips={makeChips([gridItem.meta_post, ...gridItem.tags])}
              level={{label:gridItem.level?.name}}
              componentStyle={'card'}
              footer={{
                text: `${gridItem.author?.name || gridItem.author[0]?.name}`,
                date: gridItem.created_at.toLocaleDateString()
              }}
            />
          ) : (
            <CollapsedPost
              header={{
                text: `${gridItem.author?.name || gridItem.author[0]?.name}`,
                date: gridItem.created_at.toLocaleDateString()
              }}
              thumbnail={gridItem.thumbnail_url}
              title={limitTextLength(60, gridItem.title.rendered || '')}
              description={limitTextLength(
                250,
                gridItem.content.rendered || ''
              )}
              chips={makeChips([gridItem.meta_post, ...gridItem.tags])}
              level={getLevel(gridItem)}
              componentStyle={'card'}
            />
          )}
        </div>
      </div>
    </Card>
  )
}

export default React.memo(PostGridItem)
