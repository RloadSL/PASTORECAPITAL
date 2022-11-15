import { Course } from 'domain/Course/Course'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import {
  loadingStore,
  postsStore,
  privatePostStore
} from 'ui/redux/slices/wp-headless-api/wp-headless-api.selectors'
import Image from 'next/image'
import addCourseIcon from '../../assets/img/icons/add-document.svg'
import style from './PostGrid.module.scss'
import PostGridItem from './components/PostGridItem'
import { WP_EDIT_POST } from 'infrastructure/wordpress/config'
import { useRouter } from 'next/router'
import LoadMoreLoading from 'components/LoadMoreLoading'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import Loading from 'components/Loading'
import InfiniteScroll from 'react-infinite-scroll-component'
import ButtonApp from 'components/ButtonApp'
import { useGuardPermissions } from 'ui/hooks/guard.permissions.hook'

interface POSTGRIDPROPS {
  posts: any
  loading: boolean
  openCreate: Function
  wpToken?: string
  onClickItem: Function
  deleteItem: Function
  loadMore: Function
  setStatePost: Function
  statePost: 'public' | 'private',
  parent: string,
  typeItem?: 'privateExcerpt' | 'excerpt'
  alignment?: 'row' | 'column'
  footerType?: 'text' | 'chips'

}

/**
 * Función principal del componente De grid para los post
 * @param gridItems Listado de elementos para renderizar en el grid
 * @param loading Cargador
 * @param openCreate Función que abre el modal para crear un nuevo curso
 * @returns
 */

const PostGrid = ({
  openCreate,
  deleteItem,
  onClickItemTarget,
  loadMore,
  setStatePost,
  statePost,
  parent,
  typeItem,
  footerType = 'chips',
  alignment
}: {
  openCreate: Function
  deleteItem: Function
  onClickItemTarget: string
  loadMore: Function
  statePost: 'public' | 'private'
  setStatePost: Function
  parent:string
  typeItem?: 'privateExcerpt' | 'excerpt'
  footerType?: 'text' | 'chips'
  alignment?: 'row' | 'column'
}) => {
  const posts = useSelector(postsStore)
  const loading = useSelector(loadingStore)
  const userLogged = useSelector(getUserLogged)
  const router = useRouter()
  const onClick = (
    id: string,
    slug: string,
    status: 'private' | 'publish',
    option: 'edit' | 'normal',
    title?: string
  ) => {
    if ((userLogged?.wpToken && status == 'private') || option === 'edit') {
      window.open(
        `${WP_EDIT_POST}?post=${id}&action=edit&?&token=${userLogged.wpToken}`
      )
    } else if (status == 'publish') {
      router.push({
        pathname: onClickItemTarget + slug,
        query: {...router.query, post_id: id, post_title: title }
      })
    }
  }
  return (
    <PostGridView
      setStatePost={() =>
        setStatePost((pre: string) => (pre === 'public' ? 'private' : 'public'))
      }
      statePost={statePost}
      deleteItem={deleteItem}
      onClickItem={onClick}
      wpToken={userLogged?.wpToken}
      openCreate={openCreate}
      loading={loading}
      posts={posts}
      loadMore={loadMore}
      parent={parent}
      typeItem={typeItem}
      alignment={alignment}
      footerType={footerType}
    />
  )
}

const PostGridView = ({
  posts,
  openCreate,
  wpToken,
  onClickItem,
  deleteItem,
  loadMore,
  setStatePost,
  statePost,
  parent,
  typeItem,
  alignment = 'row',
  footerType 
}: POSTGRIDPROPS) => {
  const router = useRouter()
  const { editionGranted } = useGuardPermissions()

  const itemCreateBtn = () => {
    return (
      <button
        className={style.createCourseButton}
        onClick={() => openCreate(true)}
      >
        <div className={style.buttonContent}>
          <div className={style.buttonImage}>
            <Image src={addCourseIcon} alt='' />
          </div>
          <FormattedMessage
            id={parent}
            values={{
              b: children => <strong>{children}</strong>
            }}
          />
        </div>
      </button>
    )
  }
  
  return (
    <div style={{ position: 'relative', width:'100%' }}>
      {editionGranted && <div className='admin-buttons-container'>
        <ButtonApp
          onClick={() => setStatePost()}
          labelID={`post.state.${statePost === 'private' ? 'public' : 'private'}`}
          buttonStyle='primary'
        />
      </div>}
      { posts && (
        <InfiniteScroll
          loader={<LoadMoreLoading></LoadMoreLoading>}
          hasMore={posts.hasMore}
          dataLength={posts.items.length}
          next={() => loadMore(posts.items.length)}
        >
          <ul className={`${style.postGrid} ${style[alignment]}`}>
            {editionGranted && <li className={style.createButtonContainer}>{itemCreateBtn()}</li>}
            {(posts.items.length <= 0 && posts.hasMore == false) && <p className={style.noResults}><FormattedMessage id='message.item.no-result'/></p>}
            {posts.items.map((item: any, index: number) => {
              return (
                <li key={index} className={style.postLink}>
                    <PostGridItem
                      deleteItem={deleteItem}
                      isAdmin={editionGranted}
                      onClickItem={(option: string) =>
                        onClickItem(
                          item.id,
                          item.slug,
                          item.status,
                          option,
                          item.title.rendered
                        )
                      }
                      gridItem={item}
                      typeItem={typeItem}
                      footerType={footerType}
                    />
                </li>
              )
            })}
          </ul>
        </InfiniteScroll>
      )}
    </div>
  )
}

export default React.memo(PostGrid)
