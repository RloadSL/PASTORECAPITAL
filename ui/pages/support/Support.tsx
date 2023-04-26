import ButtonApp from 'components/ButtonApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import TextareaFormikApp from 'components/FormApp/components/TextareaFormikApp '
import { Form, Formik } from 'formik'
import { NextPage } from 'next'
import React, { useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import style from './support.module.scss'
import * as yup from 'yup'
import Loading from 'components/Loading'
import systemRepository from 'infrastructure/repositories/system.repository'
import { setLoading } from 'ui/redux/slices/system/system.slice'

const Support: NextPage = () => {
  const intl = useIntl()
  const [state, setState] = useState('init')

  const validation = useRef(
    yup.object().shape({
      name: yup
        .string()
        .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
      email: yup
        .string()
        .email(intl.formatMessage({ id: 'forms.errors.incorrectEmail' }))
        .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
      mesagge: yup
        .string()
        .required(intl.formatMessage({ id: 'forms.errors.errorRequired' }))
    })
  ).current

  const onSubmit = async (data: any) => {
    try {
      setState('loading')
      const res = await systemRepository.sendContactForm(data)
      setState('sent')
    } catch (error) {
      console.log(error)
    }
   
   
  }

  const initialValues: {
    name: string
    email: string
    mesagge: string
  } = {
    name: '',
    email: '',
    mesagge: ''
  }
  return (
    <div className={style.support}>
      <header>
        <div className={style.info}>
          <h1 className={`${style.topTitle} main-title`}>
            <FormattedMessage id='page.support.title' />
          </h1>
          <p>
            <FormattedMessage id='page.support.text' />
          </p>
        </div>
      </header>
      <div className={style.maxContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, status }) => (
            <Form>
              <InputFormikApp labelID='Nombre' type='text' name='name' />
              <InputFormikApp labelID='Email' type='email' name='email' />
              <TextareaFormikApp
                labelID='Describe qué problema tienes'
                name='mesagge'
              />
              {state == 'sent' && (
                  <p>
                    <FormattedMessage id={'sent.contact'} />
                  </p>
                )}
              <div className={style.buttonContainer}>
                {state != 'loading' && (
                  <ButtonApp
                    buttonStyle='secondary'
                    type='submit'
                    labelID='btn.send'
                  />
                )}
                {state == 'loading' && (
                  <Loading variant='inner-primary' loading />
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Support
