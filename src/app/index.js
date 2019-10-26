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
import PrivateRouteContainer from './containers/privateRouteContainer';
import LoginRouteContainer from './containers/loginRouteContainer';
import Login from './screens/login';
import Home from './screens/home';


class App extends Component {
  constructor(props) {
      super(props)

      const loggedIn = Boolean(localStorage.getItem("loggedIn"))

      this.state = {
          loggedIn: loggedIn
      }


      Firebase.auth().onAuthStateChanged(user => {
          if (user) {
              localStorage.setItem("loggedIn", true)
              this.setState({ loggedIn: true })
          } else {
              localStorage.setItem("loggedIn", false)
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
                    <LoginRouteContainer exact path="/" component={Login} authenticated={!loggedIn} />
                    <PrivateRouteContainer exact path="/home" component={Home} authenticated={loggedIn} />
                </div>
            </Router>
        </div>
      )
  }
}


export default App
