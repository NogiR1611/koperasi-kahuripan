import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import LoginAdmin from './pages/admin/LoginAdmin.js';
import Admin from './pages/admin/AdminRouter.js';
import PrivateRoute from './privateRoute.js';


function Router(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/login' component={LoginAdmin} />
                <PrivateRoute path='/'  restricted={true} component={Admin} />
                <PrivateRoute path='/admin'  restricted={true} component={Admin} />
            </Switch>
        </BrowserRouter>
        );
    }

export default Router;