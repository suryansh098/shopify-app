import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <div className="max-width">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="payment-method card card-body">
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h2 className="subtitle">Payment Method</h2>
          </div>
          <div>
            <div className="mb-1">
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

            <div className="mb-1">
              <input
                type="radio"
                name="paymentMethod"
                id="strive"
                value="Strive"
                onChange={(event) => setPaymentMethod(event.target.value)}
              />
              <label htmlFor="strive">Stripe</label>
            </div>
          </div>

          <div>
            <button type="submit" className="primary mb-2">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
