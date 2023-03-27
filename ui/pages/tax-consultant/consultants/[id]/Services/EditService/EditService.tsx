/* eslint-disable react-hooks/exhaustive-deps */
import style from './edit-service.module.scss'
import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import ButtonApp from 'components/ButtonApp'
import TextareaFormikApp from 'components/FormApp/components/TextareaFormikApp '
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import InputFileFormikApp from 'components/FormApp/components/InputFileFormikApp'
import InputListFormik from 'components/FormApp/components/InputListFormik/InputListFormik'
import serviceRepository from 'infrastructure/repositories/service.repository'
import { useRouter } from 'next/router'
import { ServiceDto } from 'infrastructure/dto/service.dto'
import Loading from 'components/Loading'
import LinkApp from 'components/LinkApp'
import arrowIcon from '../../../../../../../assets/img/icons/arrow-dark.svg'
import caseIcon from '../../../../../../../assets/img/icons/case-p.svg'
import coinsIcon from '../../../../../../../assets/img/icons/coins.svg'
import timeIcon from '../../../../../../../assets/img/icons/time.svg'




const EditService = () => {
  const intl = useIntl()
  const { query, push, replace } = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialValues, setInitialValues] = useState<any>({
    title: '',
    image: '',
    description: '',
    functions: [],
    time: '',
    price: '',
    keywords: '',
    form: ''
  })

  useEffect(() => {
    let fetch = true
    if (query.service_id) {
      serviceRepository
        .getService(query.service_id as string)
        .then(service => {
          if (fetch) {
            if (!service) {
              return replace(`/tax-consultant/consultants/${query.id}`)
            }
            setInitialValues({
              title: service.title,
              image: service.image?.url || undefined,
              description: service.description,
              functions: service.functions,
              time: service.time,
              price: service.price.replace('.', ','),
              keywords: service.keywords?.toString() || '',
              form: service.form?.url
            })
          }
        })
    }
  }, [])

  const _onSubmit = async (values: ServiceDto) => {
    setLoading(true)
    const price = values.price?.replace(',', '.')
    if(query.service_id){
      await serviceRepository.setService({
        ...values,
        price,
        id: query.service_id as string
      })
    }else{
      const newService = await serviceRepository.createService({
        ...values,
        userConsultantId: query.id as string,
        created_at: new Date()
      })
      push(`/tax-consultant/consultants/${query.id}/services/${newService}`)
    }
    
    setLoading(false)
  }

  const renderFormik = () => {
    const validationSchema = yup.object({
      title: yup
        .string()
        .required(intl.formatMessage({ id: 'page.login.errorRequired' })),
      price: yup
        .string()
        .matches(/^\d+([\.\,]\d{0,2})?$/, 'No es un numero válido')
        .nullable()
        .required(intl.formatMessage({ id: 'page.login.errorRequired' })),
      time: yup
        .number()
        .nullable()
        .required(intl.formatMessage({ id: 'page.login.errorRequired' })),
      functions: yup
        .array()
        .nullable()
        .of(
          yup
            .string()
            .required(intl.formatMessage({ id: 'page.login.errorRequired' }))
        ),
      description: yup
        .string()
        .nullable()
        .required(intl.formatMessage({ id: 'page.login.errorRequired' }))
    })
    return (
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={values => {
          _onSubmit(values)
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <InputFormikApp
              labelID='page.tax-consultant.create-service.form.title'
              type='text'
              name='title'
              icon={caseIcon}
            />
            <InputFileFormikApp
              labelID='page.tax-consultant.create-service.form.image'
              name='image'
              accept='image/*'
            />
            <small>El resumen del servicio mostrará solo los 200 primeros caracteres</small>
            <TextareaFormikApp
              labelID='page.tax-consultant.create-service.form.description'
              name='description'
            />

            <InputListFormik
              name='functions'
              labelID='page.tax-consultant.create-service.form.functions'
            />
            <div className={style.flexContainer}>
              <div className={style.flexContainerItem}>
                <InputFormikApp
                  labelID='page.tax-consultant.create-service.form.time'
                  type='text'
                  name='time'
                  icon={timeIcon}
                />
              </div>
              <div className={style.flexContainerItem}>
                <InputFormikApp
                  labelID='page.tax-consultant.create-service.form.price'
                  type='text'
                  name='price'
                  icon={coinsIcon}
                />
              </div>
            </div>
            <InputFormikApp
              labelID='page.tax-consultant.create-service.form.keywords'
              type='text'
              name='keywords'
            />
            <InputFileFormikApp
              labelID='page.tax-consultant.create-service.form.form'
              name='form'
              accept='.pdf'
              thumb={false}
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
    <div className={style.editService}>
      <div className={style.editServiceContainer}>
        <header>
          <LinkApp
            label='btn.back'
            linkHref={'#'}
            icon={arrowIcon}
            target={'_self'}
          />
        </header>
        <div>
          <p className='small-caps'>
            <FormattedMessage id='page.tax-consultant.create-service.title'></FormattedMessage>
          </p>
        </div>
        <div className={style.formContainer}>
          <div className={style.formBlock}>{renderFormik()}</div>
        </div>
      </div>
      <Loading loading={loading} variant='inner-primary' />
    </div>
  )
}

export default EditService
