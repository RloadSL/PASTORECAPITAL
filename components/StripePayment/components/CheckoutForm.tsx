import React from 'react'
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import ButtonApp from 'components/ButtonApp'
import { useRouter } from 'next/router'
import Loading from 'components/Loading'
import style from './checkoutForm.module.scss'


export default function CheckoutForm () {
  const stripe = useStripe()
  const elements = useElements()
  const { query } = useRouter()
  const [email, setEmail] = React.useState('')
  const [message, setMessage] = React.useState<string | undefined>()
  const [isLoading, setIsLoading] = React.useState(false)
  
  React.useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!')
          break
        case 'processing':
          setMessage('Your payment is processing.')
          break
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.')
          break
        default:
          setMessage('Something went wrong.')
          break
      }
    })
  }, [stripe])

  const handleSubmit = async (e: any) => {
    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    const confirmation = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_HOST}/tax-consultant/consultants/${query.id}/services/${query.service_id}//confirmed_payment`
      }
    })
    setMessage(confirmation.error.message)
    setIsLoading(false)
  }

  const paymentElementOptions: any = {
    layout: 'tabs'
  }

  return (
    <div className={style.formContainer}>
    <form id='payment-form'>
      <PaymentElement id='payment-element' options={paymentElementOptions} />

      {!isLoading && stripe && elements && (
        <ButtonApp
          buttonStyle={'primary'}
          type='button'
          labelID='btn.pay'
          onClick={handleSubmit}
        />
      )}

    </form>
          {/* Show any error or success messages */}
          {message && <div id='payment-message'>{message}</div>}
      <Loading loading={isLoading} variant='inner-primary' />
    </div>
  )
}
