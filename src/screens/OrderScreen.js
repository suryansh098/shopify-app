import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';

export const OrderScreen = (props) => {

  const orderId = props.match.params.id;
  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsOrder(orderId))
  }, [dispatch, orderId]);

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

              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
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
                </div></li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  )
  )
}
