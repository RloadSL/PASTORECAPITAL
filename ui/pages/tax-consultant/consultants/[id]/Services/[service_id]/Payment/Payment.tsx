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
      <div className={style.order_info}>
        <p>{order?.title}</p>
        <p>Precio: {order?.price}</p>
        <p>
          Asesoría realizada por:{' '}
          {userConsultanOfOrder?.name + ' ' + userConsultanOfOrder?.lastname}
        </p>
      </div>
      <div className={style.stripe_form}>
        <StripePayment></StripePayment>
      </div>
    </div>
  )
}

export default Payment
