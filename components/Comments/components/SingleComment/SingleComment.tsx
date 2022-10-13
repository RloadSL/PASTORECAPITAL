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
      <Card backgroundColor={comment.parent.path !== 'comments' ? '#f5f0ff' : 'white'}>
        <div className='flex-container'>
          <div className={`${style.colLeft} ${comment.parent.path !== 'comments' ? style.isReply : ''}`}>
            { comment.parent.path !== 'comments' ? <div className={style.replyIcon}></div> : null}
          </div>
          <div className={style.colRight}>
            <div className={style.top}>
              <div className={style.innerContent}>
                <div className='flex-container'>
                  <div className={style.author}> {owner?.name} </div>
                  <div className={style.date}>{comment.created_at.toLocaleDateString()}</div>
                </div>
              </div>
            </div>
            <div className={style.middle}>
              <div className={style.innerContent}>
                {isTeacher ? <div>icono</div> : null}
                <div>{comment.comment}</div>
              </div>
            </div>
            <div className={`${style.bottom}`}>
              <div className={`${style.innerContent} flex-container`}>
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
          </div>
        </div>
        {console.log(comment.parent)}

        { comment.parent.path !== 'comments' ? 
          <CommentsList parent={{id: comment.id as string, path:'comments'}}></CommentsList> : <></>}
      </Card>
    </div>: <></>
  )
}

export default SingleComment;