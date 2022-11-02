/* eslint-disable react-hooks/exhaustive-deps */
import ArticlesGrid from 'components/ArticlesGrid'
import { WP_TERM } from 'infrastructure/dto/wp.dto'
import style from './WPCategory.module.scss'
import {fakeCategoryPosts} from '../../ui/utils/test.data'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AnalysisRepositoryInstance } from 'infrastructure/repositories/analysis.repository'
import { Post } from 'domain/Post/Post'


interface WPCATEGORYPROPS {
  componentStyle? : 'flex' | 'grid',
  category: WP_TERM,
  articles?:Array<Post>
}

const WPCategory = ({componentStyle,category}: WPCATEGORYPROPS) => {
  const userLogged = useSelector(getUserLogged);
  const [articles, setArticles] = useState<Post[]>([])
  useEffect(() => {
    let fetching = true
    if(userLogged?.uid){
      AnalysisRepositoryInstance.getArticles(
        userLogged?.userDataToken,
        userLogged?.wpToken,
        {
          category_name: category.slug
        }
      )
      .then(arts => {
        setArticles(arts);
      })
    }
  
    return () => {fetching = false}
  }, [category])
  return (
    articles.length > 0 ? <WPCategoryView articles={articles} componentStyle={componentStyle} category={category}/> : <></>
  )
}

const WPCategoryView = ({componentStyle,category, articles}: WPCATEGORYPROPS) => {

  return (
    <div className={style.categoryContainer}>
      <h2>{category.name}</h2>
      <ArticlesGrid componentStyle={componentStyle}posts={articles}/>
    </div>
  )
}

export default WPCategory;