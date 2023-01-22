/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './components/CheckoutForm'
import { useSelector } from 'react-redux'
import { getUserLogged } from 'ui/redux/slices/authentication/authentication.selectors'
import { useRouter } from 'next/router'
import serviceRepository from 'infrastructure/repositories/service.repository'

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
)

export default function StripePayment () {
  const [clientSecret, setClientSecret] = useState('')
  const [intent, setIntent] = useState()
  const userLogged = useSelector(getUserLogged)
  const { query } = useRouter()

  React.useEffect(() => {
    if (query.order_id && query.order_path && userLogged?.uid && !intent) {
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
            console.log(data)
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
    clientSecret,
    appearance
  }

  return (
    <div style={{position: 'relative'}}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
