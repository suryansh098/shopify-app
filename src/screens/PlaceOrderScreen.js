import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';

const PlaceOrderScreen = (props) => {

  const cart = useSelector(state => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }

  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((acc, curr) =>
      acc + curr.qty * curr.price, 0
    )
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.028 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  
  const dispatch = useDispatch();
  const placeorderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  }

  useEffect(() => {
    if(success) {
      props.history.push(`/order/${order._id}`);
      dispatch({
        type: ORDER_CREATE_RESET
      });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">

                <h2>Shipping</h2>

                <div className="row">
                  <div><strong>Name :</strong></div>
                  <div> {cart.shippingAddress.fullName}</div>
                </div>

                <div className="row">
                  <div><strong>Address :</strong></div>
                  <div>{cart.shippingAddress.address}, 
                    {cart.shippingAddress.city}, 
                    {cart.shippingAddress.postalCode},
                    {cart.shippingAddress.country}
                  </div>
                </div>

              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {
                    cart.cartItems.map((item) => (
                      <li key={item.product}>

                        <div className="row">
                          {/* display item image */}
                          <div>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="small"
                            />
                          </div>

                          {/* display item name */}
                          <div className="min-30">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </div>

                          {/* display item price */}
                          <div>
                            {item.qty} x ${item.price} = ${item.qty * item.price}
                          </div>

                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>

              <li>
                <h2>Order Summary</h2>
              </li>

              <li>
                <div className="row">
                  <div>Items Total</div>
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Shipping Charge</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Tax Charge</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div></li>

              <li>
                <button
                  type="button"
                  onClick={placeorderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              { loading && <Loading></Loading> }
              { error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrderScreen;
