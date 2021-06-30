import Axios from 'axios';
import { 
  ORDER_CREATE_FAIL, 
  ORDER_CREATE_REQUEST, 
  ORDER_CREATE_SUCCESS, 
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ALL_ORDER_LIST_REQUEST,
  ALL_ORDER_LIST_SUCCESS,
  ALL_ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL
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

export const payOrder = (order, paymentResult) => async(dispatch, getState) => {
  dispatch({
    type: ORDER_PAY_REQUEST,
    payload: { order, paymentResult }
  });

  const {userSignin: { userInfo }} = getState();
  try {

    const { data } = Axios.put(
      `/api/orders/${order._id}/pay`, 
      paymentResult, 
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data
    })
  } catch(err) {
    const message = 
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message
    });
  }
};

export const listOrder = () => async(dispatch, getState) => {
  dispatch({
    type: ORDER_LIST_REQUEST
  });
  const {userSignin: { userInfo }} = getState();

  try {

    const { data } = await Axios.get(`/api/orders/list`, {
      headers: { 
        Authorization: `Bearer ${userInfo.token}` 
      },
    });

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data
    });

  } catch(err) {

    const message = 
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

    dispatch({ 
      type: ORDER_LIST_FAIL,
      payload: message
    });
  }
};

export const listAllOrders = () => async (dispatch, getState) => {
  dispatch({
    type: ALL_ORDER_LIST_REQUEST
  });
  const {userSignin: { userInfo }} = getState();

  try {

    const { data } = await Axios.get('/api/orders/', {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });

    dispatch({
      type: ALL_ORDER_LIST_SUCCESS,
      payload: data
    });

  } catch(err) {

    const message = 
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

    dispatch({ 
      type: ALL_ORDER_LIST_FAIL,
      payload: message
    });
  }
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DELETE_REQUEST,
    payload: orderId
  });
  const {userSignin: {userInfo}} = getState();

  try {

    const { data } = await Axios.delete(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });

    dispatch({
      type: ORDER_DELETE_SUCCESS,
      payload: data
    });

  } catch(err) {

    const message = 
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

    dispatch({ 
      type: ORDER_DELETE_FAIL,
      payload: message
    });
  }
};