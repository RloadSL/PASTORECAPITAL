/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import SelectApp from 'components/FormApp/components/SelectApp/SelectApp'
import PostGrid from 'components/PostGrid'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { academyGetCurses } from 'ui/redux/slices/academy/academy.slice'
import { AppDispatch } from 'ui/redux/store'
import { options } from 'ui/utils/test.data'
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

  const refLoadMore = useRef()

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

  const getCourses = () => {
    dispatch(academyGetCurses({}))
  }

  return <CourseView refLoadMore={refLoadMore} />
}

const CourseView = ({ refLoadMore }: any) => {
  const [create, setCreate] = useState(false)

  return (
    <div className={style.coursesPage}>
      <div>
        <form>
          <SelectApp labelID={'categoría'} selectOptions={options} />
        </form>
      </div>
      <div className='title-container'>
        <p className='small-caps'>Academia</p>
        <h1>Cursos</h1>

        <div className={style.btn_container_create}>
          <ButtonApp buttonStyle='primary' onClick={()=>setCreate(true)} labelID={'page.academy.courses.btn_create'}></ButtonApp>
        </div>
        {create && (
          <Suspense>
            <CreateForm onClose={()=>setCreate(false)}></CreateForm>
          </Suspense>
        )}
      </div>
      <PostGrid />
      <div ref={refLoadMore} id='loadMore'></div>
    </div>
  )
}

export default Courses
