/* eslint-disable @next/next/no-img-element */
import style from './editProfile.module.scss'

import React, { useEffect, useRef, useState } from 'react'
import ConsultantMenu from '../../components/ConsultantMenu'
import ImageCrop from 'components/ImageCrop'
import Modal from 'components/Modal'
import ButtonApp from 'components/ButtonApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import TextareaFormikApp from 'components/FormApp/components/TextareaFormikApp '
import { Form, Formik } from 'formik'
import { FormattedMessage, useIntl } from 'react-intl'
import {
  UserConsultantDto,
  UserConsultantInitialValues
} from 'infrastructure/dto/userConsultant.dto'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { useRouter } from 'next/router'
import userConsultantRepository from 'infrastructure/repositories/userConsultant.repository'
import Loading from 'components/Loading'
import UserImage from 'components/UserImage'
import { NOT_CONSULTANT, UserConsultant } from 'domain/UserConsultant/UserConsultant'
import { useSystem } from 'ui/hooks/system.hooks'
import { InfoApp } from 'domain/InfoApp/InfoApp'
import * as yup from 'yup'
import SelectCountryFormikApp from 'components/FormApp/components/SelectCountryFormikApp/SelectCountryFormikApp'
import { useConsultant } from 'ui/hooks/consultant.hook'
const EditProfile = () => {
  const [loading, setloading] = useState(false)
  const {consultant} = useConsultant() 
  const userLogged = useSelector(getUserLogged)
  const { query, replace } = useRouter()
  const { pushInfoApp } = useSystem()

  const userData = useRef({
    name: userLogged?.role.level == 2 ? '' : userLogged?.name,
    lastname: userLogged?.role.level == 2 ? '' : userLogged?.lastname,
    uid: userLogged?.role.level == 2 ? '' : userLogged?.uid
  }).current
  //Get consultant ref
  useEffect(() => {
    let fetch = true
    if (consultant instanceof UserConsultant) {
          if (fetch) {
            userData.name = consultant?.name as string
            userData.lastname = consultant?.lastname as string
            userData.uid = consultant?.uid as string
            setInitialValues({
              country: consultant.country?.iso,
              description: consultant?.description,
              keywords: consultant?.keywords?.toString(),
              linkedin: consultant?.linkedin
            })
          }
    }
    
    

    return () => {
      fetch = false
    }
  }, [consultant])

  //Permisos
  useEffect(() => {
    /*  if (userLogged?.role.level < 1 || !query.id) {
      replace('/tax-consultant/consultants')
    } */

    if (userLogged?.role.level == 1 && userLogged.uid === null) {
      //comprobar propietario
      replace('/tax-consultant/consultants')
    }
  }, [userLogged, replace, query.id])

  const [initialValues, setInitialValues] =
    useState<UserConsultantInitialValues>({
      country: undefined,
      description: '',
      keywords: '',
      linkedin: ''
    })

  const _onSubmit = async (values: UserConsultantDto) => {
    values.uid = userData.uid as string
    const response = await userConsultantRepository.setUserConsultant({
      ...values,
      id: (consultant instanceof UserConsultant) ?  consultant?.id : undefined
    })
    if (!response) {
      pushInfoApp(
        new InfoApp(
          { code: 'message.item.updated', message: 'The item was updated' },
          'success'
        )
      )
    }
  }

  return (
    <>
      <EditProfileView
        initialValues={initialValues}
        onSubmit={_onSubmit}
        userData={userData}
        currentavatar={ (consultant instanceof UserConsultant) && consultant?.avatar?.url}
      ></EditProfileView>
      <Loading variant='outer-primary' loading={loading}></Loading>
    </>
  )
}

const EditProfileView = ({
  initialValues,
  userData,
  onSubmit,
  currentavatar
}: any) => {
  const [imgSrc, setImgSrc] = useState<undefined | string>('')
  const [avatar, setAvatarSrc] = useState<string | undefined>()
  const inputAvatarRef = useRef<HTMLInputElement>(null)
  const intl = useIntl()

  const AvatarPicker = () => {
    function onSelectFile (e: React.ChangeEvent<HTMLInputElement>) {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader()
        reader.addEventListener('load', () =>
          setImgSrc(reader.result?.toString() || '')
        )
        reader.readAsDataURL(e.target.files[0])
      }
    }

    return (
      <div className={style.editProfile}>
        <p className='small-caps'>Apariencia</p>
        <div className='flex-container align-center'>
          <div className={style.avatarBlock}>
            <UserImage
              image={avatar || currentavatar}
              size={'large'}
              userImageStyle={['rounded', 'nobordered']}
            />
          </div>
          <div className={style.infoBlock}>
            <p className='secondary-title'>Imagen de perfil</p>
            {/* <p>Recomendado 800x800</p> */}
            <label className='fake-button' htmlFor='avatarFile'>
              <span>Seleccionar Imagen</span>
              <input
                hidden
                id='avatarFile'
                ref={inputAvatarRef}
                type='file'
                accept='image/jpg,image/png'
                onChange={onSelectFile}
              />
            </label>
          </div>
        </div>

        {imgSrc && (
          <Modal>
            <ImageCrop
              onComplited={(data64: string) => {
                setAvatarSrc(data64)
                setImgSrc(undefined)
                inputAvatarRef.current?.setAttribute('value', '')
              }}
              src={imgSrc}
            />
          </Modal>
        )}
      </div>
    )
  }

  const renderFormik = () => {
    const validationSchema = yup.object({
      keywords: yup
        .string()
        .required(intl.formatMessage({ id: 'page.login.errorRequired' })),
      country: yup
        .string()
        .required(intl.formatMessage({ id: 'page.login.errorRequired' })),
      description: yup
        .string()
        .required(intl.formatMessage({ id: 'page.login.errorRequired' }))
    })

    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          if (avatar) values.avatar = avatar
          if (values.keywords)
            values.keywords = values.keywords
              .split(',')
              .map((item: string) => item.trim())
          onSubmit(values)
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <SelectCountryFormikApp
              labelID={'forms.labels.location'}
              name={'country'}
              value={values.country}
            />
            <TextareaFormikApp
              labelID='page.tax-consultant.create-edit.form.label.description'
              name='description'
            />

            <InputFormikApp
              labelID='page.tax-consultant.create-edit.form.label.keyword'
              type='text'
              name='keywords'
            />

            <InputFormikApp
              labelID='page.tax-consultant.create-edit.form.label.linkeding'
              type='text'
              name='linkedin'
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
    )
  }

  return (
    <div className={style.editProfile}>
      <ConsultantMenu />
      <div className={style.avatarBlock}>
        <div className={style.avatar}>{AvatarPicker()}</div>
        <div>
          <p className='small-caps'>
            <FormattedMessage id='page.tax-consultant.create-edit.title'></FormattedMessage>
          </p>
        </div>
      </div>
      <div className={style.userInfoBlock}>
        <div className={style.nameLastnameBlock}>
          <div className={`fake-input ${style.input}`}>
            <span className={`label ${style.label}`}>Nombre:</span>{' '}
            <span>{userData.name}</span>
          </div>
          <div className={`fake-input ${style.input}`}>
            <span className={`label ${style.label}`}>Apellidos:</span>{' '}
            <span>{userData.lastname}</span>
          </div>{' '}
        </div>
        <div className={style.formBlock}>{renderFormik()}</div>
      </div>
    </div>
  )
}

export default EditProfile
