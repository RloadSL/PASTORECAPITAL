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
    return  token ? `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${token}` : undefined;
  }

  return <LessonDetailView 
  courseTitle={router.query.courseTitle as string} 
  isAuthorized={loggedUser?.wpToken != null}
  post={post}
  editLink={editLink(loggedUser?.wpToken)}
  />
}

const LessonDetailView = ({
  post,
  courseTitle,
  isAuthorized,
  editLink,
  
}: {
  post: any
  isAuthorized: boolean
  editLink?: string,
  courseTitle: string
  
}) => {
  const contentRef = useRef<any>();

  return (
    <div ref={contentRef}>
      <ReadingProgressBar target={contentRef}/>
      <div>
          {editLink ? (<a href={editLink} rel='noreferrer' target='_blank'>Editar</a>) : null}
          {editLink ? (<button>Eliminar</button>) : null}
         <h2>{courseTitle}</h2> 
      </div>
      <div> <h1>{post.title.rendered}</h1> </div>
      <div  className={style.post}>{parse(post.content?.rendered || '')}</div>
    </div>
  )
}

export default LessonDetail