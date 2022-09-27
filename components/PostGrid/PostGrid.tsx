import { Course } from 'domain/Course/Course'
import Link from 'next/link'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import {
  coursesStore,
  loadingStore
} from 'ui/redux/slices/academy/academy.selectors'
import Image from 'next/image'
import addCourseIcon from '../../assets/img/icons/add-document.svg'
import style from './PostGrid.module.scss'
import PostGridItem from './components/PostGridItem'

interface POSTGRIDPROPS {
  gridItems: Array<Course>,
  loading: boolean,
  openCreate: Function,
  isAdmin: boolean
}

/**
 * Función principal del componente De grid para los post
 * @param gridItems Listado de elementos para renderizar en el grid
 * @param loading Cargador
 * @param openCreate Función que abre el modal para crear un nuevo curso
 * @param isAdmin Variable que gestiona los permisos del usuario para crear cursos
 * @returns
 */

const PostGrid = ({ openCreate, isAdmin }: { openCreate: Function, isAdmin:boolean }) => {
  const courses = useSelector(coursesStore)
  const loading = useSelector(loadingStore)
  return <PostGridView isAdmin={isAdmin} openCreate={openCreate} loading={loading} gridItems={courses || []} />
}

const PostGridView = ({ gridItems, loading, openCreate, isAdmin }: POSTGRIDPROPS) => {
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
        {isAdmin !== false ? <li>{itemCreateBtn()}</li> : null}
        {gridItems.map((item, index) => {
          return (
            <li key={index} className={style.postLink}>
              <Link
                href={{
                  pathname: '/academy/courses/' + item.slug,
                  query: { page: item.id }
                }}
              >
                <a>
                  <PostGridItem gridItem={item} />
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
      {loading ? <div>LOADING</div> : null}
    </div>
  )
}

export default React.memo(PostGrid)
