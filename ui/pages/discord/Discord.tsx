import ButtonApp from 'components/ButtonApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import Modal from 'components/Modal'
import { Form, Formik } from 'formik'
import discordRepository from 'infrastructure/repositories/discord.repository'
import { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import * as yup from 'yup'

const Discord: NextPage = () => {
  const intl = useIntl()
  const userLogged = useSelector(getUserLogged)
  const [edit, setEdit] = useState<boolean>(false)
  const [link, setLink] = useState<string | undefined>()
  const validationSchema = useRef(
    yup.object({
      link: yup
        .string()
        .matches(/(https:\/\/)/, 'Invalid URL')
        .required(intl.formatMessage({ id: 'forms.errors.errorRequired' }))
    })
  ).current

  useEffect(() => {
    discordRepository.getDiscordConfig()
    .then((response) =>{
      const {link} = response as any;
      setLink(link)
    })
  }, [])
  

  const editDiscordLink = async (value:any)=>{
    discordRepository.setDiscord(value.link).then((red)=>{
      setEdit(false)
      setLink(value.link)
    })
  }

  const renderFormEdit = () => {
    return (
      <>
        <Modal>
          <div>
            <div className='header'>
              <h3>Editar link de discord</h3>
            </div>
            <div className='formContent'>
              <Formik
                initialValues={{ link }}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={editDiscordLink}
              >
                {({ values, errors, touched }) => (
                  <Form>
                    <InputFormikApp
                      labelID='page.tax-consultant.create-edit.form.label.linkedin'
                      type='text'
                      name='link'
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
      </>
    )
  }

  return (
    /**
     * Funcionalidad para la edicion del link de discord
     */
    <div>
     Link de discord:  <h3>{link}</h3>
      Para ver la edicion logate como admin@test.es
     {userLogged?.role.level > 1 && <ButtonApp onClick={() => setEdit(true)}>Editar</ButtonApp>}
      <div>{edit && renderFormEdit()}</div>
    </div>
  )
}

export default Discord
