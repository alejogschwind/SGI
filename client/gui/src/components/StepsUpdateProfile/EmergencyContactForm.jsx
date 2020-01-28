import React from 'react';

import {
  Form,
  Input,
  Select,
  Button,
  message,
} from 'antd';

const { Option } = Select;

class EmergencyContact extends React.Component {
  constructor(props) {
    super(props);
    
    // this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  }

  // handleSubmit= (e) => {
  //   e.preventDefault()
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log(values);
  //       this.props.updateEmergencyContact(values, this.props.id)
  //         .then(
  //           (res) => {
  //             message.success('Contacto de emergencia actualizado!')
  //           },
  //           (res) => {
  //             message.success(res.response)
  //             console.err(res.response)
  //           }
  //         )
  //     }
  //   })
  // }

  onEContactPrefixChange = (value) => {this.props.handleSelection({econtact_prefix: value})}

  render() {
    const { values, handleChange } = this.props;
    const { getFieldDecorator } = this.props.form;

    const prefixSelector = getFieldDecorator('econtact_prefix', {
      initialValue: values.econtact_prefix,
    })(
      <Select style={{ width: 70 }} onChange={this.onEContactPrefixChange}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="54">+54</Option>
      </Select>,
    );
    
    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>Emergency Data:</h2>
        <Input.Group compact>
          <Form.Item label="Nombre de su contacto de emergencia:">
            {getFieldDecorator('econtact_first_name', {
              initialValue: values.econtact_first_name,
              rules: [
                {
                  required: true,
                  message: 'Por favor ingrese el nombre de su contacto de emergencia!',
                }
              ],
            })(
              <Input
                size="large"
                name="econtact_first_name"
                maxLength={40}
                className="Form_input"
                onChange={handleChange}/>
              )
            }
          </Form.Item>

          <Form.Item label="Apellido de su contacto de emergencia:">
            {getFieldDecorator('econtact_last_name', {
              initialValue: values.econtact_last_name,
              rules: [
                {
                  required: true,
                  message: 'Por favor ingrese el apellido de su contacto de emergencia!',
                }
              ],
            })(
              <Input
                size="large"
                name="econtact_last_name"
                maxLength={40}
                className="Form_input"
                onChange={handleChange}/>
              )
            }
          </Form.Item>
        </Input.Group>

        <Input.Group compact>
          <Form.Item label="Relación con su contacto de emergencia:" style={{marginRight: 40 +'px'}}>
            {getFieldDecorator('econtact_relation', {
              initialValue: values.econtact_relation,
              rules: [
                {
                  required: true,
                  message: 'Por favor ingrese la relación con su contacto de emergencia!',
                }
              ],
            })(
              <Input
                size="large"
                name="econtact_relation"
                maxLength={20}
                className="Form_input"
                onChange={handleChange}/>
              )
            }
          </Form.Item>
          <Form.Item label="Numero de telefono:">
            {getFieldDecorator('econtact_phone_number', {
              initialValue: values.econtact_phone_number,
              rules: [
                {
                  required: true,
                  message: 'Por favor ingrese el numero de telefono de su contacto de emergencia!',
                }
              ],
            })(
              <Input
                size="large"
                name="econtact_phone_number"
                maxLength={40}
                addonBefore={prefixSelector}
                className="Form_input"
                onChange={handleChange}/>
              )
            }
          </Form.Item>
        </Input.Group>

        <div className="Form_two_btn_wrp">
          <Button
            type="secondary"
            size="large"
            className="Form_btn"
            onClick={this.back}>
            Volver
          </Button>
          <Button
            type="primary"
            size="large"
            className="Form_btn"
            onClick={this.continue}>
            Continuar
          </Button>
        </div>
      </Form>
    );
  }
}

const EmergencyContactForm = Form.create({ name: 'emergency-contact-form' })(EmergencyContact);

export default EmergencyContactForm;