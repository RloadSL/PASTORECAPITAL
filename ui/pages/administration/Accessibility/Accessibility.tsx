import { NextPage } from 'next'
import style from './accessibility.module.scss'
import { FormattedMessage, useIntl } from 'react-intl'
import { Field, Form, Formik } from 'formik'
import ButtonApp from 'components/ButtonApp'
import { useSystem } from 'ui/hooks/system.hooks'
import accesibilityService from 'infrastructure/services/accesibility.service'
import { InfoApp } from 'domain/InfoApp/InfoApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import systemRepository from 'infrastructure/repositories/system.repository'
import { useEffect, useState } from 'react'
import { PLANS } from 'infrastructure/dto/system_config.dto'
const Accessibility: NextPage = () => {
  const { pushInfoApp } = useSystem()
  const [plans, setPlans] = useState<any>()
  useEffect(() => {
    systemRepository.getPlans().then((plans: any) => setPlans(plans))
  }, [])

  const onSave = async (values: any) => {
    await accesibilityService.updatePermissions(JSON.parse(values))
    pushInfoApp(
      new InfoApp(
        { code: 'permissions.updated', message: 'permissions.updated' },
        'success'
      )
    )
  }

  const onSavePrice = async (prices: any) => {
    await systemRepository.updatePlansSubscriptionPrice(prices)
    pushInfoApp(
      new InfoApp(
        { code: 'price.updated', message: 'price.updated' },
        'success'
      )
    )
  }
  const intl = useIntl()

  const renderPrices = () => {
    return (
      <>
        <Formik
          initialValues={{
            basic_price_month: plans.basic.price.month,
            basic_price_year: plans.basic.price.year,

            plus_price_month: plans.plus.price.month,
            plus_price_year: plans.plus.price.year,

            premium_price_month: plans.premium.price.month,
            premium_price_year: plans.premium.price.year
          }}
          onSubmit={async (values: any) => {
            const prices = {
              basic: {
                price: {
                  month: values.basic_price_month,
                  year: values.basic_price_year
                }
              },
              plus: {
                price: {
                  month: values.plus_price_month,
                  year: values.plus_price_year
                }
              },
              premium: {
                price: {
                  month: values.premium_price_month,
                  year: values.premium_price_year
                }
              }
            }
            onSavePrice(prices)
          }}
        >
          {values => (
            <Form>
              <h2>Precios para los planes de subscripción</h2>
              <div className={style.pricePlans_item}>
                <p>Basic</p>
                <div className={style.pricePlans_item_flex}>
                  <InputFormikApp
                    type='number'
                    name={'basic_price_month'}
                    labelID={'price.month'}
                  />
                  <InputFormikApp
                    type='number'
                    name={'basic_price_year'}
                    labelID={'price.year'}
                  />
                </div>
              </div>
              <div className={style.pricePlans_item}>
                <p>Plus</p>
                <div className={style.pricePlans_item_flex}>
                  <InputFormikApp
                    type='number'
                    name={'plus_price_month'}
                    labelID={'price.month'}
                  />
                  <InputFormikApp
                    type='number'
                    name={'plus_price_year'}
                    labelID={'price.year'}
                  />
                </div>
              </div>
              <div className={style.pricePlans_item}>
                <p>Premium</p>
                <div className={style.pricePlans_item_flex}>

                <InputFormikApp
                  type='number'
                  name={'premium_price_month'}
                  labelID={'price.month'}
                />
                <InputFormikApp
                  type='number'
                  name={'premium_price_year'}
                  labelID={'price.year'}
                />
                </div>
              </div>
              <div className={style.btnContainer}>
                <ButtonApp
                  buttonStyle={'primary'}
                  type='submit'
                  labelID='Guardar'
                />
              </div>
            </Form>
          )}
        </Formik>
      </>
    )
  }

  return (
    <div className={style.configuration}>
      <header>
        <h1 className='main-title'>Visibilidad del contenido</h1>
        <p>Desde aquí puedes gestionar qué tipo de planes ven cada contenido</p>
      </header>

      <div className={style.tableConfig}>
        <div className={style.colum}>
          <div className={style.label}>Secciones</div>
          {accesibilityService.modules.map(m => (
            <div className={style.sections} key={m}>
              <FormattedMessage id={m} />
            </div>
          ))}
        </div>
        <Formik
          initialValues={{
            guest: accesibilityService.guest,
            basic: accesibilityService.basic,
            plus: accesibilityService.plus,
            premium: accesibilityService.premium
          }}
          onSubmit={async values => {
            onSave(JSON.stringify(values, null, 2))
          }}
        >
          {({ values }) => (
            <Form className={style.formContainer}>
              <div className={style.tableConfig}>
                <div className={style.colum}>
                  <div className={style.label}>Guest</div>
                  {accesibilityService.modules.map(m => (
                    <div key={'guest' + m}>
                      <Field name={'guest'} value={m} type='checkbox' />
                    </div>
                  ))}
                </div>

                <div className={style.colum}>
                  <div className={style.label}>Basic</div>
                  {accesibilityService.modules.map(m => (
                    <div key={'basic' + m}>
                      <Field name={'basic'} value={m} type='checkbox' />
                    </div>
                  ))}
                </div>

                <div className={style.colum}>
                  <div className={style.label}>Plus</div>
                  {accesibilityService.modules.map(m => (
                    <div key={'plus' + m}>
                      <Field name={'plus'} value={m} type='checkbox' />
                    </div>
                  ))}
                </div>

                <div className={style.colum}>
                  <div className={style.label}>Premium</div>
                  {accesibilityService.modules.map(m => (
                    <div key={'premium' + m}>
                      <Field name={'premium'} value={m} type='checkbox' />
                    </div>
                  ))}
                </div>
              </div>
              <div className={style.btnContainer}>
                <ButtonApp
                  buttonStyle={'primary'}
                  type='submit'
                  labelID='Guardar'
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className={style.pricePlans}>
        {plans && renderPrices()}
      </div>
    </div>
  )
}

export default Accessibility
