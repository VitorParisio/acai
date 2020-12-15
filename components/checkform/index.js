import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import { useState } from 'react'
import styles from './style.module.css'
import ClientForm from '../clientform'
import axios from 'axios'

export default function CheckForm({price, onSuccess}){
  const [isProcessing, setIsProccess] = useState(false)
  const [checkoutError, setCheckoutError] = useState()
  
  const stripe = useStripe();
  const elements = useElements();
  
  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
	
    const billingDetails = {
      'name': event.target.name.value,
      'email': event.target.email.value,
      'address':{
        'city': event.target.city.value,
        'state': event.target.state.value,
        'postal_code': event.target.postal_code.value
      }
    }
	
	setIsProccess(true)
	
    const {data: clientSecret} = await axios.post('/api/payment', {
      amount: price * 100
    })
  
    const cardElement = elements.getElement(CardElement);
	
	try {
		const paymentMethodReq = await stripe.createPaymentMethod({
		  type: 'card',
		  card: cardElement,
		  billing_details: billingDetails
		});
		
		if (paymentMethodReq.error) {
			setCheckoutError(paymentMethodReq.error.message);
			setProcessingTo(false);
        return;
      }
		
		const  confirmedCardPayment  = await stripe.confirmCardPayment(clientSecret, {
			payment_method: paymentMethodReq.paymentMethod.id
		  });
		  
		if (confirmedCardPayment.error) {
			setCheckoutError(confirmedCardPayment.error.message);
			setProcessingTo(false);
        return;
		}  
		console.log(confirmedCardPayment)
		onSuccess()  
	}
	catch(err){
		setCheckoutError(err.message)
	}
		
  };

  const cardElementOptions = {
    style:{
      base:{
        fontSize:'16px',
        color:'#FFF',
        "::placeholder":{
          color:'#FFF'
        }
      },
      invalid:{
        color: '#FFC7EE',
        iconColor: '#FFF'
      }
    },
    hidePostalCode: true
  }

  return (
    <form onSubmit={handleSubmit} className={styles.checkform}>
	  <ClientForm />
	  {checkoutError}
      <CardElement options={cardElementOptions} onChange={handleCardDetailsChange}/>
      <button type="submit" className={styles.btncheckform} disabled={isProcessing || !stripe}>
		  {isProcessing ? 'Aguarde...' : `Total: R$${price}`}
      </button>
    </form>
  );
};