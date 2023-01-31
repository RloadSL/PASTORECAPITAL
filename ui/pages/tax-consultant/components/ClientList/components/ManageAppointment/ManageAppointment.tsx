import ButtonApp from 'components/ButtonApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import TextareaFormikApp from 'components/FormApp/components/TextareaFormikApp '
import Modal from 'components/Modal'
import { Form, Formik } from 'formik'
import { FormattedMessage } from 'react-intl'
import style from './manage-appointment.module.scss'


interface ManageAppointmentProps {
  children?: any
}

/**
 * Compoennte para renderizar el modal de gestionar cita
 * @returns 
 */

const ManageAppointment = ({ children }: ManageAppointmentProps) => {
  return <ManageAppointmentView></ManageAppointmentView>
}

const ManageAppointmentView = ({ children }: ManageAppointmentProps) => {

  // const validationSchema = useCallback(
  //   () =>
  //     yup.object({
  //       title: yup
  //         .string()
  //         .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
  //       excerpt: yup
  //         .string()
  //         .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
  //       category: yup
  //         .number()
  //         .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
  //       activated_to_plans: yup
  //         .array()
  //         .of(yup.string())
  //         .min(1, intl.formatMessage({ id: 'forms.errors.errorRequired' }))
  //         .required(intl.formatMessage({ id: 'forms.errors.errorRequired' }))
  //     }),
  //   [intl]
  // )

  const initialValues: {
    title: string,
    excerpt: string,
  } = {
    title: '',
    excerpt: '',
  }

  return (
    <Modal onBtnClose={() => console.log('cancel')}>
      <div className={style.cardContainer}>
        <div className={style.content}>
          <div className={style.header}>
            <h3 className={style.formTitle}>
              <FormattedMessage id={'page.tax-consultant.manageAppointment.form.title'} />
            </h3>
            <div>
              <p>
                <span>
                  <FormattedMessage id={'page.tax-consultant.manageAppointment.client.label'} />:
                </span>
                <span className={style.spanValue}>
                  nombre del cliente
                </span>
              </p>
              <p>
                <span>
                  <FormattedMessage id={'page.tax-consultant.manageAppointment.service.label'} />:
                </span>
                <span className={style.spanValue}>
                  nombre del servicio
                </span>
              </p>
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={'validationSchema'}
            onSubmit={values => console.log('crear')}
          >
            <Form>
              <InputFormikApp
                labelID='page.tax-consultant.manageAppointment.calendly.label'
                type='text'
                name='title'
              />
              <TextareaFormikApp
                labelID='page.tax-consultant.manageAppointment.message.label'
                name='message'
              />
              <div className={style.buttonContainer}>
                <ButtonApp
                  labelID='btn.send'
                  onClick={() => console.log('ok')}
                  buttonStyle='primary'
                />
              </div>

            </Form>
          </Formik>
        </div>
      </div>
      {/* <Loading loading={loading}></Loading> */}
    </Modal>
  )
}

export default ManageAppointment;