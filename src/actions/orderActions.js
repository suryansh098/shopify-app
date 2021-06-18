import Axios from 'axios';
import { 
  ORDER_CREATE_FAIL, 
  ORDER_CREATE_REQUEST, 
  ORDER_CREATE_SUCCESS, 
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS
} from "../contants/orderConstants"
import { CART_EMPTY } from '../contants/cartConstants';

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_CREATE_REQUEST,
    payload: order
  });

  try {

    const {userSignin: { userInfo }} = getState();
    
    const { data } = await Axios.post('/api/orders', order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      }
    });

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data.order
    });

    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');

  } catch(err) {

    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: 
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    });

  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DETAILS_REQUEST,
    payload: orderId
  });

  const {userSignin: { userInfo }} = getState();
  
  try {

    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data
    });

  } catch(err) {

    const message = 
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message
    });

  }
};