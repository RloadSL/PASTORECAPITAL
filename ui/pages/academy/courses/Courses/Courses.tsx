/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import SelectApp from 'components/FormApp/components/SelectApp/SelectApp'
import PostGrid from 'components/PostGrid'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { academyGetCurses } from 'ui/redux/slices/academy/academy.slice'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { AppDispatch } from 'ui/redux/store'
import { options } from 'ui/utils/test.data'
import DeleteCourse from './components/DeleteCourse'
import style from './Courses.module.scss'

const CreateForm = dynamic(() => import('./components/CreateForm'), {
  suspense: true
})

/**
 * Función principal del componente Courses
 * @returns
 */

const Courses = ({}) => {
  const dispatch = useDispatch<AppDispatch>()
  const userLogged = useSelector(getUserLogged)
  const refLoadMore = useRef()
  let isAdmin: boolean = true

  useEffect(() => {
    const onChange: any = (entries: any) => {
      if (entries[0].isIntersecting) {
        getCourses()
      }
    }
    const observer = new IntersectionObserver(onChange, {
      rootMargin: '100px'
    })

    observer.observe((refLoadMore.current as unknown) as Element)
  }, [])


  useEffect(() => {
     if(userLogged?.wpToken) getCourses(userLogged?.wpToken)
  }, [userLogged?.wpToken])

  const getCourses = async (wpToken?:string) => {
    await dispatch(academyGetCurses({ wpToken: wpToken }))
  }

  return <CourseView userType={isAdmin} refLoadMore={refLoadMore} />
}

const CourseView = ({
  refLoadMore,
  userType
}: {
  refLoadMore: any
  userType: boolean
}) => {
  const [create, setCreate] = useState(false)
  const [deleteCourse, setDeleteCourse]:[{id: number, status:string} | null , Function] = useState(null)
  return (
    <div className={style.coursesPage}>
      <div>
        <form>
          <SelectApp
            name='filter'
            labelID={'categoría'}
            selectOptions={options}
          />
        </form>
      </div>
      <div className='title-container'>
        <p className='small-caps'>Academia</p>
        <h1>Cursos</h1>
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
      <PostGrid deleteCourse={(value:{id:number, status:string})=>setDeleteCourse(value)} openCreate={setCreate} />
      <div ref={refLoadMore} id='loadMore'></div>
    </div>
  )
}

export default Courses
