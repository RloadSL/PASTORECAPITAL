import ButtonApp from 'components/ButtonApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import TextareaFormikApp from 'components/FormApp/components/TextareaFormikApp '
import Modal from 'components/Modal'
import { Form, Formik } from 'formik'
import { useCallback, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import style from './manage-appointment.module.scss'
import * as yup from 'yup'
import { User } from 'domain/User/User'
import notificationRepository from 'infrastructure/repositories/notification.repository'
import { NotificationDto } from 'infrastructure/dto/notification.dto'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { useSystem } from 'ui/hooks/system.hooks'
import Loading from 'components/Loading'
import { useConsultant } from 'ui/hooks/consultant.hook'
import { UserConsultant } from 'domain/UserConsultant/UserConsultant'
import { InfoApp } from 'domain/InfoApp/InfoApp'

interface ManageAppointmentProps {
  children?: any
  client: {
    serviceTitle: string
    service_id: string
    user: User
  }
  onClose: Function,
  onSubmit: Function
}

/**
 * Compoennte para renderizar el modal de gestionar cita
 * @returns
 */

const ManageAppointment = ({
  children,
  client,
  onClose,
  onSubmit
}: ManageAppointmentProps) => {
  const {pushInfoApp} = useSystem()
  const  [loading, setloading] = useState(false)
  const {consultant} = useConsultant()
  const intl = useIntl()
  const userLogged = useSelector(getUserLogged)
  const validationSchema = useRef(
    yup.object({
      calendly: yup
        .string()
        .matches(/(https:\/\/calendly\.com)/,intl.formatMessage({ id:  'forms.errors.calendlylink'}))
        .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
      message: yup
        .string()
        .required(intl.formatMessage({ id: 'forms.errors.errorRequired' }))
    })
  ).current

  const initialValues: {
    calendly: string
    message: string
  } = {
    calendly: (consultant as UserConsultant)?.calendly || '',
    message: ''
  }

  const _handleSubmit = async (values: {calendly:string, message: string})=> {
    const data:NotificationDto = {
      created_at: new Date(),
      metadata: {
        service: client.serviceTitle,
        service_id: client.service_id
      },
      from: {
        fullname: `${userLogged.name} ${userLogged.lastname}`,
        email: userLogged.email,
        uid: userLogged.uid
      },
      to: {
        fullname: `${client.user.name} ${client.user.lastname}`,
        email: client.user.email,
        uid: client.user.uid
      },
      ...values,
      type: 'CONSULTANT_MANAGE_USER'
    }
    setloading(true)
    await notificationRepository.create(data)
    pushInfoApp(new InfoApp({code: 'message.sended', message: 'message.sended'}, 'success'))
    onSubmit(client)
    setloading(false)
  }

  return (
    <Modal onBtnClose={() => onClose()}>
      <div className={style.cardContainer}>
        <div className={style.content}>
          <div className={style.header}>
            <h3 className={style.formTitle}>
              <FormattedMessage
                id={'page.tax-consultant.manageAppointment.form.title'}
              />
            </h3>
            <div>
              <p>
                <span>
                  <FormattedMessage
                    id={'page.tax-consultant.manageAppointment.client.label'}
                  />
                  :
                </span>
                <span className={style.spanValue}>
                  {`${client.user.name} ${client.user.lastname}`}
                </span>
              </p>
              <p>
                <span>
                  <FormattedMessage
                    id={'page.tax-consultant.manageAppointment.service.label'}
                  />
                  :
                </span>
                <span className={style.spanValue}>{client.serviceTitle}</span>
              </p>
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={_handleSubmit}
          >
            <Form>
              <InputFormikApp
                labelID='page.tax-consultant.manageAppointment.calendly.label'
                type='text'
                name='calendly'
              />
              <TextareaFormikApp
                labelID='page.tax-consultant.manageAppointment.message.label'
                name='message'
              />
              <div className={style.buttonContainer}>
                <ButtonApp
                  labelID='btn.send'
                  type='submit'
                  buttonStyle='primary'
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <Loading loading={loading}></Loading>
    </Modal>
  )
}

export default ManageAppointment
