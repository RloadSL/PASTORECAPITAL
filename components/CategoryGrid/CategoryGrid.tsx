import Card from 'components/Card'
import PostExcerpt from 'components/PostExcerpt'
import { divide } from 'lodash'
import style from './CategoryGrid.module.scss'

interface CATEGORYGRIDPROPS {
  posts?: Array<any>,
  componentStyle?: 'flex' | 'grid'
}

const CategoryGrid = ({ posts, componentStyle = 'flex' }: CATEGORYGRIDPROPS) => {
  return <CategoryGridView posts={posts} componentStyle={componentStyle}></CategoryGridView>
}

const CategoryGridView = ({ posts, componentStyle = 'flex' }: CATEGORYGRIDPROPS) => {
  return (
    <div className={`${style.categoryGridContainer} ${style[componentStyle]}`}>
        {posts?.map((singlePost, index) => <div key={index}>

          <PostExcerpt
            thumbnail={singlePost.thumbnail_url}
            title={singlePost.title}
            description={singlePost.excerpt}
            level={singlePost.level}
            excerptStyle={'simple'}
          />

        </div>)}

    </div>
  )
}

export default CategoryGrid;