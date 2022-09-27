import Card from "components/Card"
import PostExcerpt from "components/PostExcerpt"
import style from './PostGridItem.module.scss'

/**
 * Función principal del componente item grid que renderiza el elemeto que se estrcutura en el grid
 * @param gridItem Elemento para renderizar
 * @returns
 */

const PostGridItem = ({gridItem}:any) => {
  return <PostGridItemView gridItem={gridItem}/>
}

const PostGridItemView = ({gridItem}:any) => {
  return (
    <Card>
      <div className={style.cardContainer}>
        <PostExcerpt
          thumbnail={gridItem.thumbnail_url}
          title={gridItem.title.rendered}
          description={gridItem.excerpt.rendered}
          terms={gridItem.tags}
          level={gridItem.level}
        />
      </div>
    </Card>
  )
}

export default PostGridItem