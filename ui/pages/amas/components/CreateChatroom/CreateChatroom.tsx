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
import { FormattedMessage, useIntl } from 'react-intl'
import * as yup from 'yup'
import style from './createchatroom.module.scss'

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
        <div className={style.modalContainer}>
          <div className={style.modalContainer_title}>
            <p>
              <FormattedMessage id={'page.amas.createRoom.label'}/>
            </p>
          </div>
          <div className={style.modalContainer_content}>
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
                    maxLength={60}
                  />
                  <TextareaFormikApp
                    labelID='forms.labels.excerpt'
                    name='excerpt'
                    maxLength={200}
                  />
                  <InputFileFormikApp
                    labelID='page.tax-consultant.create-service.form.image'
                    name='thumb'
                    accept='image/*'
                  />
                  <AsyncAutocompleteFormikApp
                    name='interviewee'
                    labelID='page.amas.search.interviewee'
                    loadOptions={searchUsers}
                    isAutocomplete={true}
                  />
                  <div className={style.buttonContainer}>
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
