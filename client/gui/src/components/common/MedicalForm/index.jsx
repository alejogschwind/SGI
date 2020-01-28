import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateMedicalRecords } from '../../../actions/updateProfileActions';
import { authSetCurrentUser } from '../../../actions/authActions';
import { openNotification } from '../PersonalForm';


import { Form, Input, DatePicker, Select, Button, Icon } from 'antd';

class MedicalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loanding: false,
      have_allergy: props.medical.have_allergy,
      have_special_diet: props.medical.have_special_diet,
      have_periodic_treatment: props.medical.have_periodic_treatment,
      have_physical_limitation: props.medical.have_physical_limitation,
      have_medication: props.medical.have_medication,
      have_surgeries: props.medical.have_surgeries,
      have_additional: props.medical.have_additional,
    }

  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loanding:true})
        const id = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        this.props.updateMedicalRecords(values, id)
          .then(
            (res) => {
              // TODO: Con la respuesta actualizar el estado.
              this.setState({loanding:false})
              this.props.authSetCurrentUser(token)
              openNotification('success', 'Datos Medicos Guardados!')
            }
          )
      }
    });
  }

  onChangeAllergy = (value) => {this.setState({have_allergy: value})}
  onChangeSpecialDiet = (value) => {this.setState({have_special_diet: value})}
  onChangePeriodicTreatment = (value) => {this.setState({have_periodic_treatment: value})}
  onChangePhysicalLimitation = (value) => {this.setState({have_physical_limitation: value})}
  onChangeMedication = (value) => {this.setState({have_medication: value})}
  onChangeSurgeries = (value) => {this.setState({have_surgeries: value})}
  onChangeAdditionalData = (value) => {this.setState({have_additional: value})}

  render() {
    const { medical } = this.props;
    const { getFieldDecorator } = this.props.form;
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    const { Option } = Select;
    const { handleChange } = this;

    const bloodSeletor = (
      <Select size="large">
        <Option value="A+">A+</Option>
        <Option value="A-">A-</Option>
        <Option value="B+">B+</Option>
        <Option value="B-">B-</Option>
        <Option value="AB+">AB+</Option>
        <Option value="AB-">AB-</Option>
        <Option value="0+">0+</Option>
        <Option value="0-">0-</Option>
      </Select>
      );
    return (
      <Form>
        <Form.Item label="Obra social">
          {getFieldDecorator('health_insurance', {
            initialValue: medical.health_insurance,
            rules: [
              {
                required: true,
                message: 'Por favor ingrese su obra social!',
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Numero de afiliado">
          {getFieldDecorator('affiliate_number', {
            initialValue: medical.affiliate_number,
            rules: [
              {
                required: true,
                message: 'Por favor ingrese su numero de afiliado!',
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="Tipo de sangre">
          {getFieldDecorator('blood_type', {
            initialValue: medical.blood_type,
            rules: [
              {
                required: true,
                message: 'Por favor ingrese su tipo de sangre!'
              },
            ]
          })(bloodSeletor)}
        </Form.Item>

        <Form.Item label="¿Tiene alguna alergia?">
          {getFieldDecorator('have_allergy', {
            initialValue: medical.have_allergy,
            rules: [
              {
                required: true,
                message: 'Por favor responda si tiene una alergia!',
              }
            ],
          })(
            <Select size="large" onChange={this.onChangeAllergy}>
              <Option value={false}>No</Option>
              <Option value={true}>Si</Option>
            </Select>
            )
          }
        </Form.Item>

        {this.state.have_allergy && 
        <Form.Item label="Información sobre su alergia:">
          {getFieldDecorator('allergy_obs', {
            initialValue: medical.allergy_obs,
            rules: [
              {
                required: this.state.have_allergy,
                message: 'Por favor ingrese los detalles de su alergia!',
              }
            ],
          })(
            <Input
              size="large"
              name="allergy_obs"
              maxLength={100}
            />
            )
          }
        </Form.Item>
        }

        <Form.Item label="¿Tiene alguna dieta especial?">
          {getFieldDecorator('have_special_diet', {
            initialValue: medical.have_special_diet,
            rules: [
              {
                required: true,
                message: 'Por favor responda si tiene una dieta especial!',
              }
            ],
          })(
            <Select size="large" onChange={this.onChangeSpecialDiet}>
              <Option value={false}>No</Option>
              <Option value={true}>Si</Option>
            </Select>
            )
          }
        </Form.Item>

        {this.state.have_special_diet && 
        <Form.Item label="Información sobre su alergia:">
          {getFieldDecorator('special_diet_obs', {
            initialValue: medical.special_diet_obs,
            rules: [
              {
                required: this.state.have_special_diet,
                message: 'Por favor ingrese su dieta especial!',
              }
            ],
          })(
            <Select size="large">
              <Option value="Sin Sal">Sin Sal</Option>
              <Option value="Sin Gluten">Sin Gluten</Option>
              <Option value="Vegetariana">Vegetariana</Option>
              <Option value="Vegana">Vegana</Option>
            </Select>
            )
          }
        </Form.Item>
        }

        <Form.Item label="¿Tiene algun tratamiento periodico?">
          {getFieldDecorator('have_periodic_treatment', {
            initialValue: medical.have_periodic_treatment,
            rules: [
              {
                required: true,
                message: 'Por favor responda si tiene un tratamiento periodico!',
              }
            ],
          })(
            <Select size="large" onChange={this.onChangePeriodicTreatment}>
              <Option value={false}>No</Option>
              <Option value={true}>Si</Option>
            </Select>
            )
          }
        </Form.Item>

        {this.state.have_periodic_treatment && 
        <Form.Item label="Información sobre su tratamiento periodico:">
          {getFieldDecorator('periodic_treatment_obs', {
            initialValue: medical.periodic_treatment_obs,
            rules: [
              {
                required: this.state.haveperiodic_treatment,
                message: 'Por favor responda si tiene un tratamiento periodico!',
              }
            ],
          })(
            <Input
              size="large"
              name="periodic_treatment_obs"
              maxLength={100}
            />
            )
          }
        </Form.Item>
        }

        <Form.Item label="¿Tiene alguna limitacion fisica?">
          {getFieldDecorator('have_physical_limitation', {
            initialValue: medical.have_physical_limitation,
            rules: [
              {
                required: true,
                message: 'Por favor responda si tiene una limitacion fisica!',
              }
            ],
          })(
            <Select size="large" onChange={this.onChangePhysicalLimitation}>
              <Option value={false}>No</Option>
              <Option value={true}>Si</Option>
            </Select>
            )
          }
        </Form.Item>

        {this.state.have_physical_limitation && 
        <Form.Item label="Información sobre su limitacion fisica:">
          {getFieldDecorator('physical_limitation_obs', {
            initialValue: medical.physical_limitation_obs,
            rules: [
              {
                required: this.state.have_physical_limitation,
                message: 'Por favor ingrese los detalles de su limitacion fisica!',
              }
            ],
          })(
            <Input
              size="large"
              name="physical_limitation_obs"
              maxLength={100}
            />
            )
          }
        </Form.Item>
        }

        <Form.Item label="¿Tiene alguna medicación?">
          {getFieldDecorator('have_medication', {
            initialValue: medical.have_medication,
            rules: [
              {
                required: true,
                message: 'Por favor responda si consume alguna medicacion!',
              }
            ],
          })(
            <Select size="large" onChange={this.onChangeMedication}>
              <Option value={false}>No</Option>
              <Option value={true}>Si</Option>
            </Select>
            )
          }
        </Form.Item>

        {this.state.have_medication && 
        <Form.Item label="Información sobre su medicación:">
          {getFieldDecorator('medication_obs', {
            initialValue: medical.medication_obs,
            rules: [
              {
                required: this.state.have_medication,
                message: 'Por favor ingrese los detalles de su medicacion!',
              }
            ],
          })(
            <Input
              size="large"
              name="medication_obs"
              maxLength={100}
            />
            )
          }
        </Form.Item>
        }

        <Form.Item label="¿Tiene alguna cirugia?">
          {getFieldDecorator('have_surgeries', {
            initialValue: medical.have_surgeries,
            rules: [
              {
                required: true,
                message: 'Por favor responda si tiene cirugias!',
              }
            ],
          })(
            <Select size="large" onChange={this.onChangeSurgeries}>
              <Option value={false}>No</Option>
              <Option value={true}>Si</Option>
            </Select>
            )
          }
        </Form.Item>

        {this.state.have_surgeries && 
        <Form.Item label="Información sobre su cirugia:">
          {getFieldDecorator('surgeries_obs', {
            initialValue: medical.surgeries_obs,
            rules: [
              {
                required: this.state.have_surgeries,
                message: 'Por favor ingrese los detalles de sus cirugias!',
              }
            ],
          })(
            <Input
              size="large"
              name="surgeries_obs"
              maxLength={100}
            />
            )
          }
        </Form.Item>
        }

        <Form.Item label="¿Tiene datos adicionales de relevancia?">
          {getFieldDecorator('have_additional', {
            initialValue: medical.have_additional,
            rules: [
              {
                required: true,
                message: 'Por favor responda si tiene datos adicionales!',
              }
            ],
          })(
            <Select size="large" onChange={this.onChangeAdditionalData}>
              <Option value={false}>No</Option>
              <Option value={true}>Si</Option>
            </Select>
            )
          }
        </Form.Item>
          
        {this.state.have_additional && 
        <Form.Item label="Información adicional:">
          {getFieldDecorator('additional_obs', {
            initialValue: medical.additional_obs,
            rules: [
              {
                required: this.state.have_additional,
                message: 'Por favor ingrese los datos adicionales!',
              }
            ],
          })(
            <Input
              size="large"
              name="additional_obs"
              maxLength={100}
            />
            )
          }
        </Form.Item>
        }

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


MedicalForm.propTypes = {
  
};

const WrappedMedicalForm = Form.create({ name: 'personal' })(MedicalForm);

export default connect(null, { updateMedicalRecords, authSetCurrentUser })(WrappedMedicalForm);
