/* eslint-disable react-hooks/exhaustive-deps */
import parse from 'html-react-parser'
import style from './CourseDetail.module.scss'
import { WP_EDIT_POST } from 'infrastructure/wordpress/config'
import { NextPage } from 'next'
import { Course } from 'domain/Course/Course'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { useRouter } from 'next/router'
import { Suspense, useCallback, useEffect, useState } from 'react'
import Custom404 from 'pages/404'
import ButtonApp from 'components/ButtonApp'
import dynamic from 'next/dynamic'
import ListLessons from './components/ListLessons'
const CreateFormLesson = dynamic(() => import('./components/CreateFormLesson'), {
  suspense: true
})
const DeleteLesson = dynamic(() => import('./components/DeleteLesson'), {
  suspense: true
})

const CourseDetail: NextPage<any> = ({ post }: { post: Course }) => {
  const router = useRouter()
  const loggedUser = useSelector(getUserLogged)

  useEffect(() => {
    if (!post) {
      router.replace('/academy/courses')
    }
  }, [post])

  const editLink = (token?: string) => {
    return `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${token}`
  }
  const courseCat = useCallback(
    ()=> post.categories.find(item => item.slug === post.slug)?.term_id,
    [post.id],
  )
  

  return post ? (
    <CourseDetailView
      courseCat={courseCat() || -1}
      isAuthorized={loggedUser?.wpToken != null}
      post={post}
      editLink={editLink(loggedUser?.wpToken)}
    />
  ) : (
    <Custom404></Custom404>
  )
}

const CourseDetailView = ({
  post,
  isAuthorized,
  editLink,
  courseCat
}: {
  post: any
  isAuthorized: boolean
  editLink: string
  courseCat : number
}) => {
  const [create, setCreate] = useState(false)
  const [deleteCourse, setDeleteCourse]: [{ id: number, status: string } | null, Function] = useState(null)
  

  return (
    <div className={style.coursePage}>
      <div style={{ position: 'fixed', right: '10px', bottom: '20px' }}>
        <ButtonApp
          onClick={() => setCreate(true)}
          labelID='page.academy.course.add-lesson'
        />
      </div>
      <div>
        {post && isAuthorized ? (
          <a href={editLink} target='_blank' rel='noreferrer'>
            {' '}
            EDITAR{' '}
          </a>
        ) : null}
        <div className={style.post}>{parse(post.content?.rendered || '')}</div>
        <ListLessons lessons={post.lessons}></ListLessons>
      </div>
      {create && (
        <Suspense>
          <CreateFormLesson courseCat={courseCat}  onClose={() => setCreate(false)}></CreateFormLesson>
        </Suspense>
      )}
      {deleteCourse && (
        <Suspense>
          <DeleteLesson data={deleteCourse} onClose={() => setDeleteCourse(null)}></DeleteLesson>
        </Suspense>
      )}
    </div>
  )
}

export default CourseDetail
