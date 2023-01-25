import StripePayment from 'components/StripePayment'
import systemRepository from 'infrastructure/repositories/system.repository'
import React, { useEffect, useState } from 'react'
import style from './subscriptionPlans.module.scss'



const SubscriptionToPlan = () => {
  const [clientSecret, setClientSecret] = useState()

  useEffect(() => {
    let fetch = true
    systemRepository.hirePlansSubscription({plan_name:'Basic', interval: 'month'})
    .then((res) => {
      if(fetch){
        setClientSecret(res.clientSecret)
      }
    })
    return () => {
      fetch = false;
    }
  }, [])
  

  return (
    <div>
      <div>
        Datos de la subscripción
      </div>
      <div className={style.payment_form}>
        <div className={`${style.stripe_form}`}>
          <StripePayment clientSecretParam={clientSecret}/>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionToPlan