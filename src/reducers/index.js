import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import officeReducer from './officeReducer';
import partyReducer from './partyReducer';
import candidateReducer from './candidateReducer';
import { CLEAR_STATE } from '../constants/actionTypes';

const appReducer = combineReducers({
    loginReducer,
    signupReducer,
    officeReducer,
    partyReducer,
    candidateReducer
});

const rootReducer = (state, action) => {
    if (action.type === CLEAR_STATE) {
        state = appReducer({}, {});
    }
    return appReducer(state, action);
};

export default rootReducer;
