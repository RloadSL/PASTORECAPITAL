import ButtonApp from 'components/ButtonApp'
import AsyncAutocompleteFormikApp from 'components/FormApp/components/AsyncAutocompleteFormikApp/AsyncAutocompleteFormikApp'
import InputDateFormikApp from 'components/FormApp/components/InputDateFormikApp/InputDateFormikApp'
import InputFileFormikApp from 'components/FormApp/components/InputFileFormikApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import TextareaFormikApp from 'components/FormApp/components/TextareaFormikApp '
import { User } from 'domain/User/User'
import { Form, Formik } from 'formik'
import { UserRepositoryImplInstance } from 'infrastructure/repositories/users.repository'
import { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import * as yup from 'yup'

function SetWebinar ({onCreate, updateWebinar }: any) {
  const [loading, setloading] = useState(false)
  const [today] = useState(new Date())
  const [webinar, setWebinar] = useState<any>({
    title: '',
    date: new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0
    ),
    description: '',
    author: undefined,
    thumb: undefined
  })

  useEffect(() => {
    if (updateWebinar) {
      setWebinar(updateWebinar)
    }
  }, [updateWebinar])

  const searchUsers = async (s: string) => {
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

  const intl = useIntl()
  const validationSchema = useRef(
    yup.object({
      title: yup
        .string()
        .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
      date: yup
        .date()
        .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
      description: yup.string(),
      author: yup
        .object()
        .required(intl.formatMessage({ id: 'forms.errors.errorRequired' }))
    })
  ).current

  return (
    <div>
      <div className='header'>
        <h3>Crear nuevo webinar</h3>
      </div>
      <div className='formContent'>
        <Formik
          initialValues={webinar}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={onCreate}
        >
          {({ values, errors, touched }) => (
            <Form>
              <InputFormikApp
                labelID='forms.labels.title'
                type='text'
                name='title'
              />
              <InputFormikApp
                labelID='forms.labels.link'
                type='text'
                name='link'
              />
              <InputDateFormikApp
                labelID='forms.labels.date'
                type='text'
                name='date'
                time
              />
              <TextareaFormikApp
                labelID='forms.labels.excerpt'
                name='description'
              />
              <InputFileFormikApp name='thumb'
                labelID='form.label.image'
                />
              <AsyncAutocompleteFormikApp
                name='author'
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
  )
}

export default SetWebinar
