import Axios from "axios";
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from '../contants/userConstants';

export const signin = (email, password) => async (dispatch) => {

  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password }
  });

  try {
    const { data } = await Axios.post(`/api/users/signin`, { email, password });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  catch (err) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {

  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { email, password }
  });

  try {
    const { data } = await Axios.post(`/api/users/register`, { name, email, password });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({
    type: USER_SIGNOUT
  });
};

export const detailsUser = () => async (dispatch, getState) => {
  dispatch({
    type: USER_DETAILS_REQUEST
  });
  const { userSignin: { userInfo } } = getState();

  try {

    const { data } = await Axios.get(`/api/users/${userInfo._id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });

  } catch (err) {

    const message = err.response && err.response.data.message
      ? err.response.data.message
      : err.message;

    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message
    });

  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {

  dispatch({
    type: USER_UPDATE_PROFILE_REQUEST,
    payload: user
  });
  const { userSignin: {userInfo}} = getState();

  try {

    const { data } = await Axios.put(`/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    });

    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));

  } catch(err) {

    const message = err.response && err.response.data.message
      ? err.response.data.message
      : err.message;

    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message
    });

  }
}