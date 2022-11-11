/* eslint-disable react-hooks/exhaustive-deps */
import ArticlesGrid from 'components/ArticlesGrid'
import { WP_TERM } from 'infrastructure/dto/wp.dto'
import style from './WPCategory.module.scss'
import { fakeCategoryPosts } from '../../ui/utils/test.data'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AnalysisRepositoryInstance } from 'infrastructure/repositories/analysis.repository'
import { Post } from 'domain/Post/Post'
import Loading from 'components/Loading'
import Link from 'next/link'
import ButtonApp from 'components/ButtonApp'
import { useRouter } from 'next/router'

interface WPCATEGORYPROPS {
  componentStyle?: 'flex' | 'grid'
  category: WP_TERM
  articles?: Array<Post>
  loading?: boolean
  routerProps?: any
}

const WPCategory = ({ componentStyle, category }: WPCATEGORYPROPS) => {
  const userLogged = useSelector(getUserLogged)
  const [articles, setArticles] = useState<Post[]>([])
  const [loading, setloading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    let fetching = true
    if (userLogged?.uid) {
      AnalysisRepositoryInstance.getArticles(
        userLogged?.userDataToken,
        userLogged?.wpToken,
        {
          category_name: category.slug,
          posts_per_page: 4
        }
      ).then(arts => {
        setArticles(arts)
        setloading(false)
      })
    }

    return () => {
      fetching = false
    }
  }, [category])

  const navigate = (queryparams: any, slug: string) => {
    router.push({
      pathname: router.asPath + slug,
      query: queryparams
    })
  }
  return (
    <div className={style.categoryContainer}>
      {articles.length > 0 ? (
        <WPCategoryView
          routerProps={{ asPath: router.asPath }}
          loading={loading}
          articles={articles}
          componentStyle={componentStyle}
          category={category}
        />
      ) : (
        <></>
      )}
      <div className={style.buttonContainer}>
        <ButtonApp
          onClick={() =>
            navigate(
              {
                cat: category.term_id,
                category_name: category.name,
                collapsable_items: category.metas.collapsable_items || false
              },
              category.slug
            )
          }
          labelID='page.analysis.category.button.label'
          buttonStyle={'dark'}
        />
      </div>

      <Loading loading={loading} variant='inner-primary' />
    </div>
  )
}

const WPCategoryView = ({
  componentStyle,
  category,
  articles,
  loading,
  routerProps
}: WPCATEGORYPROPS) => {
  return (
    <div className={style.categoryContainer}>
      <h2 className={style.title}>
        <Link href={{
          pathname: routerProps.asPath + category.slug,
          query: {
            cat: category.term_id,
            category_name: category.name,
            collapsable_items: category.metas.collapsable_items || false
          }
        }}>{category.name}</Link>
      </h2>
      <ArticlesGrid category={category} componentStyle={componentStyle} posts={articles} />
    </div>
  )
}

export default WPCategory
