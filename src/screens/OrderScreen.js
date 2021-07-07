import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderScreen = (props) => {

  const orderId = props.match.params.id;
  const [ sdkReady, setSdkReady ] = useState(false);

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector(state => state.orderPay);
  const { 
    error: errorPay,
    loading: loadingPay, 
    success: successPay 
  } = orderPay;
  const dispatch = useDispatch();

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  useEffect(() => {

    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if(!order.isPaid) {
        if(!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }

  }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return (
    loading ? (
      <Loading></Loading>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
    <div>
      <h1>Order Id : {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">

                <h2>Shipping</h2>

                <div className="row">
                  <div><strong>Name :</strong></div>
                  <div> {order.shippingAddress.fullName}</div>
                </div>

                <div className="row">
                  <div><strong>Address :</strong></div>
                  <div>{order.shippingAddress.address}, 
                    {order.shippingAddress.city}, 
                    {order.shippingAddress.postalCode},
                    {order.shippingAddress.country}
                  </div>
                </div>

                { 
                  order.isDelivered ? 
                  <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox> :
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                }

              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                { 
                  order.isPaid ? 
                  <MessageBox variant="success">Paid at {order.paidAt}</MessageBox> :
                  <MessageBox variant="danger">Not Paid</MessageBox>
                }
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {
                    order.orderItems.map((item) => (
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
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Shipping Charge</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Tax Charge</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>

              {
                !order.isPaid && (
                  <li>
                    {!sdkReady ? (
                      <Loading></Loading>
                    ) : (
                      <>
                      { errorPay && (<MessageBox variant='danger'>{error}</MessageBox>) }
                      { loadingPay && (<Loading></Loading>) }
                      <PayPalButton 
                        amount={order.totalPrice} 
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                      </>
                    )}
                  </li>
                )
              }

              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <Loading></Loading>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Deliver Order
                  </button>
                </li>
              )}

            </ul>
          </div>
        </div>
      </div>
    </div>
  )
  )
};

export default OrderScreen;
