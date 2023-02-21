import ButtonApp from 'components/ButtonApp'
import AsyncAutocompleteFormikApp from 'components/FormApp/components/AsyncAutocompleteFormikApp/AsyncAutocompleteFormikApp'
import InputFileFormikApp from 'components/FormApp/components/InputFileFormikApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import TextareaFormikApp from 'components/FormApp/components/TextareaFormikApp '
import Modal from 'components/Modal'
import { User } from 'domain/User/User'
import { Form, Formik } from 'formik'
import amasRepository from 'infrastructure/repositories/amas.repository'
import { UserRepositoryImplInstance } from 'infrastructure/repositories/users.repository'
import { useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import * as yup from 'yup'

const CreateChatroom = ({ onClose }: { onClose: Function }) => {
  const [loading, setloading] = useState(false)
  const [chatroom, setchatroom] = useState<any>({
    title: '',
    excerpt: '',
    interviewee: undefined,
    thumb: undefined,
    id: undefined
  })
  const intl = useIntl()
  const validationSchema = useRef(
    yup.object({
      title: yup
        .string()
        .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
      excerpt: yup.string(),
      interviewee: yup.object().required(intl.formatMessage({ id: 'forms.errors.errorRequired' }))
    })
  ).current

  const create = async (value: any) => {
    setloading(true)
    await amasRepository.setChatroom(value)
    onClose()
    setloading(false)
  }

  const searchUsers =  async (s: string) => {
    const res = await UserRepositoryImplInstance.elasticSearchUsers({
      query: s,
      search_fields: {
        email: {}
      }
    })

    return res.results.map((item: User) => ({
      value: { fullname: item.fullname, uid: item.uid },
      label: item.email
    }))
  }

  return (
      <Modal onBtnClose={() => onClose()}>
        <div>
          <div className='header'>
            <h3>Crear nueva sala de chat</h3>
          </div>
          <div className='formContent'>
            <Formik
              initialValues={chatroom}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={create}
            >
              {({ values, errors, touched }) => (
                <Form>
                  <InputFormikApp
                    labelID='forms.labels.title'
                    type='text'
                    name='title'
                  />
                  <TextareaFormikApp
                    labelID='forms.labels.excerpt'
                    name='excerpt'
                  />
                  <InputFileFormikApp
                    labelID='page.tax-consultant.create-service.form.image'
                    name='thumb'
                    accept='image/*'
                  />
                  <AsyncAutocompleteFormikApp
                    name='interviewee'
                    labelID='forms.labels.searchusers.email'
                    loadOptions={searchUsers}
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
          </div>
        </div>
      </Modal>
  )
}

export default CreateChatroom
