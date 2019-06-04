import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd'
import { loginWithFirebase } from '../../actions/auth'
import Firebase from '../../config/Firebase'

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
    marginBottom: 40
  }
}


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            open: false,
            errorMessage: ''
        }
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
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                const user = {
                    username: values.email,
                    password: values.password
                }

                this.props.loginWithFirebase(user)
                this.props.history.push('/home')
                // Firebase.auth().onAuthStateChanged(user => {
                //     if (user) {
                //       localStorage.setItem('authUser', JSON.stringify(user));
                //       this.props.history.push('/home')
                //     } else {
                //       localStorage.removeItem('authUser');
                //       console.log('An error has occurred')
                //     }
                // })

            }
        })
    }

    signUp = () => {
      this.props.history.push('/signup')
    }

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


        return (
            <div>
              <Row type="flex" justify="center" align="center" style={styles.row}>
                  <Col span={12} offset={6} style={styles.col}>
                      <img src='https://foxdale.s3.amazonaws.com/media/fox_head.png' />
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
                                      size='small'
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
                              })(<Checkbox>Remember me</Checkbox>)}
                              <Row>
                                  <Col span={4}>
                                      <Button type="primary" htmlType="submit">
                                          Log in
                                      </Button>
                                  </Col>
                              </Row>
                              Or <div onClick={this.signUp}>register now!</div>
                          </Form.Item>
                      </Form>
                  </Col>
              </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => ({
    loginWithFirebase: user => dispatch(loginWithFirebase(user))
})

const ConnectedLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default Form.create({ name: 'ConnectedLogin' })(ConnectedLogin)
