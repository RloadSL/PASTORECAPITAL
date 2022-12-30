/* eslint-disable @next/next/no-img-element */
import style from './editProfile.module.scss'

import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import ConsultantMenu from '../../components/ConsultantMenu'
import ImageCrop from 'components/ImageCrop'
import Modal from 'components/Modal'
import ButtonApp from 'components/ButtonApp'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import TextareaFormikApp from 'components/FormApp/components/TextareaFormikApp '
import { Form, Formik } from 'formik'
import { FormattedMessage } from 'react-intl'
import SelectFormikApp from 'components/FormApp/components/SelectFormikApp/SelectFormikApp'
import {
  UserConsultantDto,
  UserConsultantInitialValues
} from 'infrastructure/dto/userConsultant.dto'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { useRouter } from 'next/router'
import userConsultantRepository from 'infrastructure/repositories/userConsultant.repository'
import Loading from 'components/Loading'
import { SubscriptionGranted } from 'components/AppLayout/AppLayout'
import UserImage from 'components/UserImage'

const EditProfile = () => {
  const [loading, setloading] = useState(false)
  const userLogged = useSelector(getUserLogged)
  const { query, replace } = useRouter()

  const userData = useRef({
    name: userLogged?.role.level == 2 ? query?.name : userLogged?.name,
    lastname: userLogged?.role.level == 2 ? query?.lastname : userLogged?.lastname,
    uid: userLogged?.role.level == 2 ? query?.uid : userLogged?.uid
  })


  useEffect(() => {
    if (userLogged?.role.level == 1 && !query.id) {
      replace('/tax-consultant/consultants')
    }
  }, [userLogged,replace, query.id]) 
 

  const [initialValues, setInitialValues] =
    useState<UserConsultantInitialValues>({
      country: undefined,
      description: '',
      keywords: '',
      linkedin: ''
    })

  const _onSubmit = async (values: UserConsultantDto) => {
    values.uid = userData.current.uid as string;
    const response = await userConsultantRepository.setUserConsultant(values)
    console.log(response)
  }

  return (
    <>
      <EditProfileView
        initialValues={initialValues}
        onSubmit={_onSubmit}
        userData={userData.current}
      ></EditProfileView>
      <Loading variant='outer-primary' loading={loading}></Loading>
    </>
  )
}

const EditProfileView = ({ initialValues, userData, onSubmit }: any) => {
  const [imgSrc, setImgSrc] = useState<undefined | string>('')
  const [avatar, setAvatarSrc] = useState<string | undefined>()
  const inputAvatarRef = useRef<HTMLInputElement>(null)
  const AvatarPicker = () => {
    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
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
            <UserImage image={avatar} size={'large'} userImageStyle={['rounded', 'nobordered']} />
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
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          if (avatar) values.avatar = avatar
          onSubmit(values)
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <SelectFormikApp
              selectOptions={[
                {
                  label: 'España',
                  value: {
                    label: 'Spain',
                    iso: 'es',
                    flagUrl: ''
                  }
                },
                {
                  label: 'Inglaterra',
                  value: {
                    label: 'England',
                    iso: 'en',
                    flagUrl: ''
                  }
                },
                {
                  label: 'Francia',
                  value: {
                    label: 'France',
                    iso: 'fr',
                    flagUrl: ''
                  }
                }
              ]}
              labelID={'forms.labels.location'}
              name={'country'}
            />

            <TextareaFormikApp
              labelID='page.tax-consultant.create-edit.form.label.description'
              name='description'
            />

            <InputFormikApp
              labelID='page.tax-consultant.create-edit.form.label.keyword'
              type='text'
              name='keyword'
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
      <ConsultantMenu avatarImg={avatar}/>
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
          <div className='fake-input'>
            <span className='label'>Nombre:</span> <span>{userData.name}</span>
          </div>
          <div className='fake-input'>
            <span className='label'>Apellidos:</span> <span>{userData.lastname}</span>
          </div>        </div>
        <div className={style.formBlock}>
          {renderFormik()}
        </div>
      </div>
    </div>
  )
}

export default EditProfile
