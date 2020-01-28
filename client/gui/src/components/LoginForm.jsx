import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import '../assets/statics/components/LoginForm.css'


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false
    }

    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState( { errors: {}, isLoading: true});
        this.props.authLogin(values.username, values.password)
          .then(
            (res) => {
              this.props.history.push('/profile/')
            }, // success
            ({response}) => {
              this.props.form.resetFields('password')
              this.setState({errors: response.data, isLoading:false})
              this.props.deleteAllFlashMessage()
              this.props.addFlashMessage({
                type: 'error',
                text: response.data.non_field_errors
              });
            } // rejected
          )
      }
    });
  };

  onClose = e => {
    console.log(e, 'I was closed.');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { errors, isLoading } = this.state;
    return (
      <>
        {/* {errors.non_field_errors && <Alert
          message={errors.non_field_errors}
          banner
          closable
          type="error"
        />} */}
        <Form onSubmit={this.handleSubmit} className="login-form">
          <h1>Login</h1>

          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
                size="large"
              />,
            )}
          </Form.Item>
          
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                size="large"
              />,
            )}
          </Form.Item>
          
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button size="large" disabled={isLoading} type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <Link to="/signup">register now!</Link>
          </Form.Item>
        </Form>
      </>
    );
  }
}

LoginForm.propTypes = {
  authLogin: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  deleteAllFlashMessage: PropTypes.func.isRequired,
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default WrappedNormalLoginForm;
