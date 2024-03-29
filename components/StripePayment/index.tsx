/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './components/CheckoutForm'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { useRouter } from 'next/router'
import serviceRepository from 'infrastructure/repositories/service.repository'
import Loading from 'components/Loading'
import Card from 'components/Card'
import { AppDispatch } from 'ui/redux/store'
import { useDispatch } from 'react-redux'
import { client_secret, intentPayment } from 'ui/redux/slices/stripe/stripe.selectors'
import { cleanStripe, setClientSecret, setIntentPayment } from 'ui/redux/slices/stripe/stripe.slice'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
)

export default function StripePayment ({
  clientSecretParam
}: {
  clientSecretParam?: string
}) {
  const clientSecret = useSelector(client_secret)
  const intent = useSelector(intentPayment)
  const dispatch = useDispatch<AppDispatch>()

  const userLogged = useSelector(getUserLogged)
  const { query, push, asPath } = useRouter()

  useEffect(() => {
    if (userLogged?.uid === 'not-logged') {
      push({ pathname: '/login', query: { redirect: asPath } })
    }
    //console.log('serviceRepository.loading', serviceRepository.loading )

    if (
      query.order_id &&
      query.order_path &&
      userLogged?.stripe_cu_id &&
      !intent &&
      !clientSecretParam
    ) {
      dispatch(cleanStripe())
      if(!serviceRepository.loading)
      serviceRepository
        .hireServiceIntent({
          customer: userLogged.stripe_cu_id,
          receipt_email: userLogged.email,
          metadata: {
            uid: userLogged.uid,
            user_fullname: `${userLogged.name} ${userLogged.lastname}`,
            user_email: userLogged.email,
            order_id: query.order_id,
            order_path: query.order_path
          }
        })
        .then(data => {
          if (data) {
            dispatch(setClientSecret(data.client_secret))
            dispatch(setIntentPayment(data))
            serviceRepository.loading = false
          }
        })
    }
  }, [query, userLogged?.stripe_cu_id])

  const appearance = {
    theme: 'stripe'
  }
  const options: any = {
    clientSecret: clientSecretParam || clientSecret,
    appearance
  }
  return (
    <Card>
      {clientSecret || clientSecretParam ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <div style={{ minHeight: '20vh' }}>
          <Loading loading={true} variant='inner-primary' />
        </div>
      )}
    </Card>
  )
}
