/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import Card from 'components/Card'
import Chips from 'components/Chips'
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
  isLastChild: string
}

const SingleComment = ({ comment,  isLastChild }: any) => {
  return <SingleCommentView isLastChild={isLastChild} comment={comment}/>
}

const SingleCommentView = ({ comment, isLastChild}: SINGLECOMMENTPROPS) => {
  const [isMainComment, setisMainComment] = useState<boolean>(comment.parent.path !== 'comments')
  const [reply, setReply] = useState(false)
  const owner = comment.owner as User;

  return (
    comment ?
    <div className={`${style.singleComment} ${isLastChild ? style.lastChild : ''} ${!isMainComment ? style.isReply : null}`}>
      <div className={`${isMainComment ? style.isMain : null}`}>
      <Card backgroundColor={isMainComment ? '#f5f0ff' : 'white'}>
        <div className='flex-container'>
          <div className={`${style.colLeft} ${!isMainComment ? style.isReply : ''}`}>
            { !isMainComment ? <div className={style.replyIcon}></div> : null}
          </div>
          <div className={style.colRight}>
            <div className={style.top}>
              <div className={style.innerContent}>
                <div className='flex-container align-center'>
                  <div className={style.author}> {owner?.name} </div>
                  <div className={style.date}>{comment.created_at.toLocaleDateString()}</div>
                  {owner.role.level > 1 ? <Chips chips={['Profesor']} color='lightMain' /> : null}
                </div>
              </div>
            </div>
            <div className={style.middle}>
              <div className={style.innerContent}>
                <div>{comment.comment}</div>
              </div>
            </div>
            <div className={`${style.bottom}`}>
              <div className={`${style.innerContent} flex-container`}>
                {isMainComment ? (
                  <div className={style.replyButton}>
                    <ButtonApp labelID={reply === false ? 'page.academy.lesson.form.addReply.button' : 'page.academy.lesson.form.closeReply.button'} onClick={() => setReply(!reply)} type='button' buttonStyle='dark' size='small' />
                  </div>) : null}
              </div>
              {reply ? (
                <Suspense>
                  <CreateFormComment onCreate={(c:Comments) => console.log(c)} parent={{id: comment.id, path: 'comments'}} formCommentStyle={'minified'} />
                </Suspense>
              ) : null}
            </div>
          </div>
        </div>
      </Card>
      </div>
      { comment.parent.path !== 'comments' ? 
          <CommentsList parent={{id: comment.id as string, path:'comments'}}></CommentsList> : <></>}
    </div>: <></>
  )
}

export default SingleComment;