import React, { Component } from 'react';
import { Input, Form, Icon } from 'antd';

const styles = {
  modalInput: {
    width: '60%'
  }
}


const SignUpForm = (props) => {

  const { onSubmit, form } = props;
  const { getFieldDecorator } = form;

  return (
      <Form onSubmit={onSubmit}>
        <Form.Item>
          {
            getFieldDecorator('modalEmail', {
              rules: [
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
            {getFieldDecorator('modalPassword', {
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
            getFieldDecorator('modalKey', {
              rules: [
                {
                  required: true,
                  message: "Please provide a security key"
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
      </Form>
  )
}

export default Form.create({ name: 'SignUpForm' })(SignUpForm)
