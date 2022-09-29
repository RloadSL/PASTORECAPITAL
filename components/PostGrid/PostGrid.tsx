import { Course } from 'domain/Course/Course'
import Link from 'next/link'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import {
  coursesStore,
  loadingStore,
  privateCoursesStore
} from 'ui/redux/slices/academy/academy.selectors'
import Image from 'next/image'
import addCourseIcon from '../../assets/img/icons/add-document.svg'
import style from './PostGrid.module.scss'
import PostGridItem from './components/PostGridItem'
import { getIsLogged, getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { WP_EDIT_POST } from 'infrastructure/wordpress/config'
import { useRouter } from 'next/router'

interface POSTGRIDPROPS {
  gridItems: Array<Course>,
  loading: boolean,
  openCreate: Function,
  wpToken?: string,
  onClickItem: Function
}

/**
 * Función principal del componente De grid para los post
 * @param gridItems Listado de elementos para renderizar en el grid
 * @param loading Cargador
 * @param openCreate Función que abre el modal para crear un nuevo curso
 * @returns
 */

const PostGrid = ({ openCreate }: { openCreate: Function}) => {
  const publicPosts = useSelector(coursesStore)
  const privatePost = useSelector(privateCoursesStore)
  const loading = useSelector(loadingStore)
  const userLogged = useSelector(getUserLogged)
  const router = useRouter()
  const onClick = (id:string,slug:string, status:'private' | 'publish', option: 'edit' | 'normal')=>{
    if((userLogged?.wpToken && status == 'private') || option === 'edit'){
      window.open(
        `${WP_EDIT_POST}?post=${id}&action=edit&?&token=${userLogged.wpToken}`
      )
    }else if(status == 'publish'){
      router.push(
        {
          pathname: '/academy/courses/' + slug,
          query: { page: id }
        }
      )
    }
    
  }

  let posts:Array<any> = []
  if(publicPosts) posts = posts.concat(publicPosts);
  if(privatePost) posts = [...privatePost,...posts];

  return <PostGridView onClickItem={onClick} wpToken={userLogged?.wpToken} openCreate={openCreate} loading={loading} gridItems={posts} />
}

const PostGridView = ({ gridItems, loading, openCreate, wpToken, onClickItem }: POSTGRIDPROPS) => {
  const itemCreateBtn = () => {
    return (
      <button className={style.createCourseButton} onClick={() => openCreate(true)}>
        <div className='flex-container column'>
          <Image src={addCourseIcon} alt='' />
          <FormattedMessage
            id='page.academy.courses.btn_create'
            values={{
              b: children => <strong>{children}</strong>
            }}
          />
        </div>
      </button>
    );
  }

  return (
    <div>
      <ul className={style.postGrid}>
        {wpToken ? <li>{itemCreateBtn()}</li> : null}
        {gridItems.map((item, index) => {
          return (
            <li key={index} className={style.postLink}>
              <div>
                <a>
                  <PostGridItem isAdmin={wpToken != null} onClickItem={(option:string)=>onClickItem(item.id, item.slug, item.status, option)} gridItem={item} />
                </a>
              </div>
            </li>
          )
        })}
      </ul>
      {loading ? <div>LOADING</div> : null}
    </div>
  )
}

export default React.memo(PostGrid)
