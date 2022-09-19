import Card from 'components/Card';
import PostExcerpt from 'components/PostExcerpt';
import Link from 'next/link';
import style from './PostGrid.module.scss';

interface POSTGRIDPROPS {
  gridItems: Array<any>
}

/**
 * Función principal del componente De grid para los post
 * @param gridItems Listado de elementos para renderizar en el grid
 * @returns 
 */

const PostGrid = ({ gridItems }: POSTGRIDPROPS) => {
  return (
    <div className={style.postGrid}>
      {gridItems.map((item, index) => {
        return (
          <Link href={'#'} key={index}>
            <a className={style.postLink}>
              <Card>
                <div className={style.cardContainer}>
                  <PostExcerpt title={item.title} description={item.description} thumbnail={item.thumbnail} terms={item.chips} />
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