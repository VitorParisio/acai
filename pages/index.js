import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import AcaiNumber from '../components/acainumber'
import CheckForm from '../components/checkform'
import getAcaiPrice from '../utils/get-number-acai'
import {useState} from 'react'
import Router from "next/router";


const stripePromise = loadStripe('pk_test_51HyP7lK6h3MdWfr8JolWhGWGHOnyg32MMdetevAFuOAFBeMnObn8wfOwIR999OM2FyV1nhPUKvNNgrhf7yUqP1KR00g8Qj82ZD');

const Home = (props) => {
  const [number, setNumber] = useState(1)

  const addNumber = () => setNumber(number + 1)
  const removeNumber = () => setNumber(number - 1)

  return (
     <div className="container">
      <Elements stripe={stripePromise}>
          <AcaiNumber addNumber={addNumber} currentNumber={number} removeNumber={removeNumber}/>
          <CheckForm price={getAcaiPrice(number)} onSuccess={() => Router.push("/success")}/>
      </Elements>

      <style jsx>{`
        .container {
          display:flex;
          flex-direction:column;
          align-items:center;
        }
        .
      `}</style>
    </div>
  )
}
export default Home