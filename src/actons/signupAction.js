import axios from 'axios';
import { reDirect } from '../utils/helper';
import {
    SIGNUP_SUCCESSFUL,
    SIGNUP_UNSUCCESSFUL,
    SET_LOADING_STATE
} from '../constants/actionTypes';

const signupAction = userData => (dispatch) => {
    dispatch({
        type: SET_LOADING_STATE,
        payload: true
    });
    return axios.post('/auth/signup', userData)
      .then((res) => {
          const { token } = res.data;
          localStorage.setItem('token', token);
          dispatch({ type: SIGNUP_SUCCESSFUL });
          reDirect(token);
      })
      .catch((error) => {
          dispatch({
              type: SIGNUP_UNSUCCESSFUL,
              error: error.response.data
          });
      });
};

export default signupAction;
