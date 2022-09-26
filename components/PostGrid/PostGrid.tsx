import Card from 'components/Card'
import Loading from 'components/Loading'
import PostExcerpt from 'components/PostExcerpt'
import { Course } from 'domain/Course/Course'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import {
  coursesStore,
  loadingStore
} from 'ui/redux/slices/academy/academy.selectors'
import style from './PostGrid.module.scss'

interface POSTGRIDPROPS {
  gridItems: Array<Course>,
  loading: boolean 
}

/**
 * Función principal del componente De grid para los post
 * @param gridItems Listado de elementos para renderizar en el grid
 * @returns
 */

const PostGrid = () => {
  const courses = useSelector(coursesStore)
  const loading = useSelector(loadingStore)

  return <PostGridView loading={loading} gridItems={courses || []} />}

const PostGridView = ({ gridItems, loading }: POSTGRIDPROPS) => {
  return (
    <div className={style.postGrid}>
      {gridItems.map((item, index) => {
        return (
          // @maria porfavor pasar todoa la logica del item post dentrio del PostExcert//
          <Link
            href={{
              pathname: '/academy/courses/' + item.slug,
              query: { page: item.id }
            }}
            key={index}
          >
            <a className={style.postLink}>
              <Card>
                <div className={style.cardContainer}>
                  <PostExcerpt
                    thumbnail={item.thumbnail_url}
                    title={item.title.rendered}
                    description={item.excerpt.rendered}
                    terms={item.tags}
                    level={item.level}
                  />
                </div>
              </Card>
            </a>
          </Link>
        )
      })}
     {loading ? <div>LOADING</div> : null}  
      
    </div>
  )
}

export default React.memo(PostGrid)
