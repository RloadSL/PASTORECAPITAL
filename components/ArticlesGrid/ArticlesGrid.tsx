import Card from 'components/Card'
import PostExcerpt from 'components/PostExcerpt'
import { Post } from 'domain/Post/Post'
import { divide } from 'lodash'
import { useComponentUtils } from 'ui/hooks/components.hooks'
import useWindowSize from 'ui/hooks/windowSize.hook'
import style from './ArticlesGrid.module.scss'

type articlestyles = 'flex' | 'grid';
interface ARTICLESGRIDPROPS {
  posts?: Array<Post | any>, //@jose no olvidar quitar el any
  componentStyle?: articlestyles | Array<articlestyles>
  category: any,
  windowSize?: any
}

const ArticlesGrid = ({ category, posts, componentStyle = 'flex' }: ARTICLESGRIDPROPS) => {
  const windowSize = useWindowSize();
  return <ArticlesGridView windowSize={windowSize} posts={posts} componentStyle={componentStyle} category={category} />
}

const ArticlesGridView = ({ category, posts, componentStyle = 'flex', windowSize }: ARTICLESGRIDPROPS) => {
  const { buildClassName } = useComponentUtils();
  const { limitTextLength } = useComponentUtils();
  const level = { name: "Premium", slug: "premium" }

  return (
    <div className={`${style.articlesGridContainer} ${buildClassName(componentStyle, style)}`}>

      {posts?.map((singlePost, index) => {
        return (
          <div key={index} className={`${index === 0 ? style.firstChild : ''} ${style.articlesGridItem}`}>
            <Card>
              <div className={style.innerContainer}>
                <PostExcerpt
                  thumbnail={singlePost.thumbnail_url}
                  title={limitTextLength(index === 0 ? 100 : 40, singlePost.title || '')}
                  description={limitTextLength(index === 0 && windowSize.width > 1500 ? 350 : 150, singlePost.excerpt || '')}
                  level={level}
                  componentStyle={componentStyle === 'flex' ? 'column' : index === 0 && windowSize.width > 1500 ? 'column' : 'row'}
                  hasSeparator={false}
                  footer={{ text: `${singlePost.author.name}`, date: singlePost.date }}
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