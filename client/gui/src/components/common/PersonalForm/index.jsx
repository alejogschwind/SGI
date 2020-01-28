import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { updatePersonal } from '../../../actions/updateProfileActions'
import { authSetCurrentUser } from '../../../actions/authActions'
import { addFlashMessage, deleteAllFlashMessage } from '../../../actions/flashMessages'

import moment from 'moment';
import { Form, Input, DatePicker, Select, Button, Icon, notification } from 'antd';

export const openNotification = (type, message) => {
  notification[type]({
    message: message,
    top: 85,
    duration: 1,
    placement: 'topLeft'
  });
};

class PersonalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loanding: false
    }

    this.props.deleteAllFlashMessage()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loanding:true})
        values.birthdate = moment(values.birthdate).format('DD/MM/YY')
        const id = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        this.props.updatePersonal(values, id)
          .then(
            (res) => {
              // TODO: Con la respuesta actualizar el estado.
              this.setState({loanding:false})
              this.props.authSetCurrentUser(token)
              openNotification('success', 'Datos Personales Guardados!')
            }
          )
      }
    });
  }

  handleChange = () => {

  }

  render() {
    

    const { getFieldDecorator } = this.props.form;
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY',];
    const { Option } = Select;
    const { handleChange } = this;
    const { values } = this.props;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: values.prefix,
    })(
      <Select style={{ width: 70 }} onChange={this.handlePrefixChange}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="54">+54</Option>
      </Select>,
    );

    const genderSelector = (
      <Select className="Form_input" size="large" onChange={this.handleGenderChange}>
        <Option value="f">Femenino</Option>
        <Option value="m">Masculino</Option>
        <Option value="o">Otro</Option>
      </Select>
      );
    return (
      <Form>
        <Form.Item label="Nombres">
          {getFieldDecorator('first_name', {
            initialValue: values.first_name,
            rules: [
              {
                required: true,
                message: 'Por favor ingrese su nombre!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        
        <Form.Item label="Apellidos">
          {getFieldDecorator('last_name', {
            initialValue: values.last_name,
            rules: [
              {
                required: true,
                message: 'Por favor ingrese su apellido!',
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Sexo:" className="Form_input_wrapper">
          {getFieldDecorator('gender', {
            initialValue: values.gender,
            rules: [
              {
                required: true,
                message: "Por favor ingrese su sexo!"
              },
            ]
          })(genderSelector)}
        </Form.Item>

        <Form.Item label="Documento de identidad (DNI/Pasaporte):" className="Form_input_wrapper">
          {getFieldDecorator('passport', {
            initialValue: values.passport,
            rules: [
              {
                required: true,
                message: 'Por favor ingrese su documento de identidad!',
              },
            ],
          })(
            <Input
              size="large"
              name="passport"
              className="Form_input"
              maxLength={20}
              onChange={handleChange}/>
            )
          }
        </Form.Item>

        <Form.Item label="Birthdate:" className="Form_input_wrapper">
          {getFieldDecorator('birthday', {
              initialValue: moment(values.birthdate, dateFormatList[0]),
              rules: [
                {
                  required: true,
                  message: 'Por favor ingrese su fecha de nacimiento!',
                },
              ],
            })(
              <DatePicker
                size="large"
                name="birthday"
                className="Form_input"
                format={dateFormatList}
                onChange={this.handleBirthdateChange}/>
              )
            }
        </Form.Item>

        <Form.Item label="Numero de Telefono:" className="Form_input_wrapper">
          {getFieldDecorator('phone_number', {
            initialValue: values.phone_number,
            rules: [
              {
                required: true,
                message: 'Por favor ingrese su numero de telefono!',
              },
            ],
          })(
            <Input
              size="large"
              name="phone_number"
              className="Form_input"
              addonBefore={prefixSelector}
              onChange={handleChange}/>
            )
          }
        </Form.Item>
          
        <Form.Item label="Trabajo / Estudio:">
          {getFieldDecorator('job', {
            initialValue: values.job,
            rules: [
              {
                required: true,
                message: 'Por favor ingrese su ocupación!',
              },
            ],
          })(
            <Input
              size="large"
              name="job"
              className="Form_input"
              onChange={handleChange}/>
            )
          }
        </Form.Item>

        <Button
          type="primary"
          size="large"
          className="Form_btn"
          disabled={this.state.loanding}
          onClick={this.handleSubmit}>
          { this.state.loanding ? <Icon type="loading" />
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


PersonalForm.propTypes = {
  
};

const WrappedPersonalForm = Form.create({ name: 'personal' })(PersonalForm);


function mapStateToProps(state) {
  return {
    values: state.auth.user.personal
  }
}

export default connect(mapStateToProps, { authSetCurrentUser, updatePersonal, addFlashMessage, deleteAllFlashMessage })(WrappedPersonalForm);
