/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import { Comments } from 'domain/Comments/comments'
import { CommentsImplInstance } from 'infrastructure/repositories/comments.repository'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLastSnapshoot } from 'ui/redux/slices/comments/coments.slice'
import { getLastCommentsState } from 'ui/redux/slices/comments/comments.selectors'
import { AppDispatch } from 'ui/redux/store'
import style from './CommentsList.module.scss'
import CreateFormComment from './components/CreateFormComment'
import SingleComment from './components/SingleComment'

interface COMMENTSLISTPROPS {
  parent?: { id: string; path: string }
  children?: any,
  main?: boolean,
  newComments?: Comments
}

const CommentsList = ({ parent, main, newComments }: COMMENTSLISTPROPS) => {
  const [commentsList, setcommentsList] = useState<Array<Comments>>([])
  const lastCommentA = useSelector(getLastCommentsState)
  
  const router = useRouter()
  useEffect(() => {
    let fetching = true
    getComments().then(res => {
      if (fetching) {
        const { comments, lastSnapshot } = res
        setcommentsList(comments)
      }
    })
    return () => {
      fetching = false
    }
  }, [])


  useEffect(() => {
    if(newComments){
      setcommentsList(pre => [newComments, ...pre])
    }
  }, [newComments])
  

  const getComments = async () => {
    const response = await CommentsImplInstance.getComments(
      { id: parent?.id || (router.query.lessonId as string) },
      lastCommentA
    )
    return response
  }

  const _onCreate = (c:Comments) => {
    if(c) setcommentsList(pre => [c, ...pre])
  }

  return (
    <CommentsListView
      parent={{
        id: parent?.id || (router.query.lessonId as string),
        path: parent?.path
      }}
      commentsList={commentsList}
      main={main}
      onCreate={_onCreate}
    />
  )
}

const CommentsListView = ({
  commentsList,
  parent,
  main,
  onCreate
}: {
  commentsList: Array<Comments>
  parent: any,
  main?: boolean,
  onCreate: Function
}) => {
  const [isMainComment, setisMainComment] = useState<boolean>(parent.path !== 'comments')


  return (
    <div className={style.commentsList}>
      {parent.path != 'comments' ? <h2>Preguntas de alumnos</h2> : <></>}
      {commentsList.map((comment, index) => {
        return (
          <div className={`${style.commentsItem} ${isMainComment ? style.threadContainer : style.replysContainer}`} key={index}>
            <SingleComment isLastChild={commentsList.length - 1 === index} key={index} comment={comment} isMainComment={true} />
          </div>
        )
      })}
      <div className='text-align-center'>
        <ButtonApp buttonStyle='link' labelID='Cargar más' onClick={() => console.log('load more')} type='button' />
      </div>
    </div>
  )
}

export default CommentsList
