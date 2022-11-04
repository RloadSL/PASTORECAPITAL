import Card from 'components/Card'
import PostExcerpt from 'components/PostExcerpt'
import { Post } from 'domain/Post/Post'
import Link from 'next/link'
import { useCallback } from 'react'
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
  const { buildClassName, limitTextLength } = useComponentUtils();
  const getLevel = useCallback(
    (post: Post) => post.categories.find(cat => cat.parent != 0 && cat.parent.slug === 'plans'),
    [],
  )

  return (
    <div className={`${style.articlesGridContainer} ${buildClassName(componentStyle, style)}`}>

      {posts?.map((singlePost, index) => {
        return (
          <div key={index} className={`${index === 0 ? style.firstChild : ''} ${style.articlesGridItem}`}>
            <Card>
              <Link href={'#'}>
                <div className={style.innerContainer}>
                  <PostExcerpt
                    thumbnail={singlePost.thumbnail_url}
                    title={limitTextLength(index === 0 ? 100 : 40, singlePost.title.rendered)}
                    description={limitTextLength(index === 0 && windowSize.width > 1500 ? 350 : 150, singlePost.excerpt.rendered)}
                    level={getLevel(singlePost)}
                    componentStyle={componentStyle === 'flex' && windowSize.width > 1500 ? 'column' : index === 0 && windowSize.width > 1500 ? 'column' : 'row'}
                    hasSeparator={false}
                    footer={{ text: `${singlePost.author?.name}`, date: singlePost.created_at.toLocaleDateString() }}
                  />
                </div>
              </Link>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

export default ArticlesGrid;