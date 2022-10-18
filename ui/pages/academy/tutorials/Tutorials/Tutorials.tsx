/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import PostGrid from 'components/PostGrid'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { academyGetTutorials, cleanAcademyPosts } from 'ui/redux/slices/academy/academy.slice'

import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
import DeleteTutorial from './components/DeleteTutorial'
import FilterCourse from './components/FilterTutorials'
import style from './Tutorials.module.scss'

const CreateForm = dynamic(() => import('./components/CreateFormTutorial'), {
  suspense: true
})

const Tutorials = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [filters, setFilters] = useState({search: '', categories: '', tags: undefined})
  const userLogged = useSelector(getUserLogged)
  
  const [statePost, setStatePost] = useState<'public' | 'private'> ('public')

  useEffect(() => {
    dispatch(cleanAcademyPosts({})) 
    if(statePost === 'public'){
      getTutorials(filters, undefined)
    }else{
      if (userLogged?.wpToken) getTutorials(filters, userLogged?.wpToken)
    }
   
 }, [filters, statePost])

 

 const getTutorials = async ( filters:{search: string, categories: any, tags: any, }, wpToken?:string, offset?:number) => {
   await dispatch(academyGetTutorials({offset, wpToken: wpToken, filters: filters }))
 }

 const _loadMore = (offset:number)=>{
  console.log('_loadMore', offset)
  if(statePost === 'public'){
    getTutorials(filters, undefined, offset)
  }else{
    if (userLogged?.wpToken) getTutorials(filters, userLogged?.wpToken,  offset)
  }
 }

  const _filter = (value: any)=>{
    setFilters( pre => ({...pre, ...value}))
  }

  return <TutorialsView statePost={statePost} setStatePost={(state:"public" | "private")=>setStatePost(state)} loadMore={_loadMore} onFilter={(value: {search?: string, catLevel?: string, tags?: string})=> _filter(value)} ></TutorialsView>
}

const TutorialsView = ({
  refLoadMore,
  userType,
  onFilter,
  loadMore,
  setStatePost,
  statePost
}: {
  refLoadMore?: any
  userType?: boolean,
  onFilter: Function,
  loadMore: Function,
  setStatePost: Function
  statePost:'public' | 'private'
}) => {
  const [create, setCreate] = useState(false)
  const [deleteCourse, setDeleteCourse]: [{ id: number, status: string } | null, Function] = useState(null)

  return <div className={style.coursesPage}>
  <header className='title-container flex-container column align-center space-between'>
    <div className={style.titleBlock}>
        <p className='small-caps'>Academia</p>
        <h1 className='main-title'>Tutoriales</h1>
    </div>
    <FilterCourse onFilter={(value: {search?: string, catLevel?: string, tags?: string})=>onFilter(value)}/>
  </header>
  <PostGrid statePost={statePost} setStatePost={setStatePost} loadMore={loadMore} onClickItemTarget='/academy/tutorials/' deleteCourse={(value: { id: number, status: string }) => setDeleteCourse(value)} openCreate={setCreate} />
  <div ref={refLoadMore} id='loadMore'></div>
  {create && (
    <Suspense>
      <CreateForm onClose={() => {setCreate(false); setStatePost('private')}}></CreateForm>
    </Suspense>
  )}
  {deleteCourse && (
    <Suspense>
      <DeleteTutorial data={deleteCourse} onClose={() => setDeleteCourse(null)}></DeleteTutorial>
    </Suspense>
  )}
</div>
}

export default Tutorials
