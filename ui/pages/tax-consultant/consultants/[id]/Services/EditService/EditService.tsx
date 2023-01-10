import style from './edit-service.module.scss'

import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import ButtonApp from 'components/ButtonApp'
import TextareaFormikApp from 'components/FormApp/components/TextareaFormikApp '
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import InputFileFormikApp from 'components/FormApp/components/InputFileFormikApp/InputFileFormikApp'
const EditService = () => {
  const intl = useIntl()
  const [initialValues, setInitialValues] = useState<any>({
    country: undefined,
    description: '',
    keywords: '',
    linkedin: ''
  })

  const renderFormik = () => {
    const validationSchema = yup.object({
      keywords: yup
        .string()
        .required(intl.formatMessage({ id: 'page.login.errorRequired' })),
      country: yup
        .string()
        .required(intl.formatMessage({ id: 'page.login.errorRequired' })),
      description: yup
        .string()
        .required(intl.formatMessage({ id: 'page.login.errorRequired' }))
    })

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={values => {
         console.log(values)
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <InputFormikApp
              labelID='page.tax-consultant.create-service.form.title'
              type='text'
              name='keywords'
            />
            <InputFileFormikApp 
               labelID='page.tax-consultant.create-service.form.image'
               name='image'
          
            />

            <TextareaFormikApp
              labelID='page.tax-consultant.create-service.form.description'
              name='description'
            />

            <InputFormikApp
              labelID='page.tax-consultant.create-service.form.functions'
              type='text'
              name='linkedin'
            />
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
                labelID='btn.accept'
              />
            </div>
          </Form>
        )}
      </Formik>
    )
  }

  return (
    <div className={style.createService}>
      <div>
        <p className='small-caps'>
          <FormattedMessage id='page.tax-consultant.create-service.title'></FormattedMessage>
        </p>
      </div>
      <div className={style.formContainer}>
       <div className={style.formBlock}>{renderFormik()}</div>
      </div>
    </div>
  )
}

export default EditService
