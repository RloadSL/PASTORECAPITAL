import React, { useEffect, useState } from 'react'
import style from './advertising-list.module.scss'
import trashIcon from '../../../../assets/img/icons/trash.svg'
import addIcon from '../../../../assets/img/icons/add.svg'
import Image from 'next/image'
import emptyAd from '../../../../assets/img/noAd.gif'
import Modal from 'components/Modal'
import { FormattedMessage } from 'react-intl'
import { Form, Formik } from 'formik'
import InputFormikApp from 'components/FormApp/components/InputFormikApp'
import InputFileFormikApp from 'components/FormApp/components/InputFileFormikApp'
import ButtonApp from 'components/ButtonApp'
import AlertApp from 'components/AlertApp'
import systemRepository from 'infrastructure/repositories/system.repository'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { ErrorApp } from 'domain/ErrorApp/ErrorApp'
import * as yup from 'yup'
import { dashboardState } from 'ui/redux/slices/dashboard/dashboard.selectors'
import { AppDispatch } from 'ui/redux/store'
import { useDispatch } from 'react-redux'
import { setDashboardPubliState } from 'ui/redux/slices/dashboard/dashboard.slice'
import Loading from 'components/Loading'

const AdvertisingList = () => {
  const [isVisibleCreateAd, setVisibleCreateAd] = useState<number>(-1)
  const [isVisibleDeleteAd, setVisibleDeleteAd] = useState<string | undefined>()
  const dispatch = useDispatch<AppDispatch>()
  const { publi } = useSelector(dashboardState)
  const userLogged = useSelector(getUserLogged)
  
  useEffect(() => {
    let fetch = true
    if (userLogged) getPubli(fetch)
    return () => {
      fetch = false
    }
  }, [userLogged?.uid])

  const getPubli = async (fetch: boolean) => {
    systemRepository.getDashboardPubli().then(response => {
      if (fetch && !(response instanceof ErrorApp)) {
        let p
        if (true /* userLogged?.role.level === 2 */) {
          p = [null, null, null, null]
          response.forEach((doc: any) => {
            p[doc.position - 1] = doc
          })
        } else {
          p = response
        }
        dispatch(setDashboardPubliState([...p]))
      }
    })
  }

  const deletePubli = async () => {
    await systemRepository.deletePubli(isVisibleDeleteAd as string)
    setVisibleDeleteAd(undefined)
    getPubli(true)
  }

  const uploadPubli = async (data: any) => {
    const res = await systemRepository.setPubliImageDashboard({
      ...data,
      position: isVisibleCreateAd
    })
    if (res.id) {
      setVisibleCreateAd(-1)
      getPubli(true)
    } 
  }

  return !publi  ? <Loading loading/> : (
    <>
      <ul className={style.advertisingList}>
        {publi.map((item: any, index: any) => {
          return (
            <li key={index}>
              {userLogged?.role.level === 2 && (
                <button
                  className={style.adminAd_button}
                  onClick={() => {
                    !item
                      ? setVisibleCreateAd(index + 1)
                      : setVisibleDeleteAd(item.id)
                  }}
                >
                  {item ? (
                    <Image src={trashIcon} alt='' />
                  ) : (
                    <Image src={addIcon} alt='' />
                  )}
                </button>
              )}
              {item ? (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative'
                  }}
                >
                  <a href={item.link} target='_blank' rel='noreferrer'>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      layout='fill'
                      src={item.file.url}
                      alt=''
                    />
                  </a>
                </div>
              ) : (
                <div className={style.emptyAd}>
                  <Image src={emptyAd} alt='' />
                  <div className={style.emptyAd_text}>
                    <p>Promote your site</p>
                    <p>with us</p>
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>
      {isVisibleCreateAd >= 0 && (
        <Modal onBtnClose={() => setVisibleCreateAd(-1)}>
          <div className={style.modalContainer}>
            <div className={style.modalContainer_title}>
              <p>
                <FormattedMessage
                  id={'page.dashboard.form_publi_image.title'}
                />
              </p>
            </div>
            <div className={style.modalContainer_content}>
              <Formik
                initialValues={{ link: '', file: undefined }}
                enableReinitialize
                validationSchema={yup.object().shape({
                  link: yup.string().required('Este campo es requerido'),
                  file: yup.mixed().required('Este campo es requerido')
                })}
                onSubmit={values => uploadPubli(values)}
              >
                {({ values, errors, touched }) => (
                  <Form>
                    <InputFormikApp
                      labelID='page.dashboard.form_publi_image.link'
                      type='text'
                      name='link'
                    />

                    <InputFileFormikApp
                      labelID='page.tax-consultant.create-service.form.image'
                      name='file'
                      accept='image/*'
                      thumb={true}
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
      )}

      {isVisibleDeleteAd && (
        <AlertApp
          onCancel={() => setVisibleDeleteAd(undefined)}
          onAction={() => deletePubli()}
          visible
          title='borrar anuncio'
          cancelButton={false}
        >
          seguro que quieres borrar esta publicidad????
        </AlertApp>
      )}
    </>
  )
}

export default AdvertisingList
