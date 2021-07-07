import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listAllOrders } from '../actions/orderActions';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

const OrderListScreen = (props) => {

  const allOrdersList = useSelector(state => state.allOrdersList);
  const { loading, error, orders } = allOrdersList;
  
  const orderDelete = useSelector(state => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = orderDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listAllOrders());
  }, [dispatch, successDelete]);

  const deleteHandler = (order) => {
    if (window.confirm('Are you sure you want to delete this order ?')) {
      dispatch(deleteOrder(order._id));
    }
  };

  return (
    <div>
      <h1>Orders</h1>

      {loadingDelete && <Loading></Loading>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">

          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid 
                    ? order.paidAt.substring(0, 10) 
                    : 'No'}
                </td>
                <td>
                {order.isDelivered 
                    ? order.deliveredAt.substring(0, 10) 
                    : 'No'}
                </td>
                <td>
                  <button 
                    type="button" 
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button 
                    type="button" 
                    className="small"
                    onClick={() => deleteHandler(order)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
};

export default OrderListScreen;
