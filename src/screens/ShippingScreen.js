import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    props.history.push("/payment");
  };

  return (
    <div className="max-width">
      <CheckoutSteps step1 step2></CheckoutSteps>

      <div className="shipping card card-body">
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h2 className="subtitle">Shipping Details</h2>
          </div>

          <div>
            <label htmlFor="fullName">Full Name :</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="address">Address :</label>
            <input
              type="text"
              id="address"
              placeholder="Enter address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="city">City :</label>
            <input
              type="text"
              id="city"
              placeholder="Enter city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="postalCode">Postal Code :</label>
            <input
              type="text"
              id="postalCode"
              placeholder="Enter postal code"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="country">Country :</label>
            <input
              type="text"
              id="country"
              placeholder="Enter country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              required
            />
          </div>

          <div>
            <label />
            <button type="submit" className="primary mb-2">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;
