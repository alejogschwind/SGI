import React from 'react';
import moment from 'moment';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
} from 'antd';

const { Option } = Select;

class PersonalData extends React.Component {

  continue= e => {
    e.preventDefault()
    this.props.nextStep();
  }

  // handleSubmit(e) {
  //   e.preventDefault()
  //   this.props.form.validateFields((err,values) => {
  //     if (!err) {
  //       values.birthdate = values.birthdate.format('YYYY-MM-DD');
  //       this.setState({ isLoading: true});
  //       this.props.updatePersonal(values, this.props.id)
  //         .then(
  //           (res) => {
  //             message.success('Datos personales actualizados!')
  //             this.setState({ isLoading: false})
  //             console.log(res.response)
  //           },
  //           (res) => {
  //             this.setState({ isLoading: false})
  //             console.error(res.response)
  //           }
  //         )
  //     }
  //   })
  // }

  handleGenderChange = (value) => {this.props.handleSelection({gender: value})}
  handlePrefixChange = (value) => {this.props.handleSelection({prefix: value})}
  handleBirthdateChange = (value) => {this.props.handleSelection({birthday: value})}

  render() {
    const { values, handleChange } = this.props;
    const { getFieldDecorator } = this.props.form;
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    console.log(this.props.form)

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
      <Form onSubmit={this.handleSubmit}>
        <h2>Personal Data:</h2>
        <Input.Group compact>
          <Form.Item label="Nombres:" className="Form_input_wrapper">
            {getFieldDecorator('first_name', {
              initialValue: values.first_name,
              rules: [
                {
                  required: true,
                  message: 'Por favor ingrese su nombre completo!',
                },
              ],
            })(
              <Input
                name='first_name'
                size="large"
                maxLength={40}
                className="Form_input"
                onChange={handleChange}/>
              )
            }
          </Form.Item>

          <Form.Item label="Apellido:">
            {getFieldDecorator('last_name', {
              initialValue: values.last_name,
              rules: [
                {
                  required: true,
                  message: 'Por favor ingrese su apellido!',
                },
              ],
            })(
              <Input
                size="large"
                name="last_name"
                maxLength={40}
                className="Form_input"
                onChange={handleChange}/>
              )
            }
          </Form.Item>
        </Input.Group>
        
        <Input.Group compact>
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

          <Form.Item label="Birthdate:" className="Form_input_wrapper">
            {getFieldDecorator('birthday', {
                initialValue: moment(values.birthday, dateFormatList[0]),
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
        </Input.Group>

        <Input.Group compact>
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
        </Input.Group>

        <div className="Form_btn_wrp">
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

const PersonalDataForm = Form.create({ name: 'personal-data-form' })(PersonalData);

export default PersonalDataForm;