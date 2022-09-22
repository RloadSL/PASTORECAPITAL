import Card from 'components/Card';
import PostExcerpt from 'components/PostExcerpt';
import { Course } from 'domain/Course/Course';
import Link from 'next/link';
import style from './PostGrid.module.scss';

interface POSTGRIDPROPS {
  gridItems: Array<Course>
}

/**
 * Función principal del componente De grid para los post
 * @param gridItems Listado de elementos para renderizar en el grid
 * @returns 
 */

const PostGrid = ({ gridItems }: POSTGRIDPROPS) => {
  return <PostGridView gridItems={gridItems}/>
}

const PostGridView = ({ gridItems }: POSTGRIDPROPS) => {
  return (
    <div className={style.postGrid}>
      {gridItems.map((item, index) => {
        return (
          <Link href={{
            pathname:  '/academy/courses/'+item.slug,
            query: {page: item.id}
          }} key={index}>
            <a className={style.postLink}>
              <Card>
                <div className={style.cardContainer}>

                  <PostExcerpt thumbnail={item.thumbnail_url} title={item.title.rendered} description={item.excerpt.rendered} />

                </div>
              </Card>
            </a>
          </Link>
        )
      }
      )}</div>
  )
}




export default PostGrid;