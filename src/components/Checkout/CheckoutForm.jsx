import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import './CheckoutForm.css'
import { ImSpinner9 } from 'react-icons/im'
import { useContext, useEffect, useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import PropTypes from 'prop-types'
// import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../AuthProvider/AuthProvider'

const CheckoutForm = ({  price }) => {
  const {user} = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements()
  const axiosSecure = useAxiosSecure()
  // const navigate = useNavigate()
  const [clientSecret, setClientSecret] = useState()
  const [cardError, setCardError] = useState('')
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    // fetch client secret
    if (price && price > 1) {
      getClientSecret({ price: price })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price])

  //   get clientSecret
  const getClientSecret = async price => {
    const { data } = await axiosSecure.post(`/create-payment-intent`, price)
    console.log('clientSecret from server--->', data)
    setClientSecret(data.clientSecret)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      setCardError('');
    }

    try {
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

      if (confirmError) {
        setCardError(confirmError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        const paymentInfo = {
          email: user?.email,
          price: paymentIntent.amount,
          role: 'pro-user',
          status: 'Verified',
          transactionId: paymentIntent.id,
        };
        console.log(paymentInfo);

        const { data } = await axiosSecure.put('/payment/pro-user', paymentInfo);
        console.log(data)

        await axiosSecure.patch(`/payment/pro-user/update/${user.email}`, {
          status: 'Verified',
          role: 'pro-user',
        });

        // refetch();
        toast.success('Your Payment Successful');
      }
    } catch (err) {
      console.log('Error confirming card payment:', err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      {' '}
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />

        <div className='flex mt-2 justify-around'>
          <button
            disabled={!stripe || !clientSecret || processing}
            type='submit'
            className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
          > 
            {processing ? (
              <ImSpinner9 className='animate-spin m-auto' size={24} />
            ) : (
              `Pay ${price}`
            )}
          </button>
         
        </div>
      </form>
      {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
    </>
  )
}

CheckoutForm.propTypes = {
  bookingInfo: PropTypes.object,
  price: PropTypes.object,
}

export default CheckoutForm