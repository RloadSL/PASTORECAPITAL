/* eslint-disable react-hooks/exhaustive-deps */
import parse from 'html-react-parser'
import style from './CourseDetail.module.scss'

import { WP_EDIT_POST } from 'infrastructure/wordpress/config'
import { NextPage } from 'next'
import { Course } from 'domain/Course/Course'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { useRouter } from 'next/router'
import { Suspense, useCallback, useEffect, useState, createRef } from 'react'
import Custom404 from 'pages/404'
import ButtonApp from 'components/ButtonApp'
import dynamic from 'next/dynamic'
import iconEdit from '../../../../../assets/img/icons/pencil.svg'
import iconDelete from '../../../../../assets/img/icons/trash.svg'
import iconAddLesson from '../../../../../assets/img/icons/add-document.svg'
import ListLessons from '../ListLessons'
import Link from 'next/link'
import LinkApp from 'components/LinkApp'
import { useGuardPermissions } from 'ui/hooks/guard.permissions.hook'
import Head from 'next/head'
import WordpressHeader from 'WordpressHeader'

const CreateFormLesson = dynamic(
  () => import('./components/CreateFormLesson'),
  {
    suspense: true
  }
)

const DeleteCourse = dynamic(
  () => import('../Courses/components/DeleteCourse'),
  {
    suspense: true
  }
)


const CourseDetail: NextPage<any> = ({ post }: { post: Course }) => {
  const router = useRouter()
  const loggedUser = useSelector(getUserLogged)
  const { editionGranted } = useGuardPermissions()
  useEffect(() => {
    if (!post) {
      router.replace('/academy/courses')
    }else if(post.lessons && post.lessons.length > 0){
      const firstLesson = post.lessons[0];
      const a = document.getElementById('start-academy-course')
      loggedUser?.role.level > 1 && a?.remove();
      const url = `/academy/courses/${post.slug}/${firstLesson.slug}/?post_id=${post.id}&post_title=${post.title.rendered}&course-slug=${post.slug}&lesson_id=${firstLesson.id}&lesson_title=${firstLesson.title}&current_lesson=0`

      a?.setAttribute('href', url)
      
    }
  }, [post])

  const editLink = (token?: string) => {
    return `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${token}`
  }
  const courseCat = useCallback(
    () => post.categories.find(item => item.slug === post.slug)?.term_id,
    [post?.id]
  )

  return post ? (
    <CourseDetailView
      courseCat={courseCat() || -1}
      isAuthorized={editionGranted}
      post={post}
      editLink={editLink(loggedUser?.wpToken)}
    />
  ) : <></>
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
  courseCat: number
}) => {
  const [deleteCourse, setDeleteCourse]: [{ id: number, status: string } | null, Function] = useState(null)
  const [create, setCreate] = useState(false)
  return (
    <div className={style.coursePage}>
       <WordpressHeader/>
      <div>
        {(post && isAuthorized) && (
          <div className='admin-buttons-wrapper' style={{paddingLeft:'20px'}}>
            <div className={style.addNewLesson}>
              <ButtonApp
                onClick={() => setCreate(true)}
                labelID='page.academy.course.add-lesson'
                buttonStyle='primary'
                icon={iconAddLesson}
              />
            </div>
            <div className='admin-buttons-container'>
              <LinkApp label={'edit'} linkStyle={'edit'} linkHref={editLink} icon={iconEdit} />
              <ButtonApp labelID={'btn.delete'} onClick={() => setDeleteCourse({ id: post.id, status: post.status })} type='button' buttonStyle='delete' size='small' icon={iconDelete} />
            </div>
          </div>
        )}
        <div className={style.post}>{parse(post.content?.rendered || '')}</div>
        <ListLessons formLessonDetail={false} lessons={post.lessons}></ListLessons>
      </div>
      {create && (
        <Suspense>
          <CreateFormLesson
            courseCat={courseCat}
            onClose={() => setCreate(false)}
          ></CreateFormLesson>
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

export default CourseDetail
