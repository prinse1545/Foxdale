import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Row, Col, Form, Icon, Input, Button, Checkbox, Modal, Alert, message } from 'antd'
import { loginWithFirebase, isUserLoggedIn, createAccountWithFirebase } from '../../actions/auth'
import Firebase from '../../config/Firebase'
import SignUpForm from '../../components/signUpForm'

const styles = {
  row: {
    backgroundColor: '#ffae19',
    paddingTop: '2%',
    paddingBottom: '8%'
  },
  col: {
    marginTop: '12%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '30%'
  },
  modalInput: {
    width: '60%'
  },
  img: {
    marginBottom: 20,
    height: 120,
    width: 120
  },
  text: {
    fontFamily: 'Avenir',
    color: '#fff'
  }
}





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

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        this.setState({ open: false })
    }


    hasErrors = fieldsError => {
        return Object.keys(fieldsError).some(field => fieldsError[field])
    }

    handleSubmit = e => {
        const { loggedIn, history } = this.props;
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                const user = {
                    username: values.email,
                    password: values.password
                }

                this.props.loginWithFirebase(user).then((user) => {
                  history.push('/home')
                }).catch((err) => {
                  message.error(err.message)
                })

                this.props.form.resetFields()

            }
        })
    }

    handleAccountCreation = info => {
      const { createAccountWithFirebase, history } = this.props;

      createAccountWithFirebase(info).then((user) => {

        this.setState({visible: false})
        history.push('/home')

      }).catch((err) => {
        this.setState({visible: false})
        message.error(err.message)
      })
    }

    signUp = () => {
      this.setState({
        visible: true,
      });
    }


    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };

    handleCancel = e => {
      console.log(e);
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
            <div>
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

const ConnectedLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default Form.create({ name: 'ConnectedLogin' })(ConnectedLogin)
