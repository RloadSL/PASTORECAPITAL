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


const LessonDetail: NextPage<any> = ({ post }: { post: PostDto }) => {
  const router = useRouter()
  const loggedUser = useSelector(getUserLogged)
  console.log(post)
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
        
        <CommentsList main={true}/>
      </div>
    </div>
  )
}

export default LessonDetail