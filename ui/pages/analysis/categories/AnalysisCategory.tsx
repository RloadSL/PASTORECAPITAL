/* eslint-disable react-hooks/exhaustive-deps */

import LatestArticles from 'components/LatestArticles'
import PostGrid from 'components/PostGrid'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  cleanAcademyPosts,
  getAnalysisArticles
} from 'ui/redux/slices/wp-headless-api/wp-headless-api.slice'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
import style from './analysisCategory.module.scss'
import { useRouter } from 'next/router'
import CreateCategoryAnalysis from '../components/CreateCategoryAnalysis'
import ButtonApp from 'components/ButtonApp'
import AlertApp from 'components/AlertApp'
import { AnalysisRepositoryInstance } from 'infrastructure/repositories/analysis.repository'
import { FormattedMessage } from 'react-intl'
import iconEdit from '../../../../assets/img/icons/pencil.svg'
import iconDelete from '../../../../assets/img/icons/trash.svg'
import { Post } from 'domain/Post/Post'
import SearchBar from 'components/SearchBar'
import { useGuardPermissions } from 'ui/hooks/guard.permissions.hook'

const CreateFormArticle = dynamic(
  () => import('../components/CreateFormArticle'),
  {
    suspense: true
  }
)

/**
 * Función principal del componente Analysis Category
 * @returns
 */

const AnalysisCategory: NextPage<any> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [filters, setFilters] = useState({
    search: '',
    categories: undefined,
    tags: undefined
  })
  const [outstandingArt, setOutstandingArt] = useState([])
  const [selectedArt, setselectedArt] = useState<any>()

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
    if (userLogged?.uid)
      getOutstandingArticles().then(res =>{
        setOutstandingArt(res)
        if(query.post_id){
          const selected = res.find((item:Post) => item.id === query.post_id)
          setselectedArt({ items: [selected], hasMore: false })
        }
        
      } )
  }, [])

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
        query: {
          offset,
          post_status: statePost,
          category_name: query['category-slug'] as string,
          s: filters.search
        }
      })
    )
  }

  const getOutstandingArticles = async () => {
    if (query['category-slug']) {
      const response = await AnalysisRepositoryInstance.getOutstandingArticles(
        query['category-slug'] as string,
        userDataToken
      )
      return response
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

  const _onDeleteArt = async (data: { id: number; status: string }) => {
    if (wpToken) {
      await AnalysisRepositoryInstance.deleteArticle(data.id, wpToken)
      setFilters(pre => ({ ...pre }))
    }
  }
  return (
    <AnalysisCategoryView
      outstandingArt={outstandingArt}
      onDeleteCat={_onDeleteCat}
      onDeleteArt={_onDeleteArt}
      statePost={statePost}
      setStatePost={(state: 'public' | 'private') => setStatePost(state)}
      loadMore={_loadMore}
      selectedPost={selectedArt}
      onFilter={(value: {
        search?: string
        catLevel?: string
        tags?: string
      }) => _filter(value)}
    />
  )
}

const AnalysisCategoryView = ({
  onFilter,
  setStatePost,
  statePost,
  loadMore,
  onDeleteCat,
  onDeleteArt,
  outstandingArt,
  selectedPost
}: {
  outstandingArt: Post[]
  onFilter: Function
  onDeleteCat: Function
  onDeleteArt: Function
  setStatePost: Function
  statePost: 'public' | 'private'
  loadMore: Function
  selectedPost?: any
}) => {
  const [createArt, setCreateArt] = useState(false)
  const [deleteCat, setDeleteCat] = useState(false)
  const [updateCat, setCategory] = useState(false)
  const [deleteArticle, setDeleteArticle]: [
    { id: number; status: string } | null,
    Function
  ] = useState(null)
  const { query } = useRouter()
  const isPrivateExcerpt = useRef(query.collapsable_items === '1')
  const { editionGranted } = useGuardPermissions()
  const [outstandingPost, setoutstandingPost] = useState<
    { items: Post[]; hasMore: false } | undefined
  >()
  
  useEffect(() => {
    if(selectedPost) setoutstandingPost(selectedPost);
  }, [selectedPost])
  


  return (
    <div className={style.analysisCategoryPage}>
      <header className='title-container flex-container column space-between'>
        <div className={style.titleBlock}>
          <p className='small-caps'>Análisis</p>
          <h1 className='main-title'>{query.category_name}</h1>
          <div className={`admin-buttons-wrapper`}>
            {editionGranted && (
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
            )}
          </div>
        </div>
        <SearchBar
          onFilter={(value: { search?: string; tags?: string }) =>
            onFilter(value)
          }
        />
      </header>
      {outstandingPost && (
        <button onClick={() => setoutstandingPost(undefined)}>
          {' '}
          {'< Atras'}{' '}
        </button>
      )}
      <div className={isPrivateExcerpt.current ? style.collapsedItem : ''}>
        <PostGrid
          parent='page.analysis.articles.form.create.submit'
          loadMore={loadMore}
          statePost={statePost}
          setStatePost={(state: 'public' | 'private') => setStatePost(state)}
          onClickItemTarget={encodeURI(`/analysis/${query['category-slug']}/`)}
          deleteItem={(value: { id: number; status: string }) =>
            setDeleteArticle(value)
          }
          openCreate={setCreateArt}
          typeItem={isPrivateExcerpt.current ? 'privateExcerpt' : 'excerpt'}
          footerType='text'
          alignment={isPrivateExcerpt.current ? 'column' : 'row'}
          staticPosts={outstandingPost}
        />
        {isPrivateExcerpt.current && outstandingArt.length > 0 && (
          <LatestArticles
            onClickItem={(art: Post) =>
              setoutstandingPost({ items: [art], hasMore: false })
            }
            articlesList={outstandingArt}
          />
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
      {deleteArticle && (
        <Suspense>
          <AlertApp
            title='page.analysis.articles.form.remove.title'
            visible={deleteArticle}
            onAction={() => {
              onDeleteArt(deleteArticle)
              setDeleteArticle(null)
            }}
            onCancel={() => setDeleteArticle(null)}
          >
            <p>
              <FormattedMessage id='page.analysis.articles.form.remove.content' />
            </p>
          </AlertApp>
        </Suspense>
      )}
      {createArt && (
        <Suspense>
          <CreateFormArticle
            cat={parseInt(query.cat as string)}
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
