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
import LinkApp from 'components/LinkApp'
import iconEdit from '../../../../assets/img/icons/pencil.svg'
import iconDelete from '../../../../assets/img/icons/trash.svg'
import { Post } from 'domain/Post/Post'

const CreateFormArticle = dynamic(() => import('../components/CreateFormArticle'), {
  suspense: true
})

/**
 * Función principal del componente Analysis Category
 * @returns
 */


const AnalysisCategory = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [filters, setFilters] = useState({
    search: '',
    categories: undefined,
    tags: undefined
  })
  const [outstandingArt, setOutstandingArt] = useState([])
  const userLogged = useSelector(getUserLogged)
  const { userDataToken, wpToken } = userLogged || {}
  const { query, replace } = useRouter()

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

  useEffect(() => {
    if (userLogged?.uid) getOutstandingArticles().then((res)=> setOutstandingArt(res))
  },[])

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
    )
  }

  const getOutstandingArticles = async () => {
    if(query['category-slug']){
      const response = await AnalysisRepositoryInstance.getOutstandingArticles(query['category-slug'] as string)
      return response;
    } else return []
  }

  const _filter = (value: any) => {
    setFilters(pre => ({ ...pre, ...value }))
  }

  const _onDeleteCat = async () => {
    if (wpToken)
      await AnalysisRepositoryInstance.deleteCategory(
        wpToken,
        parseInt(query.cat as string)
      )
    replace('/analysis', undefined, { shallow: true })
  }

  return (
    <AnalysisCategoryView
      outstandingArt={outstandingArt}
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
  onDeleteCat,
  outstandingArt
}: {
  outstandingArt: Post[]
  userType: boolean
  onFilter: Function
  onDeleteCat: Function
  setStatePost: Function
  statePost: 'public' | 'private'
  loadMore: Function
}) => {
  const [createArt, setCreateArt] = useState(false)
  const [deleteCat, setDeleteCat] = useState(false)

  const [updateCat, setCategory] = useState(false)

  const [deleteArticle, setDeleteArticle]: [
    { id: number; status: string } | null,
    Function
  ] = useState(null)
  const { query } = useRouter()
  const privateCats = ['flash-updates']

  const isPrivateExcerpt = useRef(query.collapsable_items === '1')

  return (
    <div className={style.analysisCategoryPage}>
      <header className='title-container flex-container column space-between'>
        <div className={style.titleBlock}>
          <p className='small-caps'>Análisis</p>
          <h1 className='main-title'>{query.category_name}</h1>
          <div className={`admin-buttons-wrapper`}>
            <div className={`admin-buttons-container ${style.adminButtons}`}>
              <ButtonApp
                labelID={'page.analysis.category.form.update.title'}
                onClick={() => setCategory(true)}
                type='button'
                buttonStyle={['primary', 'outlined']}
                size='small'
                icon={iconEdit}
              />
              <ButtonApp
                labelID={'page.analysis.category.form.remove.title'}
                onClick={() => setDeleteCat(true)}
                type='button'
                buttonStyle='delete'
                size='small'
                icon={iconDelete}
              />
            </div>
          </div>
        </div>
        {/* <FilterCourse onFilter={(value: {search?: string, catLevel?: string, tags?: string})=>onFilter(value)}/> */}
      </header>
      <div className={isPrivateExcerpt.current ? style.collapsedItem : ''}>
        <PostGrid
          parent='page.analysis.articles.form.create.submit'
          loadMore={loadMore}
          statePost={statePost}
          setStatePost={(state: 'public' | 'private') => setStatePost(state)}
          onClickItemTarget={encodeURI(`/analysis/${query['category-slug']}/`) }
          deleteItem={(value: { id: number; status: string }) =>
            setDeleteArticle(value)
          }
          openCreate={setCreateArt}
          typeItem={isPrivateExcerpt.current ? 'privateExcerpt' : 'excerpt'}
          alignment={isPrivateExcerpt.current ? 'column' : 'row'}
        />
        {(isPrivateExcerpt.current && outstandingArt.length > 0) && <LatestArticles articlesList={outstandingArt} />}
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
       {createArt && (
          <Suspense>
            <CreateFormArticle
              onClose={() => {
                setCreateArt(false)
              }}
            ></CreateFormArticle>
          </Suspense>
        )}
    </div>
  )
}

export default AnalysisCategory
