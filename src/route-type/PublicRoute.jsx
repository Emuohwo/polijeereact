import React from 'react';
import PropTypes from 'react-proptypes';
import { Route, Redirect } from "react-router-dom";


const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('token') 
          ? <Redirect to={{ pathname: '/', state: { from: props.location } }} /> 
          : <Component {...props} />
    )} />
);


PublicRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
};


export default PublicRoute;
