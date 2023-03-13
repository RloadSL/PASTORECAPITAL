import { NextPage } from 'next'
import style from './accessibility.module.scss'
import { FormattedMessage, useIntl } from 'react-intl'
import { Field, Form, Formik } from 'formik'
import ButtonApp from 'components/ButtonApp'
import { useSystem } from 'ui/hooks/system.hooks'
import accesibilityService from 'infrastructure/services/accesibility.service'
import { InfoApp } from 'domain/InfoApp/InfoApp'
const Accessibility: NextPage = () => {
  const {pushInfoApp} = useSystem()
  const onSave = async (values:any) => {
    await accesibilityService.updatePermissions(JSON.parse(values));
    pushInfoApp(new InfoApp({code: 'permissions.updated', message:'permissions.updated'}, 'success'))
  }
  const intl = useIntl()
  return (
    <div>
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
            <Form>
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
              <div>
                <ButtonApp type='submit'>Submit</ButtonApp>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Accessibility
