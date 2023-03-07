import ButtonApp from 'components/ButtonApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import LinkApp from 'components/LinkApp'
import Modal from 'components/Modal'
import { Form, Formik } from 'formik'
import discordRepository from 'infrastructure/repositories/discord.repository'
import { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import * as yup from 'yup'
import Image from 'next/image'
import style from './discord.module.scss'
import discordImg from '../../../assets/img/discord.png'

const Discord: NextPage = () => {
  const intl = useIntl()
  const userLogged = useSelector(getUserLogged)
  const [edit, setEdit] = useState<boolean>(false)
  const [link, setLink] = useState<string | undefined>()
  const validationSchema = useRef(
    yup.object({
      link: yup
        .string()
        .matches(/(https:\/\/)/, 'Invalid URL')
        .required(intl.formatMessage({ id: 'forms.errors.errorRequired' }))
    })
  ).current

  useEffect(() => {
    discordRepository.getDiscordConfig().then(response => {
      if(response){
        const { link } = response as any
        setLink(link)
      }
    })
  }, [])

  const editDiscordLink = async (value: any) => {
    discordRepository.setDiscord(value.link).then(red => {
      setEdit(false)
      setLink(value.link)
    })
  }

  const renderFormEdit = () => {
    return (
      <>
        <Modal onBtnClose={() => setEdit(false)}>
          <div className={style.cardContainer}>
            <header>
              <h3>
                <FormattedMessage id={'page.discord.admin.title'} />
              </h3>
            </header>
            <div className={style.formContainer}>
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
    <div className={style.discord}>
      <header>
        <p className='small-caps'>
          <FormattedMessage id='discord' />
        </p>
        <p className={`${style.topTitle} main-title`}>
          <FormattedMessage id='page.discord.title' />
        </p>
      </header>
      <div className={style.banner_top}>
        <div className={`flex-container align-center ${style.flexContainer}`}>
          <div className={style.imageContainer}>
            <Image src={discordImg} alt='' />
          </div>
          <div className={style.textContainer}>
            <div className={style.textContainer_title}>
              <p>
                <FormattedMessage
                  id={'page.discord.card.title'}
                  values={{
                    b: children => <strong>{children}</strong>
                  }}
                />
              </p>
            </div>
            <p>
              <FormattedMessage id={'page.discord.card.text'} />
            </p>
            <div className={style.textContainer_button}>
              <LinkApp
                target={'_blank'}
                label={'btn.access'}
                linkStyle={'button'}
                linkHref={link}
              />
            </div>
          </div>
        </div>
      </div>

      {userLogged?.role.level > 1 && (
        <div className={style.adminOptions}>
          <p className='small-caps'>
            <FormattedMessage id={'page.discord.admin.title'} />
          </p>
          <div className={style.adminOptions_button}>
            <ButtonApp onClick={() => setEdit(true)}>
              <FormattedMessage id={'btn.editLink'} />
            </ButtonApp>
          </div>

          <div>{edit && renderFormEdit()}</div>
        </div>
      )}
    </div>
  )
}

export default Discord
