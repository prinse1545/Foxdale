// Philipp Moura Srivastava
// 4 Juni 2019
// Filename: LoginRouteContainer.js
// Description: defines route to login page
// ++++++++++++++++++++++++++++++++++++++++++++++
import React from 'react';
import { Redirect, Route } from 'react-router-dom';


const LoginRouteContainer = ({ component: Component, authenticated, ...rest }) => {

  return (
    <Route
        {...rest}
        render={props =>

            authenticated === true ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />

  )
}

export default LoginRouteContainer;
