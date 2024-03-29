/* eslint-disable react-hooks/exhaustive-deps */

import LatestArticles from 'components/LatestArticles'
import PostGrid from 'components/PostGrid'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  cleanAcademyPosts,
  getFlashArticles
} from 'ui/redux/slices/wp-headless-api/wp-headless-api.slice'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
import style from './flashUpdatesCategory.module.scss'
import { useRouter } from 'next/router'
import AlertApp from 'components/AlertApp'
import { AnalysisRepositoryInstance } from 'infrastructure/repositories/analysis.repository'
import { FormattedMessage } from 'react-intl'
import { Post } from 'domain/Post/Post'
import SearchBar from 'components/SearchBar'
import { FlashUpdatesRepositoryInstance } from 'infrastructure/repositories/flashupdates.repository'
import { WP_TERM } from 'infrastructure/dto/wp.dto'


const CreateFormArticle = dynamic(
  () => import('./components/CreateFormArticle'),
  {
    suspense: true
  }
)

const WpUpdatePlan = dynamic(
  () => import('components/UpdatePostPlan'),
  {
    suspense: true
  }
)
/**
 * Función principal del componente Analysis Category
 * @returns
 */

const FlashUpdates: NextPage<any> = () => {
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
      getOutstandingArticles().then(res => {
        setOutstandingArt(res)
        if (query.post_id) {
          const selected = res.find((item: Post) => item.id === query.post_id)
          if (selected) {
            setselectedArt({ items: [selected], hasMore: false })
          } else {
            AnalysisRepositoryInstance.getArticle(query.post_id as string).then(
              art => {
                setselectedArt({ items: [art], hasMore: false })
              }
            )
          }
        }
      })
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
      getFlashArticles({
        userDataToken,
        wpToken,
        query: {
          offset,
          post_status: statePost,
          category_name: 'flash-updates',
          s: filters.search,
          tags: filters.tags
        }
      })
    )
  }

  const getOutstandingArticles = async () => {
    const response =
      await FlashUpdatesRepositoryInstance.getOutstandingArticles(
        'flash-updates',
        userDataToken
      )
    return response
  }

  const _filter = (value: any) => {
    setFilters(pre => ({ ...pre, ...value }))
  }

  const _onDeleteArt = async (data: { id: number; status: string }) => {
    if (wpToken) {
      await FlashUpdatesRepositoryInstance.deleteArticle(data.id, wpToken)
      setFilters(pre => ({ ...pre }))
    }
  }
  return (
    <FlashUpdatesView
      editionGranted={userLogged?.role.level >= 1}
      outstandingArt={outstandingArt}
      userTokens={{ userDataToken, wpToken }}
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

const FlashUpdatesView = ({
  onFilter,
  setStatePost,
  statePost,
  loadMore,
  onDeleteArt,
  outstandingArt,
  selectedPost,
  userTokens,
  editionGranted
}: {
  outstandingArt: Post[]
  onFilter: Function
  onDeleteArt: Function
  setStatePost: Function
  statePost: 'public' | 'private'
  loadMore: Function
  selectedPost?: any
  userTokens: { userDataToken?: string; wpToken?: string }
  editionGranted: boolean
}) => {
  const [createArt, setCreateArt] = useState(false)
  const [deleteArticle, setDeleteArticle]: [
    { id: number; status: string } | null,
    Function
  ] = useState(null)
  const { query } = useRouter()
  const isPrivateExcerpt = useRef(true)
  const [outstandingPost, setoutstandingPost] = useState<
    { items: Post[]; hasMore: false } | undefined
  >()
  const [updatePLan, setUpdatePLan] = useState<
    { id: string; plans: WP_TERM[] } | undefined
  >(undefined)
  useEffect(() => {
    if (selectedPost) setoutstandingPost(selectedPost)
  }, [selectedPost])

  return (
    <div className={style.analysisCategoryPage}>
      <div className='max-container'> 
      <header className='title-container flex-container column space-between'>
        <div className={style.titleBlock}>
          <p className='small-caps'>
            <FormattedMessage id={'research'} />
          </p>
          <h1 className='main-title'>
            <FormattedMessage id={'flash-updates'} />
          </h1>
          {/* <div className={`admin-buttons-wrapper`}></div> */}
        </div>
        <SearchBar
          onFilter={(value: { search?: string; tags?: string }) =>
            onFilter(value)
          }
        />
      </header>
      {outstandingPost && (
        <button
          className='back-button'
          onClick={() => setoutstandingPost(undefined)}
        >
          <span>
            <FormattedMessage id='btn.back' />
          </span>
        </button>
      )}
      <div className={isPrivateExcerpt.current ? style.collapsedItem : ''}>
        <div className='flashUpdates_grid'>
        <PostGrid
          parent='page.analysis.articles.form.create.submit'
          loadMore={loadMore}
          setPlan={({ id, plans }: any) => setUpdatePLan({ id, plans })}
          statePost={statePost}
          setStatePost={(state: 'public' | 'private') => setStatePost(state)}
          onClickItemTarget={encodeURI(
            `/research/bitcoins-altcoins/${query['category-slug']}/`
          )}
          deleteItem={(value: { id: number; status: string }) =>
            setDeleteArticle(value)
          }
          openCreate={setCreateArt}
          typeItem={isPrivateExcerpt.current ? 'privateExcerpt' : 'excerpt'}
          footerType='text'
          alignment={isPrivateExcerpt.current ? 'column' : 'row'}
          staticPosts={outstandingPost}
        />
        </div>
        {isPrivateExcerpt.current && outstandingArt.length > 0 && (
          <LatestArticles
            onClickItem={(art: Post) =>
              setoutstandingPost({ items: [art], hasMore: false })
            }
            articlesList={outstandingArt}
          />
        )}
      </div>

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

      {updatePLan && <Suspense>
        <AlertApp
          title='page.analysis.articles.form.update'
          visible={updatePLan != undefined}
          onCancel={() => {
            setUpdatePLan(undefined)
          }}
        >
          <WpUpdatePlan wpToken={userTokens.wpToken}
            post_id={updatePLan?.id}
            current_plans={updatePLan.plans.map(item => item.term_id?.toString())} />
        </AlertApp>
      </Suspense>}
      </div>
    </div>
  )
}

export default FlashUpdates
