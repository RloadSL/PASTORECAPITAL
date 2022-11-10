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
import InputCheckFormikApp from 'components/FormApp/components/InputCheckFormikApp '
import { getCategories, getCategory } from 'infrastructure/wordpress/wp.utils'
import { WP_TERM } from 'infrastructure/dto/wp.dto'

const CreateCategoryAnalysis = ({ onClose, cat}: { onClose: Function, cat?:number }) => {
  const intl = useIntl()
  const { pushErrorsApp } = useSystem()

  const userLogged = useSelector(getUserLogged)

  const [loading, setloading] = useState(false)
  const [category, setcategory] = useState(undefined)

  useEffect(() => {
   if(cat){
    setloading(true);
    getCategory(cat).then(res => {
      setcategory(res)
      setloading(false)
    })
   } 
  }, [cat])
  

  const _createCat = async (data: any): Promise<any> => {
   
    setloading(true)
    if (userLogged.wpToken) {
      const response = await AnalysisRepositoryInstance.setCategory(
        userLogged.wpToken,
        {
          ...data,
          created_by: {
            username: userLogged.email,
            uid: userLogged.uid,
            name: `${userLogged.name} ${userLogged.lastname}  `
          }
        },
        cat
      )

      if (response instanceof ErrorApp) {
        pushErrorsApp(response)
      } else {
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
          .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
        collapsable_items: yup.boolean().default(false)
      }),
    [intl]
  )

  return (
    <CreateCategoryAnalysisView
      onClose={() => onClose()}
      validationSchema={validationSchema}
      loading={loading}
      createCat={(data: any) => _createCat(data)}
      cat={category}
    />
  )
}

const CreateCategoryAnalysisView = ({
  createCat,
  validationSchema,
  onClose = () => null,
  loading,
  cat
}: {
  createCat: Function
  validationSchema: any
  onClose: Function
  loading: boolean
  cat?:any
}) => {
  console.log(cat)
  return (
    <Modal onBtnClose={() => onClose()}>
      <div className={style.cardContainer}>
        <div className={style.header}>
          <h3 className={style.formTitle}>
            <FormattedMessage id={`page.analysis.category.form.${cat ? 'update' : 'create'}.title`}></FormattedMessage>
          </h3>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            name: cat?.name,
            description: cat?.description,
            collapsable_items: cat?.collapsable_items === "1" && true,
          }}
          validationSchema={validationSchema}
          onSubmit={values => createCat(values)}
        >
          {({ values, errors, touched }) => {
            
            return (
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
                <InputCheckFormikApp name='collapsable_items'>
                  Items de la categoria en formato desplegable
                </InputCheckFormikApp>
                <ButtonApp
                  buttonStyle='secondary'
                  type='submit'
                  labelID='page.analysis.articles.form.create.submit'
                />
              </Form>
            )
          }}
        </Formik>
      </div>
      <Loading loading={loading} variant='inner-primary'></Loading>
    </Modal>
  )
}

export default CreateCategoryAnalysis
