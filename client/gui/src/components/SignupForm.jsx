import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../assets/statics/components/SignupForm.css'
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      isLoading: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({errors: {}, isLoading: true});
        console.log(values)
        this.props.authSignup(values.username, values.email, values.password1, values.password2)
        .then(
          () => {
            this.props.deleteAllFlashMessage()
            this.props.addFlashMessage({
              type: 'success',
              text: 'You signed up successfully! Now you need to confirm your email address. Check your email!'
            })
            this.props.history.push('/login');
          }, //success
          ({response}) => {
            this.props.deleteAllFlashMessage()
            if (response.data.non_field_errors) {
              this.props.addFlashMessage({
                type: 'error',
                text: response.data.non_field_errors
              });
            }
            if (response.data.username) {
              this.props.addFlashMessage({
                type: 'error',
                text: response.data.username
              });
            }
            if (response.data.email) {
              this.props.addFlashMessage({
                type: 'error',
                text: response.data.email
              });
            }
            if (response.data.password1) {
              this.props.addFlashMessage({
                type: 'error',
                text: response.data.password1
              });
            }
            this.setState({isLoading:false})  // rejection
          }
        )
      }
    })
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password1')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['password2'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { errors, isLoading } = this.state;
    return (
      <>
        {/* {errors.non_field_errors && <Alert
            // message={errors.non_field_errors}
            description={errors.non_field_errors}
            type="error"
            closable
            onClose={this.onClose}
            showIcon
        />}
        {errors.username && <Alert
            // message={errors.username}
            description={errors.username}
            type="error"
            closable
            onClose={this.onClose}
            showIcon
        />}
        {errors.email && <Alert
            // message={errors.email}
            description={errors.email}
            type="error"
            closable
            onClose={this.onClose}
            showIcon
        />}
        {errors.password1 && <Alert
            // message={errors.password1}
            description={errors.password1}
            type="error"
            closable
            onClose={this.onClose}
            showIcon
        />} */}
        <Form onSubmit={this.handleSubmit} className="signup-form">
          <h1>Signup</h1>

          <Form.Item label="Username">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Write your username..."
                size="large"
              />,
            )}
          </Form.Item>

          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Write your email..."
                size="large"
              />
            )}
          </Form.Item>

          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password1', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(
              <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Write your password..."
                size="large"
              />
            )}
          </Form.Item>
          
          <Form.Item label="Password Confirmation" hasFeedback>
            {getFieldDecorator('password2', {
              rules: [
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(
              <Input.Password
                onBlur={this.handleConfirmBlur}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Write the same password..."
                size="large"
              />
            )}
          </Form.Item>

          <Form.Item>
            <Button size="large" disabled={isLoading} type="primary" htmlType="submit" className="login-form-button">
              Singup
            </Button>
            Or <Link to="/login">login now!</Link>
          </Form.Item>
        </Form>
      </>
    )
  }
}

SignupForm.propTypes = {
  authSignup: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
}

const WrappedNormalSignupForm = Form.create({ name: 'normal_signup' })(SignupForm);


export default WrappedNormalSignupForm;