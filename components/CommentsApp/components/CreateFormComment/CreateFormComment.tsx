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
import { useSystem } from 'ui/hooks/system.hooks'
import { InfoApp } from 'domain/InfoApp/InfoApp'

interface CREATEFORMCOMMENTPROPS {
  onCreate: Function
  validationSchema: any
  loading: boolean,
  description?: string
  formCommentStyle?: 'default' | 'minified'
}

const CreateFormComment = ({ formCommentStyle, parent, onCreate, description }: any) => {
  const intl = useIntl()
  const {pushInfoApp} = useSystem()
  const userLoggued = useSelector(getUserLogged)
  const [loading, setloading] = useState(false)
  const {push, asPath} = useRouter()

  const _onCreate = async (comment: string) => {
    if(userLoggued?.uid === 'not-logged') {
      push({pathname: '/login' ,query: {redirect: asPath}})
    }
    setloading(true)
    const res: Comments | undefined = await CommentsImplInstance.createComments({
      comment: comment,
      created_at: new Date(),
      owner_role_level: userLoggued?.role.level,
      parent: {
        id: parent?.id,
        path: parent?.path
      },
      owner: userLoggued.uid,
      total_replys: 0
    })
    if(res){
      pushInfoApp(new InfoApp({code: 'message.item.created', message:'The item was deleted'}, 'success'));
    }
    
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
      description={description}
      validationSchema={validationSchema()}
      onCreate={(comment: string) => _onCreate(comment)}
    />
  )
}

const CreateFormCommentView = ({
  formCommentStyle = 'default',
  loading,
  onCreate,
  validationSchema,
  description
}: CREATEFORMCOMMENTPROPS) => {
  const [comment, setcomment] = useState('')

  return (
    <div className={`${style.createFormComment} ${style[formCommentStyle]}`}>
      {formCommentStyle === 'default' ? (
        <div className={style.textContent}>
          {/* <div className={style.mainTitle}>Preguntas:</div> */}
          <div>
            {description}
          </div>
        </div>
      ) : null}
      <FormApp
        validationSchema={validationSchema}
        initialValues={{ comment: comment}}
        onSubmit={(data: any) => {onCreate(data.comment); setcomment('')}}
      >
        <TextareaApp
          labelID={
            formCommentStyle === 'default'
              ? 'page.academy.lesson.form.addComment.placeholder'
              : 'page.academy.lesson.form.addReply.placeholder'
          }
          onChange={(key:any,value:any)=>setcomment(value)}
          value = {comment}
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
