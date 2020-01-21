import {
    SIGNUP_SUCCESSFUL, 
    SIGNUP_UNSUCCESSFUL, 
    SET_LOADING_STATE,
} from '../constants/actionTypes';

const initialState = {
    success: false,
    errors: null,
    loading: false
};

const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_SUCCESSFUL:
            return {
                ...state,
                success: true,
                errors: null,
                loading: false
            };
        case SIGNUP_UNSUCCESSFUL:
            return {
                ...state,
                success:false,
                errors: action.error
            };
        case SET_LOADING_STATE:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};

export default signupReducer;
