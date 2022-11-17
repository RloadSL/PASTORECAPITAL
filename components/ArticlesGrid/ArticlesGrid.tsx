import Card from 'components/Card'
import PostExcerpt from 'components/PostExcerpt'
import { Post } from 'domain/Post/Post'
import Link from 'next/link'
import { useCallback, useRef } from 'react'
import { useComponentUtils } from 'ui/hooks/components.hooks'
import useWindowSize from 'ui/hooks/windowSize.hook'
import style from './ArticlesGrid.module.scss'
import lockIcon from '../../assets/img/icons/lock-w.svg'
import { WP_TERM } from 'infrastructure/dto/wp.dto'

type articlestyles = 'flex' | 'grid';
interface ARTICLESGRIDPROPS {
  posts?: Array<Post>, //@jose no olvidar quitar el any
  componentStyle?: articlestyles | Array<articlestyles>
  category: WP_TERM
  windowSize?: any
}

const ArticlesGrid = ({ posts, componentStyle = 'flex', category }: ARTICLESGRIDPROPS) => {
  const windowSize = useWindowSize();
  return <ArticlesGridView category={category} windowSize={windowSize} posts={posts} componentStyle={componentStyle} />
}

const ArticlesGridView = ({ posts, componentStyle = 'flex', windowSize, category }: ARTICLESGRIDPROPS) => {
  const { buildClassName, limitTextLength } = useComponentUtils();
  const getLevel = useCallback(
    (post: Post) => post.categories.find(cat => cat.parent != 0 && cat.parent.slug === 'plans'),
    [],
  )

  const getCatgory = useCallback(
    (post: Post) => post.categories.find(cat => cat.parent != 0 && cat.parent.slug === 'analysis'),
    [],
  )  
  

  return (
    <div className={`${style.articlesGridContainer} ${buildClassName(componentStyle, style)}`}>
        {posts?.map((singlePost, index) => {
          const postLevel = getLevel(singlePost)
          const postCat:any = category.term_id ? category : getCatgory(singlePost)
          const query:any = {
            cat: category.term_id,
            category_name: postCat.name,
            collapsable_items: postCat.metas.collapsable_items || false,
            post_id : singlePost.id,
            post_title : singlePost.title.rendered
          }
          
          const urlPost = encodeURI(`/analysis/${postCat?.slug}/${postCat.metas.collapsable_items !== '1'? singlePost.slug : ''}`)
        return (
          <div key={singlePost.id} className={`${index === 0 && componentStyle === 'grid' ? style.firstChild : ''} ${style.articlesGridItem}`}>
            <Card>
              <Link href={{
                pathname: urlPost,
                query
              }}>
                <div className={style.innerContainer}>
                  <PostExcerpt
                    thumbnail={singlePost.thumbnail_url}
                    title={limitTextLength(index === 0 ? 100 : 40, singlePost.title.rendered)}
                    description={limitTextLength(index === 0 && windowSize.width > 1500 && componentStyle !== 'flex' ? 350 : 150, singlePost.excerpt.rendered)}
                    level={{label:postLevel?.name,icon:lockIcon}}
                    componentStyle={componentStyle === 'flex' && windowSize.width >= 1500 ? 'card' : index === 0 && windowSize.width >= 1500 ? 'column' : 'row'}
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