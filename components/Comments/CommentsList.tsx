import style from './CommentsList.module.scss'
import SingleComment from './components/SingleComment'

interface COMMENTSLISTPROPS {
  commentsList: Array<any>,
  children?: any
}

const CommentsList = ({ commentsList, children }: COMMENTSLISTPROPS) => {
  return <CommentsListView commentsList={commentsList} />
}

const CommentsListView = ({ commentsList, children }: COMMENTSLISTPROPS) => {
  return (
    <div className={style.commentsList}>
      <h2>Preguntas de alumnos</h2>
      {commentsList.map((comment, index) => {
        return (
          <div className={style.commentsThread} key={index}>
            <SingleComment key={index} comment={comment} isMainComment={true} />
            <div className={style.commentReplys}>
              {comment.total_replys ? (
                comment.total_replys.map((reply: any, index: any) => {
                  return (
                    <SingleComment key={index} comment={reply} />
                  )
                })
              ) : null
              }
            </div>
          </div>
        )
      })}

      {children}
    </div>
  )
}


export default CommentsList;