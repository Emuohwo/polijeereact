import {
    LOGIN_SUCCESSFUL,
    LOG_OUT_SUCCESS,
    SET_LOADING_STATE
} from '../constants/actionTypes';

const initialState = {
    success: false,
    user: {},
    loading: false
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESSFUL:
            return {
                ...state,
                success: true,
                loading: false
            };
        case SET_LOADING_STATE:
            return {
                ...state,
                loading: action.payload,
            };
        case LOG_OUT_SUCCESS:
            return {
                ...state,
                success: false
            };
        default:
            return {
                ...state
            };
    }
};

export default loginReducer;
