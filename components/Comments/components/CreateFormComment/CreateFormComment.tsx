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
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import Loading from 'components/Loading'

interface CREATEFORMCOMMENTPROPS {
  onCreate: Function,
  validationSchema: any,
  loading:boolean
}

const CreateFormComment = ({}: any) => {
  const intl = useIntl()
  const router = useRouter()
  const userLoggued = useSelector(getUserLogged)
 const [loading, setloading] = useState(false)

  const _onCreate = async (comment: string) => {
    setloading(true);
    const res = await CommentsImplInstance.createComments({
      comment: comment,
      created_at: new Date(),
      parent: {
        id: router.query.lessonId?.toString(),
        path: 'lessons'
      },
      owner: userLoggued.uid,
      total_replays: 0
    })
    setloading(false);
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
    <CreateFormCommentView loading={loading} validationSchema={validationSchema()} onCreate={(comment: string) => _onCreate(comment)} />
  )
}

const CreateFormCommentView = ({onCreate, validationSchema, loading}: CREATEFORMCOMMENTPROPS) => {
  return (
    <div className={style.createFormComment}>
      <p className={style.mainTitle}>Pregunta al profesor @Maria traducir</p>
      <p>
        @Maria traducir Este es un espacio creado para que puedas resolver tus
        dudas con el prfesor y ver las dudas que han tenido otros alumnos como
        tu.
      </p>
      <FormApp initialValues={{comment: ''}} validationSchema={validationSchema} onSubmit={(data:any) => onCreate(data.comment)}>
        <TextareaApp
          labelID='Escribe un comentario @Maria traducir'
          maxLength={200}
          name={'comment'}
        />
        <div className={style.buttonContainer}>
          <div className={style.submitComment}>
            <ButtonApp
              labelID='btn.enviar'
              type='submit'
              buttonStyle='primary'
            />
          </div>
        </div>
      </FormApp>
      <Loading customBackdrop='rgba(244,244,246, .5)' variant='inner-secondary' loading={loading}></Loading>
    </div>
  )
}

export default CreateFormComment
