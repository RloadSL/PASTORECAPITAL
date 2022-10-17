import { Course } from 'domain/Course/Course'
import React from 'react'
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

interface POSTGRIDPROPS {
  gridItems: Array<Course>
  loading: boolean
  openCreate: Function
  wpToken?: string
  onClickItem: Function
  deleteCourse: Function
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
  onClickItemTarget
}: {
  openCreate: Function
  deleteCourse: Function
  onClickItemTarget : string
}) => {
  const publicPosts = useSelector(postsStore)
  const privatePost = useSelector(privatePostStore)
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
        query: { post_id : id, post_title: title }
      })
    }
  }

  let posts: Array<any> = []
  if (publicPosts) posts = posts.concat(publicPosts)
  if (privatePost) posts = [...privatePost, ...posts]

  return (
    <PostGridView
      deleteCourse={deleteCourse}
      onClickItem={onClick}
      wpToken={userLogged?.wpToken}
      openCreate={openCreate}
      loading={loading}
      gridItems={posts}
    />
  )
}

const PostGridView = ({
  gridItems,
  loading,
  openCreate,
  wpToken,
  onClickItem,
  deleteCourse
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
    <div style={{position: 'relative'}}>
      <ul className={style.postGrid}>
        {wpToken ? <li>{itemCreateBtn()}</li> : null}
        {gridItems.map((item, index) => {
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
     <Loading loading={loading} variant='outer-primary'></Loading>
    </div>
  )
}

export default React.memo(PostGrid)
