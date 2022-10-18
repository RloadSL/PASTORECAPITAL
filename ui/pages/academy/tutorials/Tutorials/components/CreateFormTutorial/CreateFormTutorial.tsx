/* eslint-disable react-hooks/exhaustive-deps */
import { CourseRepositoryInstance } from 'infrastructure/repositories/courses.repository'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import style from './CreateFormTutorial.module.scss'
import * as yup from 'yup'
import { FormattedMessage, useIntl } from 'react-intl'
import FormApp from 'components/FormApp'
import InputApp from 'components/FormApp/components/InputApp'
import ButtonApp from 'components/ButtonApp'
import Modal from 'components/Modal'
import { useSystem } from 'ui/hooks/system.hooks'
import { ErrorApp } from 'domain/ErrorApp/ErrorApp'
import SelectApp from 'components/FormApp/components/SelectApp/SelectApp'
import { WP_EDIT_POST } from 'infrastructure/wordpress/config'
import fileIcon from '../../../../../../../assets/img/icons/analysis.svg'
import descriptionIcon from '../../../../../../../assets/img/icons/edit.svg'
import TextareaApp from 'components/FormApp/components/TextareaApp'
import Loading from 'components/Loading'
import { AppDispatch } from 'ui/redux/store'
import { TutorialRepositoryInstance } from 'infrastructure/repositories/tutorials.repository'
import { Post } from 'domain/Post/Post'


const CreateFormTutorial = ({ onClose }: { onClose: Function }) => {
  const dispatch = useDispatch<AppDispatch>()
  const intl = useIntl()
  const { pushErrorsApp } = useSystem()
  
  const userLogged = useSelector(getUserLogged)
  const [levels, setlevels] = useState([])
  const [loading, setloading] = useState(false)
  useEffect(() => {
    let fetching = true
    getLevels()
      .then(res => {
        if (fetching) setlevels(res as any)
      })
      .catch(() => {
        alert('Error interno refrescar la página.')
        onClose()
      })
    return () => {
      fetching = false
    }
  }, [])

  const getLevels = async () => {
    const response = await CourseRepositoryInstance.readLevelsCategoriesFromWp()
    return response
  }

  const createCourses = async (data: any): Promise<any> => {
    setloading(true)
    if (userLogged.wpToken) {
      const response = await TutorialRepositoryInstance.create(
        {
          ...data,
          created_by: { username: userLogged.email, uid: userLogged.uid }
        },
        userLogged.wpToken
      )

      if (response instanceof ErrorApp) {
        pushErrorsApp(response)
      } else {
        const post = response as Post 
        window.open(
          `${WP_EDIT_POST}?post=${post.id}&action=edit&?&token=${userLogged.wpToken}`
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
      levels={levels}
      validationSchema={validationSchema}
      loading={loading}
      createCourses={(data: any) => createCourses(data)}
    />
  )
}

const CreateFormView = ({
  createCourses,
  validationSchema,
  onClose = () => null,
  levels = [],
  loading
}: {
  createCourses: Function
  validationSchema: any
  onClose: Function
  loading: boolean
  levels: { value: string; label: string }[]
}) => {
  return (
    <Modal onBtnClose={() => onClose()}>
        <div className={style.cardContainer}>
          <div className={style.header}>
            <h3 className={style.formTitle}>
              <FormattedMessage id='page.academy.tutorials.form.create.title'></FormattedMessage>
            </h3>
          </div>
          <FormApp
            validationSchema={validationSchema}
            initialValues={{
              title: '',
              excerpt: '',
              level: null
            }}
            onSubmit={(values: any) => createCourses(values)}
          >
            <InputApp
              labelID='page.academy.tutorials.form.create.title'
              type='text'
              name='title'
              icon={fileIcon}
            />
            <TextareaApp
              labelID='page.academy.tutorials.form.create.excerpt'
              name='excerpt'
              helper={'page.academy.tutorials.form.create.excerpt.helper'}
              icon={descriptionIcon}
            />
           
            <div style={{ marginTop: '20px', maxWidth: '300px', margin:'auto' }}>
              <ButtonApp
                buttonStyle='secondary'
                type='submit'
                labelID='page.academy.courses.form.create.submit'
              />
            </div>
          </FormApp>
        </div>
      <Loading loading={loading} variant='inner-primary'></Loading>
    </Modal>
  )
}

export default CreateFormTutorial
