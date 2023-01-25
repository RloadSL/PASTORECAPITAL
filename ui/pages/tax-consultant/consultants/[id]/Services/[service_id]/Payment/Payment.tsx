import LinkApp from 'components/LinkApp'
import StripePayment from 'components/StripePayment'
import Service from 'domain/Service/Service'
import { UserConsultant } from 'domain/UserConsultant/UserConsultant'
import serviceRepository from 'infrastructure/repositories/service.repository'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from './payment.module.scss'

const Payment = () => {
  const { query } = useRouter()
  //
  const [order, setOrder] = useState<Service>()
  //Usuario propietario del pedido
  const [userConsultanOfOrder, setUserConsultanOfOrder] =
    useState<UserConsultant>()
  useEffect(() => {
    let fetch = true
    if (query?.order_id && query?.order_path) {
      switch (query?.order_path) {
        case 'services':
          serviceRepository.getService(query?.order_id as string).then(res => {
            if (fetch && res) setOrder(res)
          })
          break

        default:
          break
      }
    }
    return () => {
      fetch = false
    }
  }, [query?.order_id, query?.order_path])

  useEffect(() => {
    let fetch = true
    if (order) {
      order.getUserConsultant().then(uc => {
        if (fetch) setUserConsultanOfOrder(uc)
      })
    }
    return () => {
      fetch = false
    }
  }, [order])

  return (
    <div className={style.payment}>
      <div className={style.payment_info}>
        <header>
        <h1 className={style.title}>{order?.title}</h1>
        <p className={style.author}>
          Asesoría realizada por:{' '}
          {userConsultanOfOrder?.name + ' ' + userConsultanOfOrder?.lastname}
        </p>
        </header>
        <div className={style.payment_info_price}>
          <p>Precio</p>
          <p className={style.payment_info_priceQty}>{order?.price}€</p>
          <small>IVA incluido</small>
        </div>
        <div className={style.payment_legalContainer}>
          <LinkApp label='Términos y condiciones' linkHref='#' linkStyle='classic' />
          <LinkApp label='Política de privacidad' linkHref='#' linkStyle='classic' />
        </div>
      </div>
      <div className={style.payment_form}>
        <div className={`${style.stripe_form}`}>
          <StripePayment />
        </div>
      </div>
    </div>
  )
}

export default Payment
