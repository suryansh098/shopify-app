import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = (props) => {

  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  }
  return (
    <div>
      <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input 
              type="radio" 
              name="paymentMethod" 
              id="paypal" 
              value="PayPal" 
              required 
              checked
              onChange={(event) => setPaymentMethod(event.target.value)}  
            />
            <label htmlFor="paypal">PayPal</label>
          </div>

          <div>
            <input 
              type="radio" 
              name="paymentMethod" 
              id="strive" 
              value="Strive"
              onChange={(event) => setPaymentMethod(event.target.value)}  
            />
            <label htmlFor="strive">Strive</label>
          </div>
        </div>

        <div>
          <button type="submit" className="primary">Continue</button>
        </div>
      </form>
    </div>
  )
};

export default PaymentScreen;
