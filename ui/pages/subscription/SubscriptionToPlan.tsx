import StripePayment from 'components/StripePayment'
import systemRepository from 'infrastructure/repositories/system.repository'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import style from './subscriptionPlans.module.scss'

const SubscriptionToPlan = () => {
  const [clientSecret, setClientSecret] = useState()
  const [intent, setIntent] = useState<any>()
  const { query, replace } = useRouter()
  const userLoggued = useSelector(getUserLogged)
  useEffect(() => {
    let fetch = true
    if (
      userLoggued?.userDataToken &&
      query.payment_type &&
      query['plan-subscription']
    ) {
      systemRepository
        .hirePlansSubscription({
          plan_name: query['plan-subscription'] as any,
          interval: query.payment_type as any,
          uid: userLoggued.uid
        })
        .then(res => {
          if (fetch) {
            if (res?.clientSecret) {
              setClientSecret(res.clientSecret)
              setIntent(res.payment_intent)
            } else {
              console.error('Plan not enabled')
              replace('/subscription')
            }

          }
        })
    }

    return () => {
      fetch = false
    }
  }, [userLoggued, query.payment_type, query.plan_subscription])

  return (
    <div className={style.subscriptionToPlan}>
      <div className={style.subscriptionToPlan_info}>
        <p className={style.title}>
          <span>Plan </span>
          <span>{query['plan-subscription']}</span>
        </p>
        <p className={style.textInfo}>Completa el proceso de suscripción y comienza
          a formar parte de nuestra comunidad</p>
        {intent && (<div className={style.planPrice}>
          <p className={style.labelPlan}>
            Precio {query.payment_type === 'month' ? 'mensual' : 'anual'}
          </p>
          <p className={style.pricePlan}>
            {intent.amount / 100} €
          </p>
          <small>IVA incluido</small>
        </div>)}
      </div>
      <div className={style.subscriptionToPlan_form}>
        <div className={style.payment_form}>
          <div className={`${style.stripe_form}`}>
            <StripePayment clientSecretParam={clientSecret} />
          </div>
        </div>
      </div>


    </div>
  )
}

export default SubscriptionToPlan
