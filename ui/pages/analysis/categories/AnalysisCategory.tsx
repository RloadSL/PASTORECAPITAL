/* eslint-disable react-hooks/exhaustive-deps */

import LatestArticles from 'components/LatestArticles'
import PostGrid from 'components/PostGrid'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postsStore } from 'ui/redux/slices/academy/academy.selectors'
import { academyGetCurses, cleanAcademyPosts } from 'ui/redux/slices/academy/academy.slice'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
// import DeleteCourse from './components/DeleteCourse'
// import FilterCourse from './components/FilterCourse'
import style from './analysisCategory.module.scss'

// const CreateForm = dynamic(() => import('./components/CreateForm'), {
//   suspense: true
// })

/**
 * Función principal del componente Analysis Category
 * @returns
 */

 let fakeCategory = 'flash-updates'
 const fakeArticlesList = [
  {
    title:'Este es el título de una noticia sobre bitcoins',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    author: 'John Doe',
    date: '20 Feb 2022'
  },
  {
    title:'Tips para estar a la ultima en criptomonedas',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    author: 'John Doe',
    date: '20 Feb 2022'
  },
  {
    title:'Ethereum empuja con fuerza la caída del bitcoin a nivel mundial',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    author: 'John Doe',
    date: '20 Feb 2022'
  }
 ]


const AnalysisCategory = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [filters, setFilters] = useState({ search: '', categories: undefined, tags: undefined })
  const userLogged = useSelector(getUserLogged)
  const posts = useSelector(postsStore)

  let isAdmin: boolean = true
  const [statePost, setStatePost] = useState<'public' | 'private'>('public')

  useEffect(() => {
    if (userLogged?.uid) {
      dispatch(cleanAcademyPosts({}))//OJO al nombre de esta función que hace referencia a Academy
      if (statePost === 'public') {
        getCourses(filters, undefined)
      } else {
        if (userLogged?.wpToken) getCourses(filters, userLogged?.wpToken) //OJO con el nombre de la funcion getCOurses
      }
    }
  }, [filters, statePost])

  const _loadMore = (offset: number) => {
    if (statePost === 'public') {
      getCourses(filters, undefined, offset)
    } else {
      if (userLogged?.wpToken) getCourses(filters, userLogged?.wpToken, offset)
    }
  }


  const getCourses = async (filters: { search: string, categories: any, tags: any }, wpToken?: string, offset?: number) => {
    await dispatch(academyGetCurses({ wpToken, filters, offset })) //OJO nombre de función academygetCourses
  }

  const _filter = (value: any) => {
    setFilters(pre => ({ ...pre, ...value }))
  }

  return <AnalysisCategoryView statePost={statePost} setStatePost={(state: "public" | "private") => setStatePost(state)} loadMore={_loadMore} onFilter={(value: { search?: string, catLevel?: string, tags?: string }) => _filter(value)} userType={isAdmin} />
}

const AnalysisCategoryView = ({
  userType,
  onFilter,
  setStatePost,
  statePost,
  loadMore
}: {
  userType: boolean,
  onFilter: Function,
  setStatePost: Function
  statePost: 'public' | 'private',
  loadMore: Function
}) => {
  const [create, setCreate] = useState(false)
  const [deleteArticle, setDeleteArticle]: [{ id: number, status: string } | null, Function] = useState(null)
  return (
    <div className={style.analysisCategoryPage}>
      <header className='title-container flex-container column align-center space-between'>
        <div className={style.titleBlock}>
          <p className='small-caps'>Análisis</p>
          <h1 className='main-title'>{fakeCategory}</h1>
        </div>
        {/* <FilterCourse onFilter={(value: {search?: string, catLevel?: string, tags?: string})=>onFilter(value)}/> */}
      </header>
        <div className={fakeCategory === 'flash-updates' ? style.collapsedItem : ''}>
          <PostGrid parent='analysis.create.article' loadMore={loadMore} statePost={statePost} setStatePost={(state: "public" | "private") => setStatePost(state)} onClickItemTarget='/analysis/' deleteItem={(value: { id: number, status: string }) => setDeleteArticle(value)} openCreate={setCreate} typeItem={fakeCategory === 'flash-updates' ? 'privateExcerpt' : 'excerpt'} alignment={fakeCategory === 'flash-updates' ? 'column' : 'row'} />
          {fakeCategory === 'flash-updates' && <LatestArticles articlesList={fakeArticlesList}/> }
        </div>
       {/* : (
        <PostGrid parent='analysis.create.article' loadMore={loadMore} statePost={statePost} setStatePost={(state: "public" | "private") => setStatePost(state)} onClickItemTarget='/analysis/' deleteItem={(value: { id: number, status: string }) => setDeleteArticle(value)} openCreate={setCreate} />
      )} */}


      {/* {create && (
        <Suspense>
          <CreateForm onClose={() =>  {setCreate(false); setStatePost('private')}}></CreateForm>
        </Suspense>
      )}
      {deleteCourse && (
        <Suspense>
          <DeleteCourse data={deleteCourse} onClose={() => setDeleteCourse(null)}></DeleteCourse>
        </Suspense>
      )} */}
    </div>
  )
}

export default AnalysisCategory
