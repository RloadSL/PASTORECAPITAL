/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './components/CheckoutForm'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { useRouter } from 'next/router'
import serviceRepository from 'infrastructure/repositories/service.repository'
import Loading from 'components/Loading'
import Card from 'components/Card'


const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
)

export default function StripePayment ({clientSecretParam}:{clientSecretParam?: string}) {
  const [clientSecret, setClientSecret] = useState('')
  const [intent, setIntent] = useState()
  const userLogged = useSelector(getUserLogged)
  const { query } = useRouter()

  React.useEffect(() => {
    if (query.order_id && query.order_path && userLogged?.uid && !intent && !clientSecretParam) {
      serviceRepository
        .hireServiceIntent({
          currency: 'eur',
          payment_method_types: ['card'],
          metadata: {
            uid: userLogged.uid,
            user_fullname: `${userLogged.name} ${userLogged.lastname}`,
            user_email: userLogged.email,
            order_id: query.order_id,
            order_path: query.order_path
          }
        })
        .then(data => {
          if(data) {
            setClientSecret(data.client_secret);
            setIntent(data);
          }
        })
    }
  }, [query, userLogged?.uid])

  const appearance = {
    theme: 'stripe'
  }
  const options: any = {
    clientSecret : clientSecretParam || clientSecret,
    appearance
  }

  return (
    <Card>
      {(clientSecret || clientSecretParam) ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : <Loading loading={true} variant='inner-primary'/>}
    </Card>
  )
}
