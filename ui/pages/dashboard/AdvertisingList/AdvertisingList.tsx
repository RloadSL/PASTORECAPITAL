import React, { useState } from 'react'
import style from './advertising-list.module.scss'
import ad1 from '../../../../assets/img/ad1.png'
import ad2 from '../../../../assets/img/ad2.png'
import ad3 from '../../../../assets/img/ad3.png'
import ad4 from '../../../../assets/img/ad4.png'
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

const adsArr = [
  {
    id: '1',
    src: ad1
  },
  {
    id: '2',
    src: ad2
  },
  null,
  null
]

interface AdvertisingListProps {
}

const AdvertisingList = ({ }: AdvertisingListProps) => {
  const [isVisibleCreateAd, setVisibleCreateAd] = useState<boolean>(false)
  const [isVisibleDeleteAd, setVisibleDeleteAd] = useState<boolean>(false)

  return (
    <>
      <ul className={style.advertisingList}>
        {adsArr.map((item, index: any) => {
          return (
            <li key={index}>
              {/*@jose aquí tendrías que pasarle al botón el estado de que sea visible el modal de crear publi o el de borrar publi, ahora le estoy pasando crear*/}
              <button className={style.adminAd_button} onClick={() => {!item ? setVisibleCreateAd(true) : setVisibleDeleteAd(true) }}>
                {item ? <Image src={trashIcon} alt='' /> : <Image src={addIcon} alt='' />}
              </button>
              {item ? (
                <div>
                  <Image src={item.src} alt='' />
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
      {isVisibleCreateAd && (
        <Modal onBtnClose={() => setVisibleCreateAd(false)}>
          <div className={style.modalContainer}>
            <div className={style.modalContainer_title}>
              <p>
                <FormattedMessage id={'page.amas.createRoom.label'} />
              </p>
            </div>
            <div className={style.modalContainer_content}>
              <Formik
                // initialValues={ }
                enableReinitialize
                validationSchema={'validationSchema'}
                onSubmit={() => console.log('crear')}
              >
                {({ values, errors, touched }) => (
                  <Form>
                    <InputFormikApp
                      labelID='forms.labels.title'
                      type='text'
                      name='title'
                      maxLength={60}
                    />

                    <InputFileFormikApp
                      labelID='page.tax-consultant.create-service.form.image'
                      name='thumb'
                      accept='image/*'
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
          onCancel={() => setVisibleDeleteAd(false)}
          onAction={() => console.log('abrir')}
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