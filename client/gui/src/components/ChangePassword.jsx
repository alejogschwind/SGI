import React from 'react'

import { Input, Icon, Form, Button } from 'antd';

const { Password }= Input;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ChangePassword extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };


  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    return (
      <Form className="ChangePassword-form" onSubmit={this.handleSubmit}>
        <h2>Change Password</h2>

        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              }
            ],
          })(<Input.Password size="large"/>)}
        </Form.Item>
        
        <Form.Item label="New Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your new password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password size="large"/>)}
        </Form.Item>

        <Form.Item label="Confirm New Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your new password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} size="large"/>)}
        </Form.Item>

        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Change Password
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const ChangePasswordForm = Form.create({ name: 'change_password' })(ChangePassword);


export default ChangePasswordForm;