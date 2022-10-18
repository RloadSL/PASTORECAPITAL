import { Course } from 'domain/Course/Course'
import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import {
  loadingStore,
  postsStore,
  privatePostStore
} from 'ui/redux/slices/academy/academy.selectors'
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

interface POSTGRIDPROPS {
  posts: any
  loading: boolean
  openCreate: Function
  wpToken?: string
  onClickItem: Function
  deleteCourse: Function
  loadMore: Function
  setStatePost: Function
  statePost: 'public' | 'private'
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
  deleteCourse,
  onClickItemTarget,
  loadMore,
  setStatePost,
  statePost
}: {
  openCreate: Function
  deleteCourse: Function
  onClickItemTarget: string
  loadMore: Function
  statePost: 'public' | 'private'
  setStatePost: Function
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
        query: { post_id: id, post_title: title }
      })
    }
  }

  return (
    <PostGridView
      setStatePost={() =>
        setStatePost((pre: string) => (pre === 'public' ? 'private' : 'public'))
      }
      statePost={statePost}
      deleteCourse={deleteCourse}
      onClickItem={onClick}
      wpToken={userLogged?.wpToken}
      openCreate={openCreate}
      loading={loading}
      posts={posts}
      loadMore={loadMore}
    />
  )
}

const PostGridView = ({
  posts,
  openCreate,
  wpToken,
  onClickItem,
  deleteCourse,
  loadMore,
  setStatePost,
  statePost
}: POSTGRIDPROPS) => {
  const itemCreateBtn = () => {
    return (
      <button
        className={style.createCourseButton}
        onClick={() => openCreate(true)}
      >
        <div className={style.buttonContent}>
          <Image src={addCourseIcon} alt='' />
          <FormattedMessage
            id='page.academy.courses.btn_create'
            values={{
              b: children => <strong>{children}</strong>
            }}
          />
        </div>
      </button>
    )
  }
  return (
    <div style={{ position: 'relative' }}>
      <div className='admin-buttons-container'>
        <ButtonApp
          onClick={() => setStatePost()}
          labelID={`post.state.${statePost === 'private' ? 'public' : 'private'}`}
          buttonStyle='primary'
        />
      </div>
      {posts ? (
        <InfiniteScroll
          loader={<LoadMoreLoading></LoadMoreLoading>}
          hasMore={posts.hasMore}
          dataLength={posts.items.length}
          next={() => loadMore(posts.items.length)}
        >
          <ul className={style.postGrid}>
            {wpToken ? <li>{itemCreateBtn()}</li> : null}
            {posts.items.map((item: any, index: number) => {
              return (
                <li key={index} className={style.postLink}>
                  <div className={style.postItemContainer}>
                    <PostGridItem
                      deleteCourse={deleteCourse}
                      isAdmin={wpToken != null}
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
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </InfiniteScroll>
      ) : (
        <h1>Nda que mostrar</h1>
      )}
    </div>
  )
}

export default React.memo(PostGrid)
