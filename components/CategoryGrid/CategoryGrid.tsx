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
      {posts?.map((singlePost, index) => {
        return (
          <div key={index} className={`${index === 0 ? style.firstChild : ''} ${style.categoryGridItem}`}>
            <Card>
              <div className={style.innerContainer}>
                <PostExcerpt
                  thumbnail={singlePost.thumbnail_url}
                  title={singlePost.title}
                  description={singlePost.excerpt}
                  level={singlePost.level}
                  excerptStyle={componentStyle === 'flex' ? 'column' : index === 0 ? 'column' : 'row'}
                  hasSeparator={false}
                />
              </div>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

export default CategoryGrid;