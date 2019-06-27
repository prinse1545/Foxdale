import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onAuthenticated, onUnAuthenticated } from '../actions/user'
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



const mapDispatchToProps = dispatch => ({
    onAuthenticated: user => dispatch(onAuthenticated(user)),
    onUnAuthenticated: () => dispatch(onUnAuthenticated())
})

const ConnectedPrivateRouteContainer = connect(null, mapDispatchToProps)(PrivateRouteContainer)

export default ConnectedPrivateRouteContainer
