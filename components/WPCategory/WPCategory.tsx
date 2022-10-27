import ArticlesGrid from 'components/ArticlesGrid'
import { WP_TERM } from 'infrastructure/dto/wp.dto'
import style from './WPCategory.module.scss'
import {fakeCategoryPosts} from '../../ui/utils/test.data'


interface WPCATEGORYPROPS {
  componentStyle? : 'flex' | 'grid',
  category: WP_TERM
}

const WPCategory = ({componentStyle,category}: WPCATEGORYPROPS) => {
  return (
    <WPCategoryView componentStyle={componentStyle} category={category}/>
  )
}

const WPCategoryView = ({componentStyle,category}: WPCATEGORYPROPS) => {
  return (
    <div className={style.categoryContainer}>
      <h2>{category.name}</h2>
      <ArticlesGrid componentStyle={componentStyle} category={category} posts={fakeCategoryPosts}/>
    </div>
  )
}

export default WPCategory;