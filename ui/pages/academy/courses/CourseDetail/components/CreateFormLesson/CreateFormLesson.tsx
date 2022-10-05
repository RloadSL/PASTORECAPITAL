/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import style from './CreateFormLesson.module.scss'
import * as yup from 'yup'
import { FormattedMessage, useIntl } from 'react-intl'
import FormApp from 'components/FormApp'
import InputApp from 'components/FormApp/components/InputApp'
import ButtonApp from 'components/ButtonApp'
import Modal from 'components/Modal'
import { useSystem } from 'ui/hooks/system.hooks'
import { ErrorApp } from 'domain/ErrorApp/ErrorApp'
import { WP_EDIT_POST } from 'infrastructure/wordpress/config'
import fileIcon from '../../../../../../../assets/img/icons/analysis.svg'
import descriptionIcon from '../../../../../../../assets/img/icons/edit.svg'
import TextareaApp from 'components/FormApp/components/TextareaApp'
import Loading from 'components/Loading'
import { AppDispatch } from 'ui/redux/store'
import { addPrivateCourse } from 'ui/redux/slices/academy/academy.slice'
import { LessonRepositoryInstance } from 'infrastructure/repositories/lessons.repository'

const CreateFormLesson = ({ onClose, courseCat }: { onClose: Function, courseCat:number }) => {
  const dispatch = useDispatch<AppDispatch>()
  const intl = useIntl()
  const { pushErrorsApp } = useSystem()

  const userLogged = useSelector(getUserLogged)
  const [loading, setloading] = useState(false)

  const createLesson = async (data: any): Promise<any> => {
    setloading(true)
    console.log(courseCat)
    if (userLogged.wpToken && courseCat) {
      const response:any = await LessonRepositoryInstance.create(
        {
          ...data,
          courseCat,
          created_by: { username: userLogged.email, uid: userLogged.uid }
        },
        userLogged.wpToken
      )

      if (response instanceof ErrorApp) {
        pushErrorsApp(response)
      } else {
        window.open(
          `${WP_EDIT_POST}?post=${response.id}&action=edit&?&token=${userLogged.wpToken}`
        )
        onClose()
      }
    } else {
      pushErrorsApp(
        new ErrorApp({
          errorCode: 'Unauthorized',
          errorMessage: 'Unauthorized'
        })
      )
    }

    setloading(false)
  }

  const validationSchema = useCallback(
    () =>
      yup.object({
        title: yup
          .string()
          .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
        excerpt: yup
          .string()
          .required(intl.formatMessage({ id: 'forms.errors.errorRequired' }))
      }),
    [intl]
  )

  return (
    <CreateFormView
      onClose={() => onClose()}
      validationSchema={validationSchema}
      loading={loading}
      createLesson={(data: any) => createLesson(data)}
    />
  )
}

const CreateFormView = ({
  createLesson,
  validationSchema,
  onClose = () => null,

  loading
}: {
  createLesson: Function
  validationSchema: any
  onClose: Function
  loading: boolean
}) => {
  return (
    <Modal onBtnClose={() => onClose()}>
      <div className={style.cardContainer}>
        <div className={style.header}>
          <h3 className={style.formTitle}>
            <FormattedMessage id='page.academy.course.lesson.form.create.title'></FormattedMessage>
          </h3>
        </div>
        <FormApp
          validationSchema={validationSchema}
          initialValues={{
            title: '',
            excerpt: ''
          }}
          onSubmit={(values: any) => createLesson(values)}
        >
          <InputApp
            labelID='page.academy.course.lesson.form.create.title'
            type='text'
            name='title'
            icon={fileIcon}
          />
          <TextareaApp
            labelID='page.academy.course.lesson.form.create.excerpt'
            name='excerpt'
            helper={'page.academy.course.lesson.form.create.excerpt.helper'}
            icon={descriptionIcon}
          />

          <div style={{ marginTop: '20px' }}>
            <ButtonApp
              buttonStyle='secondary'
              type='submit'
              labelID='page.academy.course.lesson.form.create.submit'
            />
          </div>
        </FormApp>
      </div>
      <Loading loading={loading} variant='inner-primary'></Loading>
    </Modal>
  )
}

export default CreateFormLesson
