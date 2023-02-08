/* eslint-disable react-hooks/exhaustive-deps */

import LatestArticles from 'components/LatestArticles'
import PostGrid from 'components/PostGrid'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  cleanAcademyPosts,
  getAnalysisArticles,
  taxConsultantGetResorces
} from 'ui/redux/slices/wp-headless-api/wp-headless-api.slice'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
import style from './resources.module.scss'
import { useRouter } from 'next/router'
// import CreateCategoryAnalysis from '../components/CreateCategoryAnalysis'
import ButtonApp from 'components/ButtonApp'
import AlertApp from 'components/AlertApp'
import { AnalysisRepositoryInstance } from 'infrastructure/repositories/analysis.repository'
import { FormattedMessage } from 'react-intl'
import iconEdit from '../../../../assets/img/icons/pencil.svg'
import iconDelete from '../../../../assets/img/icons/trash.svg'
import { Post } from 'domain/Post/Post'
import SearchBar from 'components/SearchBar'
import { useGuardPermissions } from 'ui/hooks/guard.permissions.hook'
import taxConsultantResourcesRepository from 'infrastructure/repositories/taxConsultantResources.repository'

const CreateFormResource = dynamic(
  () => import('./components/CreateFormResource'),
  {
    suspense: true
  }
)

/**
 * Función principal del componente Analysis Category
 * @returns
 */

const Resources: NextPage<any> = () => {
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
        if (wpToken) getPosts(filters, wpToken) //OJO con el nombre de la funcion getPosts
      }
    }
  }, [filters, statePost,userLogged?.uid])

  /* useEffect(() => {
    if (userLogged?.uid)
      getOutstandingArticles().then(res => {
        setOutstandingArt(res)
        if (query.post_id && query.collapsable_items === '1') {
          const selected = res.find((item: Post) => item.id === query.post_id)
          if (selected) {
            setselectedArt({ items: [selected], hasMore: false })
          } else {
            AnalysisRepositoryInstance.getArticle(query.post_id as string).then((art) => {
              setselectedArt({ items: [art], hasMore: false })
            })
          }

        }

      })
  }, []) */

  const _loadMore = (offset: number) => {
    if (statePost === 'public') {
      getPosts(filters, undefined ,offset)
    } else {
      if (wpToken) getPosts(filters, wpToken,offset)
    }
  }

  const getPosts = async (
    filters: { search: string; categories: any; tags: any },
    wpToken?: string,
    offset?: number
  ) => {
    dispatch(
      taxConsultantGetResorces({ offset, wpToken: wpToken, filters: filters })
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
    replace('/research/bitcoins-altcoins', undefined, { shallow: true })
  }

  const _onDeleteArt = async (data: { id: number; status: string }) => {
    if (wpToken) {
      await taxConsultantResourcesRepository.delete(data.id, wpToken)
      setFilters(pre => ({ ...pre }))
    }
  }
  return (
    <ResourcesView
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

const ResourcesView = ({
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
  const isPrivateExcerpt = useRef(false)
  const [outstandingPost, setoutstandingPost] = useState<
    { items: Post[]; hasMore: false } | undefined
  >()

  useEffect(() => {
    if (selectedPost) setoutstandingPost(selectedPost);
  }, [selectedPost])

  return (
    <div className={style.resources}>
      <header className='title-container flex-container column space-between'>
        <div className={style.titleBlock}>
          <p className='small-caps'>
            <FormattedMessage id={'tax-consultant'} />
          </p>
          <h1 className='main-title'>
            <FormattedMessage id={'resources'} />
          </h1>
        </div>
        <SearchBar
          placeholder={'component.filter-search-bar.label'}
          onFilter={(value: { search?: string; tags?: string }) =>
            onFilter(value)
          }
        />
      </header>
      {outstandingPost && (
        <button className='back-button' onClick={() => setoutstandingPost(undefined)}>
          <span>
            <FormattedMessage id="btn.back" />
          </span>
        </button>
      )}
      <div className={isPrivateExcerpt.current ? style.collapsedItem : ''}>
        <PostGrid
          parent='page.tax-consultant.resources.createForm.button.create'
          loadMore={loadMore}
          statePost={statePost}
          setStatePost={(state: 'public' | 'private') => setStatePost(state)}
          onClickItemTarget={encodeURI(`/tax-consultant/resources/`)}
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

      {/* {updateCat && (
        <Suspense>
          <CreateCategoryAnalysis
            cat={parseInt(query.cat as string)}
            onClose={() => {
              setCategory(false)
            }}
          ></CreateCategoryAnalysis>
        </Suspense>
      )} */}

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
          <CreateFormResource
            cat={parseInt(query.cat as string)}
            onClose={() => {
              setCreateArt(false)
            }}
          ></CreateFormResource>
        </Suspense>
      )}
    </div>
  )
}

export default Resources
