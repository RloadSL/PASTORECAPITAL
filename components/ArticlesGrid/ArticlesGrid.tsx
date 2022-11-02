import Card from 'components/Card'
import PostExcerpt from 'components/PostExcerpt'
import { Post } from 'domain/Post/Post'
import { useComponentUtils } from 'ui/hooks/components.hooks'
import useWindowSize from 'ui/hooks/windowSize.hook'
import style from './ArticlesGrid.module.scss'

type articlestyles = 'flex' | 'grid';
interface ARTICLESGRIDPROPS {
  posts?: Array<Post>, //@jose no olvidar quitar el any
  componentStyle?: articlestyles | Array<articlestyles>
  
  windowSize?: any
}

const ArticlesGrid = ({ posts, componentStyle = 'flex' }: ARTICLESGRIDPROPS) => {
  const windowSize = useWindowSize();
  return <ArticlesGridView windowSize={windowSize} posts={posts} componentStyle={componentStyle} />
}

const ArticlesGridView = ({ posts, componentStyle = 'flex', windowSize }: ARTICLESGRIDPROPS) => {
  const { buildClassName , limitTextLength} = useComponentUtils();
  const level = { name: "Premium", slug: "premium" }

  return (
    <div className={`${style.articlesGridContainer} ${buildClassName(componentStyle, style)}`}>

      {posts?.map((singlePost, index) => {
        console.log(singlePost.thumbnail_url)
        return (
          <div key={index} className={`${index === 0 ? style.firstChild : ''} ${style.articlesGridItem}`}>
            <Card>
              <div className={style.innerContainer}>
                <PostExcerpt
                  thumbnail={singlePost.thumbnail_url}
                  title={limitTextLength(index === 0 ? 100 : 40, singlePost.title.rendered)}
                  description={limitTextLength(index === 0 && windowSize.width > 1500 ? 350 : 150, singlePost.excerpt.rendered)}
                  level={level}
                  componentStyle={componentStyle === 'flex' ? 'column' : index === 0 && windowSize.width > 1500 ? 'column' : 'row'}
                  hasSeparator={false}
                  footer={{text: `${singlePost.author?.name}`, date: singlePost.created_at.toLocaleDateString() }}
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