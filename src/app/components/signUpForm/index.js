import React, { Component } from 'react';
import { Input, Form, Icon, message, Button } from 'antd';
import { accountCreationKey } from '../../../../package.json'

const styles = {
  modalInput: {
    width: '60%'
  }
}


const SignUpForm = (props) => {

  const { onSubmit, form } = props;
  const { getFieldDecorator } = form;

  const createAccount = e => {

    e.preventDefault()

    props.form.validateFields((err, values) => {
      if(!err) {
        const info = {
          email: values.email,
          password: values.password
        }
        onSubmit(info)

        props.form.resetFields()
      }
    })
  }

  const test = () => console.log('hi')

  const validateKey = (rule, value, callback) => {

    const { form } = props;

    if(accountCreationKey !== form.getFieldValue('creationKey')) {

      callback('The key is not correct')

    }
    else {
      callback()
    }

  }

  return (
      <Form onSubmit={createAccount}>
        <Form.Item>
          {
            getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: "Please provide an email for the new account"
                }
              ]
            })(
              <Input
                  prefix={
                      <Icon
                          type="mail"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                      />
                  }
                  placeholder="Email"
                  style={styles.modalInput}
              />
            )
          }
        </Form.Item>
        <Form.Item>
            {getFieldDecorator('password', {
                rules: [
                    {
                        required: true,
                        message: 'Please input a password'
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
                    style={styles.modalInput}
                />
            )}
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('creationKey', {
              rules: [
                {
                  required: true,
                  message: "Please provide a security key"
                },
                {
                  validator: validateKey,
                }
              ]
            })(
              <Input
                  prefix={
                      <Icon
                          type="key"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                      />
                  }
                  placeholder="Key"
                  style={styles.modalInput}
              />
            )
          }
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
              Sign Up
          </Button>
        </Form.Item>
      </Form>
  )
}

export default Form.create({ name: 'SignUpForm' })(SignUpForm)
