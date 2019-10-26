// Philipp Moura Srivastava
// 4 Juni 2019
// Filename: LoginRouteContainer.js
// Description: defines route to home page
// ++++++++++++++++++++++++++++++++++++++++++++++
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import Firebase from '../config/Firebase'

class PrivateRouteContainer extends Component {
  constructor(props) {
    super(props);


  }

  render() {
    const { component: Component, authenticated, ...rest } = this.props

    return(
      <Route
          {...rest}
          render={props =>

              authenticated === true ? (
                  <Component {...props} />
              ) : (
                  <Redirect
                      to={{
                          pathname: '/',
                          state: { from: props.location }
                      }}
                  />
              )
          }
      />
    );
  }
};




export default PrivateRouteContainer
