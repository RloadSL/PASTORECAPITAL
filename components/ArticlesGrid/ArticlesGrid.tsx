import Card from 'components/Card'
import PostExcerpt from 'components/PostExcerpt'
import { Post } from 'domain/Post/Post'
import { divide } from 'lodash'
import { useComponentUtils } from 'ui/hooks/components.hooks'
import style from './ArticlesGrid.module.scss'

type articlestyles = 'flex' | 'grid';
interface ARTICLESGRIDPROPS {
  posts?: Array<Post | any>, //@jose no olvidar quitar el any
  componentStyle?: articlestyles | Array<articlestyles>
  category: any
}

const ArticlesGrid = ({ category, posts, componentStyle = 'flex' }: ARTICLESGRIDPROPS) => {
  return <ArticlesGridView posts={posts} componentStyle={componentStyle} category={category} />
}

const ArticlesGridView = ({ category, posts, componentStyle = 'flex' }: ARTICLESGRIDPROPS) => {
  const { buildClassName } = useComponentUtils()

  return (
    <div className={`${style.articlesGridContainer} ${buildClassName(componentStyle, style)}`}>
      {posts?.map((singlePost, index) => {
        return (
          <div key={index} className={`${index === 0 ? style.firstChild : ''} ${style.articlesGridItem}`}>
            <Card>
              <div className={style.innerContainer}>
                <PostExcerpt
                  thumbnail={singlePost.thumbnail_url}
                  title={singlePost.title}
                  description={singlePost.excerpt}
                  level={singlePost.level}
                  componentStyle={componentStyle === 'flex' ? 'column' : index === 0 ? 'column' : 'row'}
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

export default ArticlesGrid;