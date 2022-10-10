import style from './LessonDetail.module.scss'
import { PostDto } from 'infrastructure/dto/course.dto'
import { WP_EDIT_POST } from 'infrastructure/wordpress/config'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import parse from 'html-react-parser'
import ReadingProgressBar from 'components/ReadingProgressBar'
import CommentsList from 'components/Comments'
import CreateFormComment from 'components/Comments/components/CreateFormComment'

const commentsList = [
  {
    publisher: 'Luis López',
    commentText: 'tengo una duda sobre cómo Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur luctus mi at imperdiet. Nullam vel ligula efficitur, eleifend mauris vitae, molestie risus. Integer convallis quis augue eu tempor.',
    created_at: '01/10/2022'
  },
  {
    publisher: 'Rocío Pérez',
    commentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur luctus mi at imperdiet. ',
    created_at: '01/10/2022',
    total_replys: [
      {
        publisher: 'Profesor',
        commentText: 'Pues voy y te resulevo la duda. ',
        created_at: '01/10/2022'
      },
      {
        publisher: 'alumno',
        commentText: 'Pero es que sigo sin entenderlo. ',
        created_at: '01/10/2022'
      }
    ]
  },
  {
    publisher: 'Fernando García',
    commentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur luctus mi at imperdiet. ',
    created_at: '02/10/2022'
  }
]

const LessonDetail: NextPage<any> = ({ post }: { post: PostDto }) => {
  const router = useRouter()
  const loggedUser = useSelector(getUserLogged)
  /*  useEffect(() => {
     window.addEventListener('contextmenu', function (e) { 
       // do something here... 
       e.preventDefault(); 
     }, false);
   }, []) */


  const editLink = (token?: string) => {
    return token ? `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${token}` : undefined;
  }

  return <LessonDetailView
    courseTitle={router.query.courseTitle as string}
    ispublisherized={loggedUser?.wpToken != null}
    post={post}
    editLink={editLink(loggedUser?.wpToken)}
  />
}

const LessonDetailView = ({
  post,
  courseTitle,
  ispublisherized,
  editLink,

}: {
  post: any
  ispublisherized: boolean
  editLink?: string,
  courseTitle: string

}) => {
  const contentRef = useRef<any>();

  return (
    <div className={style.lessonPage} ref={contentRef}>
      <ReadingProgressBar target={contentRef} />
      <div className={style.readingContainer}>
        <div>
          {editLink ? (<a href={editLink} rel='noreferrer' target='_blank'>Editar</a>) : null}
          {editLink ? (<button>Eliminar</button>) : null}
        </div>
        <div>
          <p className='small-caps'>{courseTitle}</p>
          <h1 className='main-title'>{post.title.rendered}</h1>
        </div>
        <div className={style.post}>{parse(post.content?.rendered || '')}</div>
        <CreateFormComment />
        <CommentsList commentsList={commentsList} />
      </div>
    </div>
  )
}

export default LessonDetail