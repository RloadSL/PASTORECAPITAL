/* eslint-disable react-hooks/exhaustive-deps */
import { Comments } from 'domain/Comments/comments'
import { CommentsImplInstance } from 'infrastructure/repositories/comments.repository'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import style from './CommentsList.module.scss'
import SingleComment from './components/SingleComment'

interface COMMENTSLISTPROPS {
  parent?: { id: string; path: string }
  children?: any
}

const CommentsList = ({ parent }: COMMENTSLISTPROPS) => {
  const [commentsList, setcommentsList] = useState<Array<Comments>>([])
  const [lastComment, setlastComment] = useState(null)
  const router = useRouter()
  useEffect(() => {
    let fetching = true
    getComments().then(res => {
      if (fetching) {
        const { comments, lastSnapshot } = res
        setcommentsList(comments)
        setlastComment(lastSnapshot)
      }
    })
    return () => {
      fetching = false
    }
  }, [])

  const getComments = async () => {
    const response = await CommentsImplInstance.getComments(
      { id: parent?.id || router.query.lessonId as string },
      lastComment
    )
    return response
  }

  return <CommentsListView parent={{ id: parent?.id || router.query.lessonId as string , path: parent?.path}} commentsList={commentsList} />
}

const CommentsListView = ({
  commentsList,
  parent
}: {
  commentsList: Array<Comments>,
  parent: any
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
    </div>
  )
}

export default CommentsList
