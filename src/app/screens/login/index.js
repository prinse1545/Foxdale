// Philipp Moura Srivastava
// 4 Juni 2019
// Filename: home/index.js
// Description: The login page made for foxdale blog and testimonial
// mangement.
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Row, Col, Form, Icon, Input, Button, Checkbox, Modal, Alert, message } from 'antd'
import { loginWithFirebase, isUserLoggedIn, createAccountWithFirebase } from '../../actions/auth'
import Firebase from '../../config/Firebase'
import SignUpForm from '../../components/signUpForm'

import styles from './styles'





class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            open: false,
            errorMessage: '',
            visible: false
        }

      this.props.isUserLoggedIn()
    }


    handleClose = (event, reason) => {
      // Method: handleClose, handles closing modal
      //
      // Parameter(s):
      //
      //   event - the event
      //   reason - reason for closure
      //
      // Return Value(s):
      //
      //   None
        if (reason === 'clickaway') {
            return
        }

        this.setState({ open: false }) //Changing modal
    }


    hasErrors = fieldsError => {
      // Method: hasErrors, checks if form has errors
      //
      // Parameter(s):
      //
      //   fieldsError - error for fields
      //
      // Return Value(s):
      //
      //   None
        return Object.keys(fieldsError).some(field => fieldsError[field])
    }

    handleSubmit = e => {
      // Method: handleSubmit, handles login
      //
      // Parameter(s):
      //
      //   e - event
      //   and uses props of loggedIn and history
      //
      // Return Value(s):
      //
      //   None
        const { loggedIn, history } = this.props;
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                //Creating user object
                const user = {
                    username: values.email,
                    password: values.password
                }
                //Logging in with firebase
                this.props.loginWithFirebase(user).then((user) => {
                  history.push('/home')//Changing history
                }).catch((err) => {
                  message.error(err.message)
                })

                this.props.form.resetFields()//Reseting fields

            }
        })
    }

    handleAccountCreation = info => {
      // Method: handleAccountCreation, handles creating account
      //
      // Parameter(s):
      //
      //   info - object containing email and password as fields
      //
      // Return Value(s):
      //
      //   None
      const { createAccountWithFirebase, history } = this.props;
      //Creating account with firebase
      createAccountWithFirebase(info).then((user) => {

        this.setState({visible: false})
        history.push('/home')//Changing history

      }).catch((err) => {
        this.setState({visible: false})
        message.error(err.message)
      })
    }

    signUp = () => {
      // Method: signUp, toggle modal so user can sign up
      //
      // Parameter(s):
      //
      //   None
      //
      // Return Value(s):
      //
      //   None
      this.setState({
        visible: true,
      });
    }



    handleCancel = e => {
      // Method: handleCancel, handles cancel onSignup modal (toggles it)
      //
      // Parameter(s):
      //
      //  e - event passed automtaically
      //
      // Return Value(s):
      //
      //   None
      this.setState({
        visible: false,
      });
    };

    render() {

        const {
            getFieldDecorator,
            getFieldError,
            isFieldTouched
        } = this.props.form

        // Only show error after a field is touched.
        const userNameError =
            isFieldTouched('userName') && getFieldError('userName')
        const passwordError =
            isFieldTouched('password') && getFieldError('password')

        const { visible } = this.state;

        return (
            <div style={styles.container}>
              <Row type="flex" justify="center" align="middle" style={styles.row}>
                  <Col span={12} align="center" style={styles.col}>
                      <img src='https://foxdale.s3.amazonaws.com/media/fox_head.png' style={styles.img} />
                      <Form onSubmit={this.handleSubmit}>
                          <Form.Item>
                              {getFieldDecorator('email', {
                                  rules: [
                                      {
                                          required: true,
                                          message: 'Please input your email'
                                      }
                                  ]
                              })(
                                  <Input
                                      prefix={
                                          <Icon
                                              type="user"
                                              style={{ color: 'rgba(0,0,0,.25)' }}
                                          />
                                      }
                                      placeholder="Email"
                                      style={styles.input}
                                  />
                              )}
                          </Form.Item>
                          <Form.Item>
                              {getFieldDecorator('password', {
                                  rules: [
                                      {
                                          required: true,
                                          message: 'Please input your password'
                                      }
                                  ]
                              })(
                                  <Input
                                      prefix={
                                          <Icon
                                              type="lock"
                                              style={{ color: 'rgba(0,0,0,.25)' }}
                                          />
                                      }
                                      type="password"
                                      placeholder="Password"
                                      style={styles.input}
                                  />
                              )}
                          </Form.Item>
                          <Form.Item>
                              {getFieldDecorator('remember', {
                                  valuePropName: 'checked',
                                  initialValue: true
                              })(<Checkbox style={styles.text}>Remember me</Checkbox>)}
                              <Row>
                                <Button type="primary" htmlType="submit">
                                    Log in
                                </Button>
                              </Row>
                              <div onClick={this.signUp} style={styles.text}>Create New User</div>
                          </Form.Item>
                      </Form>
                  </Col>
              </Row>
              <Modal
                title="Create New Account"
                visible={visible}
                align="center"
                onCancel={this.handleCancel}
                footer={[]}
              >
                <SignUpForm onSubmit={this.handleAccountCreation}/>
              </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      loggedIn: state.auth.loggedIn
    }
}

const mapDispatchToProps = dispatch => ({
    loginWithFirebase: user => dispatch(loginWithFirebase(user)),
    isUserLoggedIn: () => dispatch(isUserLoggedIn()),
    createAccountWithFirebase: (accountInfo) => dispatch(createAccountWithFirebase(accountInfo))
})


//Connecting redux
const ConnectedLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)


//Exporting module with form
export default Form.create({ name: 'ConnectedLogin' })(ConnectedLogin)
