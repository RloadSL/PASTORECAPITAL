
import StripePayment from 'components/StripePayment'
import Service from 'domain/Service/Service';
import serviceRepository from 'infrastructure/repositories/service.repository';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import style from './payment.module.scss';

const Payment = () => {
  const {query} = useRouter()
  const [order, setOrder] = useState<Service>()
  useEffect(() => {
    let fetch = true
    if(query?.order_id){
      serviceRepository.getService(query?.order_id as string)
      .then(res => {
        if(fetch && res) setOrder(res);
      })
    }
    return () => {
      fetch = false
    }
  }, [query?.order_id])
  
  return (
    <div className={style.payment}>
      <div className={style.order_info}>
        <p>{order?.title}</p>
        <p>Precio: {order?.price}</p>
      </div>
      <div className={style.stripe_form}>
        <StripePayment></StripePayment>
      </div>
      
    </div>
  )
}

export default Payment