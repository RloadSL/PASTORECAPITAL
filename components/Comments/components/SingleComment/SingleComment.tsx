/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import Card from 'components/Card'
import CommentsList from 'components/Comments/CommentsList'
import { Comments } from 'domain/Comments/comments'
import { User } from 'domain/User/User'
import { CommentsImplInstance } from 'infrastructure/repositories/comments.repository'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'
import style from './SingleComment.module.scss'

const CreateFormComment = dynamic(
  () => import('../CreateFormComment'),
  {
    suspense: true
  }
)




interface SINGLECOMMENTPROPS {
  comment: Comments,
  childrenCommentsList?: Array<Comments>
}

const SingleComment = ({ comment }: any) => {
  return <SingleCommentView comment={comment}/>
}

const SingleCommentView = ({ comment, childrenCommentsList }: SINGLECOMMENTPROPS) => {
 
  const [reply, setReply] = useState(false)
  const owner = comment.owner as User;
  //OJO AQUÍ para maquetar el botón y el icono de profesor
  const isTeacher = false;
  //

  return (
    comment ?
    <div className={style.singleComment}>
      <Card cardStyle='outlined'>
        <div className={style.innerContent}>
          {owner.role.level > 1 ? <h1>Profesor</h1> : <h1>Alumno</h1>}
          <div>{comment.comment}</div>
        </div>
        <div className={`${style.bottom}`}>
          <div className={`${style.innerContent} flex-container`}>
            <div className='flex-container'>
              <div className={style.author}><span>Alumno:</span> {owner?.name}</div>
              <div className={style.date}>{comment.created_at.toLocaleDateString()}</div>
            </div>
            {comment.parent.path !== 'comments' ? (
              <div className={style.replyButton}>
                <ButtonApp labelID={reply === false ? 'page.academy.lesson.form.addReply.button' : 'page.academy.lesson.form.closeReply.button'} onClick={() => setReply(!reply)} type='button' buttonStyle='dark' size='small' />
              </div>) : null}
          </div>
          {reply ? (
            <Suspense>
              <CreateFormComment formCommentStyle={'minified'} />
            </Suspense>
          ) : null}
        </div>
        {console.log(comment.parent)}

        { comment.parent.path !== 'comments' ? 
          <CommentsList parent={{id: comment.id as string, path:'comments'}}></CommentsList> : <></>}
      </Card>
    </div>: <></>
  )
}

export default SingleComment;