import style from './LessonDetail.module.scss'
import { PostDto } from 'infrastructure/dto/course.dto'
import { WP_EDIT_POST } from 'infrastructure/wordpress/config'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import parse from 'html-react-parser'

const LessonDetail: NextPage<any> = ({ post }: { post: PostDto }) => {
  const router = useRouter()
  const loggedUser = useSelector(getUserLogged)
  
  const editLink = (token?: string) => {
    return `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${token}`
  }

  return <LessonDetailView 
  
  isAuthorized={loggedUser?.wpToken != null}
  post={post}
  editLink={editLink(loggedUser?.wpToken)}
  />
}

const LessonDetailView = ({
  post,
  isAuthorized,
  editLink,
  
}: {
  post: any
  isAuthorized: boolean
  editLink: string
  
}) => {
  return (
    <div>
      <div className={style.post}>{parse(post.content?.rendered || '')}</div>
    </div>
  )
}

export default LessonDetail