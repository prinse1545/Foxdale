// Philipp Moura Srivastava
// June 3 2019
// Filename: app/index.js
// Description: The root component that allows Foxdale to add/update
// testimonials and blogs
// Foxdale Inc.
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter,
    Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import Firebase from './config/Firebase';
import { onAuthenticated, onUnAuthenticated } from './actions/user';
import PrivateRouteContainer from './containers/privateRouteContainer';
import Login from './screens/login';
import Home from './screens/home';


class App extends Component {
  constructor(props) {
      super(props)

      this.state = {
          loggedIn: false
      }


      Firebase.auth().onAuthStateChanged(user => {
          if (user) {
              this.props.onAuthenticated(user)
              this.setState({ loggedIn: true })
          } else {
              this.props.onUnAuthenticated()
              this.setState({ loggedIn: false })
          }
      })
  }

  render() {
      const { loggedIn } = this.state;

      return (
        <div>
            <Router>
                <div>
                    <Route exact path="/" component={Login} />
                    <PrivateRouteContainer exact path="/home" component={Home} authenticated={loggedIn} />
                </div>
            </Router>
        </div>
      )
  }
}

const mapDispatchToProps = dispatch => ({
  onAuthenticated: user => dispatch(onAuthenticated(user)),
  onUnAuthenticated: () => dispatch(onUnAuthenticated())
})

const ConnectedApp = connect(
  null,
  mapDispatchToProps
)(App)

export default ConnectedApp
