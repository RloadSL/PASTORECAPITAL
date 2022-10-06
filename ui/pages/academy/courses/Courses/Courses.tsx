/* eslint-disable react-hooks/exhaustive-deps */

import PostGrid from 'components/PostGrid'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { academyGetCurses } from 'ui/redux/slices/academy/academy.slice'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
import DeleteCourse from './components/DeleteCourse'
import FilterCourse from './components/FilterCourse'
import style from './Courses.module.scss'

const CreateForm = dynamic(() => import('./components/CreateForm'), {
  suspense: true
})

/**
 * Función principal del componente Courses
 * @returns
 */

const Courses = ({ }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [filters, setFilters] = useState({search: '', catLevel: undefined, tags: undefined})
  const userLogged = useSelector(getUserLogged)
  const refLoadMore = useRef()
  let isAdmin: boolean = true
  
  /* useEffect(() => {
    const onChange: any = (entries: any) => {
      if (entries[0].isIntersecting) {
        getCourses(filters)
      }
    }
    const observer = new IntersectionObserver(onChange, {
      rootMargin: '100px'
    })

    observer.observe((refLoadMore.current as unknown) as Element)
  }, [filters]) */

  useEffect(() => {
     getCourses(filters, undefined)
  }, [filters])

  useEffect(() => {
    if (userLogged?.wpToken) getCourses(filters, userLogged?.wpToken)
  }, [userLogged?.wpToken, filters])

  const getCourses = async (filters:{search: string, catLevel: any, tags: any}, wpToken?:string) => {
    await dispatch(academyGetCurses({ wpToken: wpToken, filters: filters }))
  }

  const _filter = (value: any)=>{
    setFilters( pre => ({...pre, ...value}))
  }

  return <CourseView onFilter={(value: {search?: string, catLevel?: string, tags?: string})=> _filter(value)} userType={isAdmin} refLoadMore={refLoadMore} />
}

const CourseView = ({
  refLoadMore,
  userType,
  onFilter
}: {
  refLoadMore: any
  userType: boolean,
  onFilter: Function
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
        <FilterCourse onFilter={(value: {search?: string, catLevel?: string, tags?: string})=>onFilter(value)}/>
      </header>
      <PostGrid deleteCourse={(value: { id: number, status: string }) => setDeleteCourse(value)} openCreate={setCreate} />
      <div ref={refLoadMore} id='loadMore'></div>
      {create && (
        <Suspense>
          <CreateForm onClose={() => setCreate(false)}></CreateForm>
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
