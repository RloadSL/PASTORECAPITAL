import ButtonApp from 'components/ButtonApp'
import Card from 'components/Card'
import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import style from './SingleComment.module.scss'

const CreateFormComment = dynamic(
  () => import('../CreateFormComment'),
  {
    suspense: true
  }
)


type commentData = {
  publisher: string,
  commentText: string,
  created_at: any,
  total_replys: Array<any>
}

interface SINGLECOMMENTPROPS {
  comment: commentData,
  isMainComment?: boolean
}

const SingleComment = ({ comment, isMainComment }: SINGLECOMMENTPROPS) => {
  // console.log(commentText)
  return <SingleCommentView comment={comment} isMainComment={isMainComment} />
}

const SingleCommentView = ({ comment, isMainComment }: SINGLECOMMENTPROPS) => {
  const { publisher, commentText, created_at, total_replys } = comment
  const [reply, setReply] = useState(false)

  //OJO AQUÍ para maquetar el botón y el icono de profesor
  const isTeacher = false;
  //

  return (
    <div className={style.singleComment}>
      <Card cardStyle='outlined'>
        <div className={style.innerContent}>
          {isTeacher ? <div>icono</div> : null}
          <div>{commentText}</div>
        </div>
        <div className={`${style.bottom}`}>
          <div className={`${style.innerContent} flex-container`}>
            <div className='flex-container'>
              <div className={style.author}><span>Alumno:</span> {publisher}</div>
              <div className={style.date}>{created_at}</div>
            </div>
            {isMainComment ? (
              <div className={style.replyButton}>
                <ButtonApp labelID={reply === false ? 'page.academy.course.lesson.form.addReply.button' : 'page.academy.course.lesson.form.closeReply.button'} onClick={() => setReply(true)} type='button' buttonStyle='dark' size='small' />
              </div>) : null}
          </div>
          {reply ? (
            <Suspense>
              <CreateFormComment formCommentStyle={'minified'} />
            </Suspense>
          ) : null}
        </div>
      </Card>
    </div>
  )
}

export default SingleComment;