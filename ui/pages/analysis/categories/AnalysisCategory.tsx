/* eslint-disable react-hooks/exhaustive-deps */

import LatestArticles from 'components/LatestArticles'
import PostGrid from 'components/PostGrid'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postsStore } from 'ui/redux/slices/wp-headless-api/wp-headless-api.selectors'
import {
  academyGetCurses,
  cleanAcademyPosts,
  getAnalysisArticles
} from 'ui/redux/slices/wp-headless-api/wp-headless-api.slice'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
// import DeleteCourse from './components/DeleteCourse'
// import FilterCourse from './components/FilterCourse'
import style from './analysisCategory.module.scss'
import { useRouter } from 'next/router'
import CreateCategoryAnalysis from '../components/CreateCategoryAnalysis'
import ButtonApp from 'components/ButtonApp'
import AlertApp from 'components/AlertApp'
import { AnalysisRepositoryInstance } from 'infrastructure/repositories/analysis.repository'
import { FormattedMessage } from 'react-intl'

// const CreateForm = dynamic(() => import('./components/CreateForm'), {
//   suspense: true
// })

/**
 * Función principal del componente Analysis Category
 * @returns
 */

const fakeArticlesList = [
  {
    title: 'Este es el título de una noticia sobre bitcoins',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    author: 'John Doe',
    date: '20 Feb 2022'
  },
  {
    title: 'Tips para estar a la ultima en criptomonedas',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    author: 'John Doe',
    date: '20 Feb 2022'
  },
  {
    title: 'Ethereum empuja con fuerza la caída del bitcoin a nivel mundial',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    author: 'John Doe',
    date: '20 Feb 2022'
  }
]

const AnalysisCategory = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [filters, setFilters] = useState({
    search: '',
    categories: undefined,
    tags: undefined
  })
  const userLogged = useSelector(getUserLogged)
  const { userDataToken, wpToken } = userLogged || {}
  const { query , replace} = useRouter()

  const [statePost, setStatePost] = useState<'public' | 'private'>('public')

  useEffect(() => {
    if (userLogged?.uid) {
      dispatch(cleanAcademyPosts({})) //OJO al nombre de esta función que hace referencia a Academy
      if (statePost === 'public') {
        getPosts(filters, undefined)
      } else {
        if (wpToken) getPosts(filters) //OJO con el nombre de la funcion getPosts
      }
    }
  }, [filters, statePost])

  const _loadMore = (offset: number) => {
    if (statePost === 'public') {
      getPosts(filters, offset)
    } else {
      if (wpToken) getPosts(filters, offset)
    }
  }

  const getPosts = async (
    filters: { search: string; categories: any; tags: any },
    offset?: number
  ) => {
    await dispatch(
      getAnalysisArticles({
        userDataToken,
        wpToken,
        query: { offset, category_name: query['category-slug'] as string }
      })
    ) //OJO nombre de función academygetCourses
  }

  const _filter = (value: any) => {
    setFilters(pre => ({ ...pre, ...value }))
  }

  const _onDeleteCat = async ()=>{
    if(wpToken) await AnalysisRepositoryInstance.deleteCategory(wpToken, parseInt(query.cat as string) )
    replace('/analysis', undefined, {shallow: true})
  }

  return (
    <AnalysisCategoryView
    onDeleteCat={_onDeleteCat}
      statePost={statePost}
      setStatePost={(state: 'public' | 'private') => setStatePost(state)}
      loadMore={_loadMore}
      onFilter={(value: {
        search?: string
        catLevel?: string
        tags?: string
      }) => _filter(value)}
      userType={true}
    />
  )
}

const AnalysisCategoryView = ({
  userType,
  onFilter,
  setStatePost,
  statePost,
  loadMore,
  onDeleteCat
}: {
  userType: boolean
  onFilter: Function
  onDeleteCat: Function
  setStatePost: Function
  statePost: 'public' | 'private'
  loadMore: Function
}) => {
  const [create, setCreate] = useState(false)
  const [deleteCat, setDeleteCat] = useState(false)

  const [updateCat, setCategory] = useState(false)

  const [deleteArticle, setDeleteArticle]: [
    { id: number; status: string } | null,
    Function
  ] = useState(null)
  const { query } = useRouter()
  const privateCats = ['flash-updates']

  const isPrivateExcerpt = useRef(
    privateCats.includes(query['category-slug'] as string)
  )

  return (
    <div className={style.analysisCategoryPage}>
      <header className='title-container flex-container column space-between'>
        <div className={style.titleBlock}>
          <p className='small-caps'>Análisis</p>
          <h1 className='main-title'>{query.category_name}</h1>
          <ButtonApp
            labelID={'page.analysis.category.form.update.title'}
            onClick={() => setCategory(true)}
            type='button'
            buttonStyle='primary'
            size='small'
          />
           <ButtonApp
            labelID={'page.analysis.category.form.remove.title'}
            onClick={() => setDeleteCat(true)}
            type='button'
            buttonStyle='primary'
            size='small'
          />
        </div>
        {/* <FilterCourse onFilter={(value: {search?: string, catLevel?: string, tags?: string})=>onFilter(value)}/> */}
      </header>
      <div className={isPrivateExcerpt.current ? style.collapsedItem : ''}>
        <PostGrid
          parent='page.analysis.articles.form.create.submit'
          loadMore={loadMore}
          statePost={statePost}
          setStatePost={(state: 'public' | 'private') => setStatePost(state)}
          onClickItemTarget='/analysis/'
          deleteItem={(value: { id: number; status: string }) =>
            setDeleteArticle(value)
          }
          openCreate={setCreate}
          typeItem={isPrivateExcerpt.current ? 'privateExcerpt' : 'excerpt'}
          alignment={isPrivateExcerpt.current ? 'column' : 'row'}
        />
        {isPrivateExcerpt.current && (
          <LatestArticles articlesList={fakeArticlesList} />
        )}
      </div>

      {updateCat && (
        <Suspense>
          <CreateCategoryAnalysis
            cat={parseInt(query.cat as string)}
            onClose={() => {
              setCategory(false)
            }}
          ></CreateCategoryAnalysis>
        </Suspense>
      )}

      {deleteCat && (
        <Suspense>
          <AlertApp
            title='page.analysis.category.form.remove.title'
            visible={deleteCat}
            onAction={() => onDeleteCat()}
            onCancel={() => setDeleteCat(false)}
          >
            <p>
              <FormattedMessage id='page.analysis.category.form.remove.content' />
            </p>
          </AlertApp>
        </Suspense>
      )}
    </div>
  )
}

export default AnalysisCategory
