import Axios from "axios";
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from '../contants/userConstants';

export const signin = (email, password) => async (dispatch) => {

    dispatch({
        type: USER_SIGNIN_REQUEST,
        payload: { email, password }
    });

    try {
        const {data} = await Axios.post(`/api/users/signin`, { email, password });
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    catch(err) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: 
                err.response && err.response.data.message 
                    ? err.response.data.message
                    : err.message
        });
    }
}

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    dispatch({
        type: USER_SIGNOUT
    });
}