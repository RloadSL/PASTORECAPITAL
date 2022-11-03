/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import style from './CreateCategoryAnalysis.module.scss'
import * as yup from 'yup'
import { FormattedMessage, useIntl } from 'react-intl'
import { Formik, Field, Form } from 'formik'
import ButtonApp from 'components/ButtonApp'
import Modal from 'components/Modal'
import { useSystem } from 'ui/hooks/system.hooks'
import { ErrorApp } from 'domain/ErrorApp/ErrorApp'
import fileIcon from '../../../../../assets/img/icons/analysis.svg'
import Loading from 'components/Loading'
import { AnalysisRepositoryInstance } from 'infrastructure/repositories/analysis.repository'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import TextareaFormikApp from 'components/FormApp/components/TextareaFormikApp '

import { Post } from 'domain/Post/Post'

const CreateCategoryAnalysis = ({ onClose }: { onClose: Function }) => {
  const intl = useIntl()
  const { pushErrorsApp } = useSystem()

  const userLogged = useSelector(getUserLogged)

  const [loading, setloading] = useState(false)

  const _createCat = async (data: any): Promise<any> => {
    setloading(true)
    console.log(111,data)
    if (userLogged.wpToken) {
      const response = await AnalysisRepositoryInstance.createCategory(
        userLogged.wpToken,
        data
      )

      if (response instanceof ErrorApp) {
        pushErrorsApp(response)
      } else{
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
        name: yup
          .string()
          .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
        description: yup
          .string()
          .required(intl.formatMessage({ id: 'forms.errors.errorRequired' }))
      }),
    [intl]
  )

  return (
    <CreateCategoryAnalysisView
      onClose={() => onClose()}
      validationSchema={validationSchema}
      loading={loading}
      createCat={(data: any) => _createCat(data)}
    />
  )
}

const CreateCategoryAnalysisView = ({
  createCat,
  validationSchema,
  onClose = () => null,
  loading
}: {
  createCat: Function
  validationSchema: any
  onClose: Function
  loading: boolean
}) => {
  return (
    <Modal onBtnClose={() => onClose()}>
      <div className={style.cardContainer}>
        <div className={style.header}>
          <h3 className={style.formTitle}>
            <FormattedMessage id='page.analysis.category.form.create.title'></FormattedMessage>
          </h3>
        </div>
        <Formik
          initialValues={{
            name: '',
            description: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => createCat(values)}
        >
          {({ values, errors, touched }) => (
            <Form>
              <InputFormikApp
                labelID='page.analysis.category.form.create.name'
                type='text'
                name='name'
                icon={fileIcon}
              />
              <TextareaFormikApp
                labelID='page.analysis.category.form.create.description'
                name='description'
                icon={fileIcon}
              />
              <ButtonApp
                buttonStyle='secondary'
                type='submit'
                labelID='page.analysis.articles.form.create.submit'
              />
            </Form>
          )}
        </Formik>
      </div>
      <Loading loading={loading} variant='inner-primary'></Loading>
    </Modal>
  )
}

export default CreateCategoryAnalysis
