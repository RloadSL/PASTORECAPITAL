/* eslint-disable react-hooks/exhaustive-deps */
import ButtonApp from 'components/ButtonApp'
import FormApp from 'components/FormApp'
import TextareaApp from 'components/FormApp/components/TextareaApp'
import { CommentsImplInstance } from 'infrastructure/repositories/comments.repository'
import { useCallback, useState } from 'react'
import style from './CreateFormComment.module.scss'
import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import Loading from 'components/Loading'
import { Comments } from 'domain/Comments/comments'
import { AppDispatch } from 'ui/redux/store'

interface CREATEFORMCOMMENTPROPS {
  onCreate: Function
  validationSchema: any
  loading: boolean
  formCommentStyle?: 'default' | 'minified'
}

const CreateFormComment = ({ formCommentStyle, parent, onCreate }: any) => {
  const intl = useIntl()
  const router = useRouter()
  const userLoggued = useSelector(getUserLogged)
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()


  const _onCreate = async (comment: string) => {
    setloading(true)
    const res: Comments | undefined = await CommentsImplInstance.createComments({
      comment: comment,
      created_at: new Date(),
      parent: {
        id: parent?.id || router.query.lessonId?.toString(),
        path: parent?.path || 'lessons'
      },
      owner: userLoggued.uid,
      total_replys: 0
    })
    if (onCreate) onCreate(res)
    setloading(false)
  }

  const validationSchema = useCallback(
    () =>
      yup.object({
        comment: yup
          .string()
          .required(intl.formatMessage({ id: 'page.login.errorRequired' }))
      }),
    []
  )

  return (
    <CreateFormCommentView
      formCommentStyle={formCommentStyle}
      loading={loading}
      validationSchema={validationSchema()}
      onCreate={(comment: string) => _onCreate(comment)}
    />
  )
}

const CreateFormCommentView = ({
  formCommentStyle = 'default',
  loading,
  onCreate,
  validationSchema
}: CREATEFORMCOMMENTPROPS) => {
  return (
    <div className={`${style.createFormComment} ${style[formCommentStyle]}`}>
      {formCommentStyle === 'default' ? (
        <div className={style.textContent}>
          <p className={style.mainTitle}>Pregunta al profesor</p>
          <p>
            Este es un espacio creado para que puedas resolver tus dudas con el
            prfesor y ver las dudas que han tenido otros alumnos como tu.
          </p>
        </div>
      ) : null}
      <FormApp
        validationSchema={validationSchema}
        initialValues={{ comment: '' }}
        onSubmit={(data: any) => onCreate(data.comment)}
      >
        <TextareaApp
          labelID={
            formCommentStyle === 'default'
              ? 'page.academy.lesson.form.addComment.placeholder'
              : 'page.academy.lesson.form.addReply.placeholder'
          }
          onChange={() => console.log('envío change')}
          maxLength={800}
          name="comment"
        />
        <div className={style.buttonContainer}>
          <div className={style.submitComment}>
            <ButtonApp
              labelID='btn.send'
              type='submit'
              buttonStyle='primary'
              size={formCommentStyle === 'minified' ? 'small' : 'default'}
            />
          </div>
        </div>
      </FormApp>
      <Loading loading={loading} customBackdrop='rgba(244,244,246,.7)'></Loading>
    </div>
  )
}

export default CreateFormComment
