import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {isLogin} from './auth/index';

const PrivateRoute = ({component : Component,restricted,...rest}) => {
    return (
        <Route {...rest} render={props => ( 
            isLogin() && restricted ?
                <Component {...props} /> :
                <Redirect to='/login' />
        )} />
    );
}

export default PrivateRoute;