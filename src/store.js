import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import reducers from './reducers/index';
import { loginSuccessful } from './actions/loginAction';


const enhancers = [];
let middleware = {};


middleware = applyMiddleware(thunk);


const store = createStore(reducers, {}, compose(middleware, ...enhancers));

if (localStorage.token) {
    store.dispatch(loginSuccessful(jwt.decode(localStorage.token)));
}

export default store; 
