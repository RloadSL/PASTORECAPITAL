import { CourseRepositoryInstance } from 'infrastructure/repositories/courses.repository'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import style from './CreateForm.module.scss'
import * as yup from 'yup'
import { FormattedMessage, useIntl } from 'react-intl'
import { AppDispatch } from 'ui/redux/store'
import FormApp from 'components/FormApp'
import InputApp from 'components/FormApp/components/InputApp'
import ButtonApp from 'components/ButtonApp'
import Modal from 'components/Modal'
import { useSystem } from 'ui/hooks/system.hooks'
import { ErrorApp } from 'domain/ErrorApp/ErrorApp'
import SelectApp from 'components/FormApp/components/SelectApp/SelectApp'
import fileIcon from '../../../../../../../assets/img/icons/analysis.svg'
import descriptionIcon from '../../../../../../../assets/img/icons/edit.svg'
import TextareaApp from 'components/FormApp/components/TextareaApp'



const courseDataTest: any = {
  title: 'Prueba de pagina de curso',
  excerpt: 'Esta es el comentario breve de la pagina'
}

const CreateForm = ({ onClose }: { onClose: Function }) => {
  const intl = useIntl()
  const dispatch = useDispatch<AppDispatch>()
  const { pushErrorsApp } = useSystem()
  const userLogged = useSelector(getUserLogged)

  const createCourses = async (data: any): Promise<any> => {
    if (userLogged.wpToken) {
      const response = await CourseRepositoryInstance.create(
        data,
        userLogged.wpToken
      )

      if (response instanceof ErrorApp) {
        pushErrorsApp(response)
      }
    } else {
      pushErrorsApp(
        new ErrorApp({
          errorCode: 'Unauthorized',
          errorMessage: 'Unauthorized'
        })
      )
    }
  }

  const validationSchema = useCallback(
    () =>
      yup.object({
        title: yup
          .string()
          .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
        excerpt: yup
          .string()
          .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
        level: yup
          .object()
          .nullable()
          .required(intl.formatMessage({ id: 'forms.errors.errorRequired' }))
      }),
    [intl]
  )

  return (
    <CreateFormView
      onClose={() => onClose()}
      validationSchema={validationSchema}
      createCourses={(data: any) => createCourses(data)}
    />
  )
}

const CreateFormView = ({
  createCourses,
  validationSchema,
  onClose = () => null
}: {
  createCourses: Function
  validationSchema: any
  onClose: Function
}) => {
  return (
    <Modal onBtnClose={() => onClose()}>
        <div className={style.cardContainer}>
          <div className={style.header}>
            <h3 className={style.formTitle}>
              <FormattedMessage id='page.academy.courses.create.title'></FormattedMessage>
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
              labelID='page.academy.courses.form.create.title'
              type='text'
              name='title'
              icon={fileIcon}
            />
            {/* <InputApp
              labelID='page.academy.courses.form.create.excerpt'
              type='text'
              name='excerpt'
              helper={'page.academy.courses.form.create.excerpt.helper'}
              icon={descriptionIcon}
            /> */}
            <TextareaApp
              labelID='page.academy.courses.form.create.excerpt'
              name='excerpt'
              helper={'page.academy.courses.form.create.excerpt.helper'}
              icon={descriptionIcon}
            />
            <SelectApp
              labelID='page.academy.courses.form.create.level'
              selectOptions={[
                { label: 'Basic', value: 'basic' },
                { label: 'Mediun', value: 'mediun' }
              ]}
              name='level'
              /* icon={password} */
            />
            <div style={{ marginTop: '20px' }}>
              <ButtonApp
                buttonStyle='secondary'
                type='submit'
                labelID='page.academy.courses.form.create.submit'
              />
            </div>
          </FormApp>
        </div>
    </Modal>
  )
}

export default CreateForm
