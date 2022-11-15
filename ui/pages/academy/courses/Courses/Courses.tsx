/* eslint-disable react-hooks/exhaustive-deps */

import PostGrid from 'components/PostGrid'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postsStore } from 'ui/redux/slices/wp-headless-api/wp-headless-api.selectors'
import { academyGetCurses, cleanAcademyPosts } from 'ui/redux/slices/wp-headless-api/wp-headless-api.slice'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
import DeleteCourse from './components/DeleteCourse'
import FilterCourse from './components/FilterCourse'
import style from './Courses.module.scss'
import { useRouter } from 'next/router'

const CreateForm = dynamic(() => import('./components/CreateForm'), {
  suspense: true
})

/**
 * Función principal del componente Courses
 * @returns
 */

const Courses = ()  => {
  const dispatch = useDispatch<AppDispatch>()
  const [filters, setFilters] = useState({search: '', categories: undefined, tags: undefined})
  const userLogged = useSelector(getUserLogged)
  const posts = useSelector(postsStore)
  const router = useRouter()
  console.log(router)

  let isAdmin: boolean = true
  const [statePost, setStatePost] = useState<'public' | 'private'> ('public')

  useEffect(() => {
    if(userLogged?.uid){
      dispatch(cleanAcademyPosts({}))
      if(statePost === 'public'){
        getCourses(filters, undefined)
      }else{
        if (userLogged?.wpToken) getCourses(filters, userLogged?.wpToken)
      }
    }
 }, [filters, statePost])

 const _loadMore = (offset:number)=>{
  if(statePost === 'public'){
    getCourses(filters, undefined, offset)
  }else{
    if (userLogged?.wpToken) getCourses(filters, userLogged?.wpToken,  offset)
  }
 }

  

  const getCourses = async (filters:{search: string, categories: any, tags: any}, wpToken?:string, offset?:number) => {
    await dispatch(academyGetCurses({ wpToken, filters , offset}))
  }

  const _filter = (value: any)=>{
    setFilters( pre => ({...pre, ...value}))
  }

  return <CourseView statePost={statePost} setStatePost={(state:"public" | "private")=>setStatePost(state)} loadMore={_loadMore} onFilter={(value: {search?: string, catLevel?: string, tags?: string})=> _filter(value)} userType={isAdmin}  />
}

const CourseView = ({
  userType,
  onFilter,
  setStatePost,
  statePost,
  loadMore
}: {
  userType: boolean,
  onFilter: Function,
  setStatePost: Function
  statePost:'public' | 'private',
  loadMore:Function
}) => {
  const [create, setCreate] = useState(false)
  const [deleteCourse, setDeleteCourse]: [{ id: number, status: string } | null, Function] = useState(null)
  return (
    <div className={style.coursesPage}>
      <header className='title-container flex-container column align-center space-between'>
        <div className={style.titleBlock}>
          <p className='small-caps'>Academia</p>
          <h1 className='main-title'>Cursos</h1>
        </div>
        <FilterCourse
          onFilter={(value: {
            search?: string
            catLevel?: string
            tags?: string
          }) => onFilter(value)}
        />
      </header>
      <PostGrid parent='academy.create.courses' loadMore={loadMore} statePost={statePost} setStatePost={(state:"public" | "private")=>setStatePost(state)} onClickItemTarget='/academy/courses/' deleteItem={(value: { id: number, status: string }) => setDeleteCourse(value)} openCreate={setCreate} />
      
      {create && (
        <Suspense>
          <CreateForm onClose={() =>  {setCreate(false); setStatePost('private')}}></CreateForm>
        </Suspense>
      )}
      {deleteCourse && (
        <Suspense>
          <DeleteCourse data={deleteCourse} onClose={() => setDeleteCourse(null)}></DeleteCourse>
        </Suspense>
      )}
    </div>
  )
}

export default Courses
