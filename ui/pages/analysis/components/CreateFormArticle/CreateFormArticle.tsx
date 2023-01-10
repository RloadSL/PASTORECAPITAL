/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import style from './CreateFormArticle.module.scss'
import * as yup from 'yup'
import { FormattedMessage, useIntl } from 'react-intl'
import { Formik, Field, Form } from 'formik'
import ButtonApp from 'components/ButtonApp'
import Modal from 'components/Modal'
import { useSystem } from 'ui/hooks/system.hooks'
import { ErrorApp } from 'domain/ErrorApp/ErrorApp'
import SelectApp from 'components/FormApp/components/SelectApp/SelectApp'
import { WP_EDIT_POST } from 'infrastructure/wordpress/config'
import fileIcon from '../../../../../assets/img/icons/analysis.svg'
import descriptionIcon from '../../../../../assets/img/icons/edit.svg'
import TextareaApp from 'components/FormApp/components/TextareaApp'
import Loading from 'components/Loading'
import { AppDispatch } from 'ui/redux/store'
import { AnalysisRepositoryInstance } from 'infrastructure/repositories/analysis.repository'
import { number } from 'yup/lib/locale'
import InputCheckApp from 'components/FormApp/components/InputCheckApp'
import { getCategoriesPlans } from 'infrastructure/wordpress/wp.utils'
import InputApp from 'components/FormApp/components/InputCheckApp/InputApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import TextareaFormikApp from 'components/FormApp/components/TextareaFormikApp '
import SelectFormikApp from 'components/FormApp/components/SelectFormikApp/SelectFormikApp'
import InputCheckFormikApp from 'components/FormApp/components/InputCheckFormikApp '
import { Post } from 'domain/Post/Post'
import LoadMoreLoading from 'components/LoadMoreLoading'

const CreateFormArticle = ({
  onClose,
  cat,
  post
}: {
  onClose: Function
  cat?: number,
  post?:Post
}) => {
  const intl = useIntl()
  const { pushErrorsApp } = useSystem()

  const userLogged = useSelector(getUserLogged)
  const [categories, setcategories] = useState([])
  const [categoriesPlans, setcategoriesPlans] = useState([])

  const [loading, setloading] = useState(false)
  useEffect(() => {
    let fetching = true
    getCategories()
      .then(res => {
        if (fetching) setcategories(res as any)
      })
      .catch(() => {
        alert('Error interno refrescar la página.')
        onClose()
      })

    getCategoriesPlansWP()
      .then(res => {
        if (fetching) setcategoriesPlans(res as any)
      })
      .catch(() => {
        alert('Error interno refrescar la página.')
        onClose()
      })
    return () => {
      fetching = false
    }
  }, [])

  const getCategories = async () => {
    const response = await AnalysisRepositoryInstance.getCategories()
    return response
  }

  const getCategoriesPlansWP = async () => {
    const response = await getCategoriesPlans()
    if (Array.isArray(response)) {
      return response.map(term => {
        return {
          value: term.term_id,
          label: term.name,
          key: term.slug
        }
      })
    } else {
      return []
    }
  }

  const createCourses = async (data: any): Promise<any> => {
    setloading(true)

    if (userLogged.wpToken) {
      const response = await AnalysisRepositoryInstance.createArticle(
        [data.category, ...data.activated_to_plans].map(item => parseInt(item)),
        userLogged.wpToken,
        {
          title: data.title,
          excerpt: data.excerpt,
          created_by: {
            username: userLogged.email,
            uid: userLogged.uid,
            name: `${userLogged.name} ${userLogged.lastname}`
          }
        }
      )

      if (response instanceof ErrorApp) {
        pushErrorsApp(response)
      } else if (response instanceof Post) {
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
          .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
        category: yup
          .number()
          .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
        activated_to_plans: yup
          .array()
          .of(yup.string())
          .min(1, intl.formatMessage({ id: 'forms.errors.errorRequired' }))
          .required(intl.formatMessage({ id: 'forms.errors.errorRequired' }))
      }),
    [intl]
  )

  return (
    <CreateFormView
      onClose={() => onClose()}
      categories={categories}
      categoriesPlans={categoriesPlans}
      validationSchema={validationSchema}
      loading={loading}
      cat={cat}
      createCourses={(data: any) => createCourses(data)}
    />
  )
}

const CreateFormView = ({
  createCourses,
  validationSchema,
  onClose = () => null,
  categories = [],
  categoriesPlans,
  loading,
  cat
}: {
  cat?: number
  createCourses: Function
  validationSchema: any
  onClose: Function
  loading: boolean
  categories: { value: string; label: string }[]
  categoriesPlans: { value: string; label: string; key: string }[]
}) => {
  const initialValues: {
    title: string,
    excerpt: string,
    category: any,
    activated_to_plans: string[]
  } = {
    title: '',
    excerpt: '',
    category: cat,
    activated_to_plans: []
  } 

  return (
    <Modal onBtnClose={() => onClose()}>
      <div className={style.cardContainer}>
        <div className={style.header}>
          <h3 className={style.formTitle}>
            <FormattedMessage id='page.analysis.articles.form.create.title'></FormattedMessage>
          </h3>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => createCourses(values)}
        >
          {({ values, errors, touched }) => (
            <Form>
              <InputFormikApp
                labelID='page.analysis.articles.form.create.title'
                type='text'
                name='title'
                icon={fileIcon}
              />
              <TextareaFormikApp
                labelID='page.analysis.articles.form.create.excerpt'
                name='excerpt'
                icon={fileIcon}
              />
              {!cat && (
                <SelectFormikApp
                  selectOptions={categories}
                  labelID={'page.analysis.articles.form.create.category'}
                  name={'category'}
                />
              )}
              {/* @maria Make component Checklist */}
              <div className='checklist'>
                <p>Seleccione el plan correspondiente</p>
                <div
                  role='group'
                  style={{ display: 'flex' }}
                  aria-labelledby='checkbox-group'
                >
                  {categoriesPlans.map(plan => (
                    <div key={plan.key}>
                      <InputCheckFormikApp
                        name={'activated_to_plans'}
                        labelID={`plan.${plan.label}`}
                        value={plan.value.toString()}
                        checked = {values.activated_to_plans?.includes(plan.value.toString())}
                      >
                        <FormattedMessage id={`plan.${plan.label}`} />
                      </InputCheckFormikApp>
                    </div>
                  ))}
                </div>
                {errors['activated_to_plans'] &&
                  touched['activated_to_plans'] && (
                    <p>{errors['activated_to_plans']}</p>
                  )}
                <div
                  style={{
                    marginTop: '20px',
                    maxWidth: '300px',
                    margin: 'auto'
                  }}
                >
                  <ButtonApp
                    buttonStyle='secondary'
                    type='submit'
                    labelID='page.analysis.articles.form.create.submit'
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Loading loading={loading} variant='inner-primary'></Loading>
    </Modal>
  )
}

export default CreateFormArticle
