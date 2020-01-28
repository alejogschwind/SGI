import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { authSetCurrentUser } from '../../../actions/authActions';
import { updateEmergencyContact } from '../../../actions/updateProfileActions';
import { openNotification } from '../PersonalForm';

import { Form, Input, Select, Button, Icon } from 'antd';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loading:true})
        const id = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        this.props.updateEmergencyContact(values, id)
          .then(
            (res) => {

              this.setState({loading: false})
              this.props.authSetCurrentUser(token)
              openNotification('success', 'Contacto de Emergencia Guardado!')
            }
          )
      }
    })
  }

  render() {
    const { contact } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '54',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="54">+54</Option>
      </Select>,
    );

    const genderSelector = (
      <Select  size="large">
        <Option value="f">Femenino</Option>
        <Option value="m">Masculino</Option>
        <Option value="o">Otro</Option>
      </Select>
      );
    return (
      <Form>
        <Form.Item label="Nombre de su contacto de emergencia:">
          {getFieldDecorator('first_name', {
            initialValue: contact.first_name,
            rules: [
              {
                required: true,
                message: 'Por favor ingrese el nombre de su contacto de emergencia!',
              }
            ],
          })(
            <Input
              size="large"
              name="first_name"
              maxLength={40}
              />
            )
          }
        </Form.Item>

        <Form.Item label="Apellido de su contacto de emergencia:">
          {getFieldDecorator('last_name', {
            initialValue: contact.last_name,
            rules: [
              {
                required: true,
                message: 'Por favor ingrese el apellido de su contacto de emergencia!',
              }
            ],
          })(
            <Input
              size="large"
              name="last_name"
              maxLength={40}
              />
            )
          }
        </Form.Item>

        <Form.Item label="Relación con su contacto de emergencia:">
          {getFieldDecorator('relationship', {
            initialValue: contact.relationship,
            rules: [
              {
                required: true,
                message: 'Por favor ingrese la relación con su contacto de emergencia!',
              }
            ],
          })(
            <Input
              size="large"
              name="relationship"
              maxLength={20}
              />
            )
          }
        </Form.Item>

        <Form.Item label="Numero de telefono:">
          {getFieldDecorator('phone_number', {
            initialValue: contact.phone_number,
            rules: [
              {
                required: true,
                message: 'Por favor ingrese el numero de telefono de su contacto de emergencia!',
              }
            ],
          })(
            <Input
              size="large"
              name="phone_number"
              maxLength={40}
              addonBefore={prefixSelector}
              />
            )
          }
        </Form.Item>

        <Button
          type="primary"
          size="large"
          className="Form_btn"
          disabled={this.state.loading}
          onClick={this.handleSubmit}>
          { this.state.loading ? <Icon type="loading" />
            :
            "Guardar"
          }
        </Button>
        <Button
          type="secondary"
          size="large"
          className="Form_btn"
          onClick= {() => {window.history.back()}}
        >
          Volver
        </Button>
      </Form>
    );
  }
}


ContactForm.propTypes = {
  
};

const WrappedContactForm = Form.create({ name: 'contact' })(ContactForm);

export default connect(null, {
  updateEmergencyContact,
  authSetCurrentUser
})(WrappedContactForm);
