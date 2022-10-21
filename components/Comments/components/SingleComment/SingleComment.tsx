/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import Card from 'components/Card'
import Chips from 'components/Chips'
import CommentsList from 'components/Comments/CommentsList'
import { Comments } from 'domain/Comments/comments'
import { User } from 'domain/User/User'
import dynamic from 'next/dynamic'
import React, { Suspense, useEffect, useState } from 'react'
import style from './SingleComment.module.scss'
import iconReply from '../../../../assets/img/icons/reply-arrow.svg'
import iconDelete from '../../../../assets/img/icons/trash.svg'
import { useGuardPermissions } from 'ui/hooks/guard.permissions.hook'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import AlertApp from 'components/AlertApp'
import { FormattedMessage } from 'react-intl'

const CreateFormComment = dynamic(() => import('../CreateFormComment'), {
  suspense: true
})

interface SINGLECOMMENTPROPS {
  comment: Comments
  childrenCommentsList?: Array<Comments>
  isLastChild: string
  onDelete: Function
  editionGranted: boolean
  userLogged: User
}

const SingleComment = ({ comment, isLastChild, onDelete }: any) => {
  const { editionGranted } = useGuardPermissions()
  const userLogged = useSelector(getUserLogged)

  return (
    <SingleCommentView
      userLogged={userLogged}
      onDelete={onDelete}
      editionGranted={editionGranted}
      isLastChild={isLastChild}
      comment={comment}
    />
  )
}

const SingleCommentView = ({
  comment,
  isLastChild,
  onDelete,
  editionGranted,
  userLogged
}: SINGLECOMMENTPROPS) => {
  const [isMainComment, setisMainComment] = useState<boolean>(
    comment.parent.path !== 'comments'
  )
  const [reply, setReply] = useState(false)
 const [deleteComment, setDeleteComment] = useState(false)

  const [NC, setNC] = useState<Comments>()
  const owner = comment.owner as User

  return comment ? (
    <div
      className={`${style.singleComment} ${
        isLastChild ? style.lastChild : ''
      } ${!isMainComment ? style.isReply : null}`}
    >
      <div className={`${isMainComment ? style.isMain : null}`}>
        <Card backgroundColor={isMainComment ? '#f5f0ff' : 'white'}>
          <div className='flex-container'>
            <div
              className={`${style.colLeft} ${
                !isMainComment ? style.isReply : ''
              }`}
            >
              {!isMainComment ? <div className={style.replyIcon}></div> : null}
            </div>
            <div className={style.colRight}>
              <div className={style.top}>
                <div className={style.innerContent}>
                  <div className='flex-container align-center'>
                    <div className={style.author}> {owner?.name} </div>
                    <div className={style.date}>
                      {comment.created_at.toLocaleDateString()}
                    </div>
                    {owner.role.level > 0 ? (
                      <Chips chips={['Profesor']} color='lightMain' />
                    ) : null}
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
                  {userLogged && editionGranted && (
                    <div>
                      <ButtonApp
                        labelID={'btn.delete'}
                        onClick={() => setDeleteComment(true)}
                        type='button'
                        buttonStyle='delete'
                        size='small'
                        icon={iconDelete}
                      />
                      <AlertApp
                          title="page.academy.lesson.form.removeComment.message.title"
                          visible={deleteComment}
                          onAction={() => onDelete(comment.id)}
                          onCancel={() => setDeleteComment(false)}
                        >
                          <p>
                            <FormattedMessage id='page.academy.lesson.form.removeComment.message.content'/>
                          </p>
                      </AlertApp>
                    </div>
                  )}

                  {isMainComment &&
                    userLogged &&
                    (editionGranted || owner.uid === userLogged?.uid) && (
                      <div className={style.replyButton}>
                        <ButtonApp
                          labelID={
                            reply === false
                              ? 'page.academy.lesson.form.addReply.button'
                              : 'page.academy.lesson.form.closeReply.button'
                          }
                          onClick={() => setReply(!reply)}
                          type='button'
                          buttonStyle='dark'
                          size='small'
                          icon={iconReply}
                        />
                      </div>
                    )}
                </div>
                {reply ? (
                  <Suspense>
                    <CreateFormComment
                      onCreate={(c: Comments) => setNC(c)}
                      parent={{ id: comment.id, path: 'comments' }}
                      formCommentStyle={'minified'}
                    />
                  </Suspense>
                ) : null}
              </div>
            </div>
          </div>
        </Card>
      </div>
      {comment.parent.path !== 'comments' ? (
        <CommentsList
          newComments={NC}
          parent={{ id: comment.id as string, path: 'comments' }}
        ></CommentsList>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  )
}

export default React.memo(SingleComment)
