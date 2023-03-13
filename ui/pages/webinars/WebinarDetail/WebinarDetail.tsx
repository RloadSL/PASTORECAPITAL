/* eslint-disable react-hooks/exhaustive-deps */
import AlertApp from 'components/AlertApp'
import ButtonApp from 'components/ButtonApp'
import InputCheckFormikApp from 'components/FormApp/components/InputCheckFormikApp '
import InputFileFormikApp from 'components/FormApp/components/InputFileFormikApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import Loading from 'components/Loading'
import Modal from 'components/Modal'
import { Webinars } from 'domain/Webinars/Webinars'
import { UploadTask, UploadTaskSnapshot } from 'firebase/storage'
import { Form, Formik } from 'formik'
import webinarsRepository from 'infrastructure/repositories/webinars.repository'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import * as yup from 'yup'
import SetWebinar from '../components/CreateWebinar/SetWebinar'
import editIcon from '../../../../assets/img/icons/pencil.svg'
import deleteIcon from '../../../../assets/img/icons/trash.svg'
import uploadIcon from '../../../../assets/img/icons/upload.svg'
import style from './webinar-detail.module.scss'

const WebinarDetail: NextPage = () => {
  const [webinar, setWebinar] = useState<Webinars | undefined>()
  const [deferred_video, setDeferred_video] = useState<string | undefined>()
  const [state, setState] = useState<{
    register: boolean
    uploadVideo: boolean
    edit: boolean
    delete: boolean
    loading: boolean
  }>({ register: false, uploadVideo: false, edit: false, delete: false, loading: false })
  const { query, replace } = useRouter()
  useEffect(() => {
    let fetch = true
    if (query.w_id) {
      webinarsRepository.get(query.w_id as string).then(res => {
        setWebinar(res)
        if (res?.deferred_video) {
          webinarsRepository.getVideoUrl(res.deferred_video.gcs_path)
            .then(url => setDeferred_video(url))
        }
      })
    }

    return () => {
      fetch = false
    }
  }, [query?.w_id])

  const onSetWebinars = async (webinar: Webinars) => {
    await webinarsRepository.set(webinar)
    setState(pre => ({ ...pre, edit: false }))
  }

  const onDelete = async () => {
    await webinarsRepository.delete(webinar?.id as string)
    setState(pre => ({ ...pre, loading: true }))
    setTimeout(() => {
      setState(pre => ({ ...pre, loading: false }))
      replace('/webinars')
    }, 10000);
  }

  return !webinar ? (
    <Loading loading variant='inner-primary' />
  ) : (
    <div className={style.webinarDetail}>
      <div className={style.readingContainer}>
        <header>
          <div>
            <p className='small-caps'><FormattedMessage id={'webinars'} /></p>
            <h1 className={`${style.topTitle} main-title`}>
              {webinar.title}
            </h1>
          </div>
          <div className={style.webinarDetail_date}>
            <span className={style.date}>
              {webinar.date.toLocaleString()}
            </span>
          </div>
        </header>
        <div className={style.adminActions}>
          <div className={style.adminActions_buttonContainer_edit}>
            <ButtonApp icon={editIcon} buttonStyle={'transparent'} onClick={() => setState(pre => ({ ...pre, edit: true }))} labelID={'editar'} />
          </div>
          <div className={style.adminActions_buttonContainer_upload}>
            <ButtonApp icon={uploadIcon} buttonStyle={'transparent'} onClick={() => setState(pre => ({ ...pre, uploadVideo: true }))}
              labelID={'subir vídeo'} />
          </div>
          <div className={style.adminActions_buttonContainer_delete}>
            <ButtonApp icon={deleteIcon} buttonStyle={'transparent'} onClick={() => setState(pre => ({ ...pre, delete: true }))} labelID={'eliminar'} />
          </div>
        </div>
        <div className={style.webinarDetail_description}>
          <div className={style.webinarDetail_description_text}>
            {webinar.description}
          </div>
          {(webinar.thumb && !deferred_video) && (
            <div className={style.webinarDetail_description_image}>
              <div>
                <Image
                  src={webinar.thumb?.url as string}
                  layout='fill'
                  alt={webinar.title}
                />
              </div>
            </div>
          )}
          <div className={style.webinarDetail_description_video}>
            {
              deferred_video && <div style={{
                position: 'relative',
                width: '100%'
              }}>
                <video style={{
                  position: 'relative',
                  width: '100%'
                }} controls src={deferred_video} autoPlay={false}></video>
              </div>
            }
          </div>
        </div>
        <div className={style.attendButtonContainer}>
          <ButtonApp buttonStyle={'primary'} labelID={'page.webinarDetail.label.attendButton'} onClick={() => setState(pre => ({ ...pre, register: true }))}
          />
        </div>
        {state.register && (
          <div>
            <ComplteInscription
              onClose={() => setState(pre => ({ ...pre, register: false }))}
              w_id={query.w_id as string}
            />
          </div>
        )}

        {state.edit && (
          <Modal onBtnClose={() => setState(pre => ({ ...pre, edit: false }))}>
            <div className={style.modalContainer}>
              <p className={style.modalContainer_title}>
                <FormattedMessage id={'page.webinars.modal.editTitle'}/>
              </p>
                <SetWebinar updateWebinar={webinar} onCreate={onSetWebinars} />
            </div>
          </Modal>
        )}

        {state.uploadVideo && (
          <Modal
            onBtnClose={() => setState(pre => ({ ...pre, uploadVideo: false }))}
          >
            <div className={style.modalContainer}>
              <p className={style.modalContainer_title}>
                <FormattedMessage id='page.webinarDetail.modal.uploadVideoTitle'/>
              </p>
              <UploadVideo
                onCancel={() => setState(pre => ({ ...pre, uploadVideo: false }))}
                onUploadVideo={() => alert('Video subido')}
                w_id={webinar.id as string}
              />
            </div>
          </Modal>
        )}

        {state.delete && (
          <AlertApp
            visible={state.delete}
            onAction={onDelete}
            title='Eliminar webinar'
            onCancel={() => setState(pre => ({ ...pre, delete: false }))}
          >
            <div className={style.modalContainer}>
              <Loading loading={state.loading} />
              <div className={style.modalContainer}>
                Seguro deseas eliminar el Webinar, no se podran recuperar sus datos.
              </div>
            </div>
          </AlertApp>
        )}
      </div>
    </div>
  )
}

const ComplteInscription = ({
  w_id,
  onClose
}: {
  w_id: string
  onClose: Function
}) => {
  const userLoggued = useSelector(getUserLogged)
  const [registerState, setRegisterState] = useState<{
    loading: boolean
    isRegistered: boolean
  }>({ loading: true, isRegistered: false })
  const intl = useIntl()

  useEffect(() => {
    if (userLoggued?.email) {
      webinarsRepository
        .isRegistered({ w_id, email: userLoggued.email })
        .then(res => {
          if (typeof res === 'boolean') {
            setRegisterState({ loading: false, isRegistered: res })
          } else {
            setRegisterState(pre => ({ ...pre, loading: false }))
          }
        })
    }
  }, [userLoggued?.email])

  const validationSchema = useRef(
    yup.object({
      name: yup
        .string()
        .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
      lastname: yup
        .string()
        .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
      email: yup
        .string()
        .email(intl.formatMessage({ id: 'page.login.incorrectEmail' }))
        .required(intl.formatMessage({ id: 'forms.errors.errorRequired' })),
      policy: yup
        .boolean()
        .oneOf(
          [true],
          intl.formatMessage({ id: 'forms.errors.required.policy' })
        )
    })
  ).current

  const onCreate = async (value: any) => {
    webinarsRepository.register({ ...value, w_id })
  }

  const renderForm = () => (
    <Formik
      initialValues={{
        name: userLoggued?.name || '',
        email: userLoggued?.email || '',
        lastname: userLoggued?.lastname || '',
        policy: false
      }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={onCreate}
    >
      {({ values, errors, touched }) => (
        <Form>
          <InputFormikApp labelID='forms.labels.name' type='text' name='name' />
          <InputFormikApp
            labelID='forms.labels.lastname'
            type='text'
            name='lastname'
          />
          <InputFormikApp
            labelID='forms.labels.email'
            type='text'
            name='email'
          />
          <InputCheckFormikApp
            labelID='forms.labels.policy'
            type='text'
            name='policy'
          >
            {intl.formatMessage({ id: 'forms.labels.policy' })}
          </InputCheckFormikApp>
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

  return (
    <>
      <Modal onBtnClose={onClose}>
        {registerState.loading ? (
          <Loading loading />
        ) : registerState.isRegistered ? (
          <div>
            <h3>Ya estas registrado en este Webinar</h3>
            <div>
              <ButtonApp onClick={() => onClose()}>Aceptar</ButtonApp>
            </div>
          </div>
        ) : (
          renderForm()
        )}
      </Modal>
    </>
  )
}

const UploadVideo = ({
  w_id,
  onUploadVideo,
  onCancel
}: {
  w_id: string
  onUploadVideo: Function,
  onCancel: Function
}) => {
  const [progress, setProgresss] = useState(0)
  const [task, setTask] = useState<UploadTask | undefined>()
  const intl = useIntl()
  const onSave = async ({ video }: { video: File }) => {
    const taskState = webinarsRepository.uploadDeferredVideo(
      w_id,
      video,
      setProgresss
    )
    setTask(taskState)
    onUploadVideo()
  }
  console.log(console.log(progress))
  const renderProgress = () => (
    <div>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <p>Subiendo video diferido</p>
        <div
          style={{ width: '100%', background: 'gray', position: 'relative', height: '40px' }}
        >
          <div
            style={{
              width: `${progress}%`,
              background: 'green',
              height: '100%',
              position: 'absolute'
            }}
          ></div>
        </div>
      </div>

      <ButtonApp
        onClick={() => {

          task?.cancel()
          console.log(console.log(progress))
          //setProgresss(0)
          //onCancel()
        }}
      >
        Cancelar
      </ButtonApp>
    </div>
  )

  return (
    <>
      {progress > 0 ? (
        renderProgress()
      ) : (
        <Formik
          initialValues={{ video: '' }}
          validationSchema={yup.object().shape({
            video: yup
              .mixed()
              .required(
                intl.formatMessage({ id: 'forms.errors.errorRequired' })
              )
          })}
          onSubmit={values => onSave(values as any)}
        >
          <Form>
            <InputFileFormikApp
              thumb={false}
              accept='video/*'
              labelID={'file'}
              name='video'
            />
            <ButtonApp
              buttonStyle='secondary'
              type='submit'
              labelID='btn.accept'
            />
          </Form>
        </Formik>
      )}
    </>
  )
}

export default WebinarDetail
