import React from 'react';
import PropTypes from 'prop-types';

import { Form, Icon, Input, Button} from 'antd';
// import '../assets/statics/components/VerifyEmailForm.css'


class VerifyEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState( { isLoading: true });
        this.props.userVerifyEmailConfirm(values)
        .then(
          (res) => {
            this.props.history.push('/login')
          }, // success
          ({response}) => {
            console.log(response);
            this.setState({ isLoading:false})
          } // rejected
        )
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1>Verify Email</h1>

        <Form.Item>
          {getFieldDecorator('key', {
            rules: [{ required: true, message: 'Por favor ingrese la clave que enviamos a to email!' }],
          })(
            <Input
              prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Key"
            />,
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="verify-form-button">
              Verify
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

VerifyEmail.propTypes = {
  userVerifyEmailConfirm: PropTypes.func.isRequired,
}

const VerifyEmailForm = Form.create({ name: 'verify_email' })(VerifyEmail);

export default VerifyEmailForm;
