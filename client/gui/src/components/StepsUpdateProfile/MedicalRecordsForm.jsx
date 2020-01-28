import React from 'react';

import {
  Form,
  Input,
  Select,
  Button,
  message
} from 'antd';

const { Option } = Select;

class MedicalRecords extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeBloodType = this.onChangeBloodType.bind(this)
    this.onChangeAllergy = this.onChangeAllergy.bind(this)
    this.onChangeSpecialDiet = this.onChangeSpecialDiet.bind(this)
    this.onChangeSpecialDietObs = this.onChangeSpecialDietObs.bind(this)
    this.onChangePeriodicTreatment = this.onChangePeriodicTreatment.bind(this)
    this.onChangePhysicalLimitation = this.onChangePhysicalLimitation.bind(this)
    this.onChangeSurgeries = this.onChangeSurgeries.bind(this)
    this.onChangeAdditionalData = this.onChangeAdditionalData.bind(this)
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
  
  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log(values);
  //       this.setState({ isLoading: true});
  //       this.props.updateMedicalRecords(values, this.props.id)
  //         .then(
  //           (res) => {
  //             message.success('Ficha medica actualizada!')
  //             this.setState({ isLoading: false});
  //             console.log(res.response)
  //           },
  //           (res) => {
  //             message.error(res.response);
  //             this.setState({ isLoading: false});
  //             console.error(res.response)
  //           }
  //         )
  //     }
  //   })
  // }

  onChangeBloodType = (value) => {this.props.handleSelection({blood_type: value})}
  onChangeAllergy = (value) => {this.props.handleSelection({allergy: value})}
  onChangeSpecialDiet = (value) => {this.props.handleSelection({special_diet: value})}
  onChangeSpecialDietObs = (value) => {this.props.handleSelection({special_diet_obs: value})}
  onChangePeriodicTreatment = (value) => {this.props.handleSelection({periodic_treatment: value})}
  onChangePhysicalLimitation = (value) => {this.props.handleSelection({physical_limitation: value})}
  onChangeMedication = (value) => {this.props.handleSelection({medication: value})}
  onChangeSurgeries = (value) => {this.props.handleSelection({surgeries: value})}
  onChangeAdditionalData = (value) => {this.props.handleSelection({additional_data: value})}


  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      onChangeBloodType,
      onChangeAllergy,
      onChangeSpecialDiet,
      onChangeSpecialDietObs,
      onChangePeriodicTreatment,
      onChangePhysicalLimitation,
      onChangeMedication,
      onChangeSurgeries,
      onChangeAdditionalData
    } = this;
    const { values, handleChange } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>Medical Data:</h2>

        <Input.Group compact>
          <Form.Item label="Health Insurance:" className="Form_input_wrp">
            {getFieldDecorator('health_insurance', {
              initialValue: values.health_insurance,
              rules: [
                {
                  required: true,
                  message: 'Por favor ingrese su obra social!',
                }
              ],
            })(
              <Input
                size="large"
                name="health_insurance"
                maxLength={40}
                className="Form_input"
                onChange={handleChange}/>
              )
            }
          </Form.Item>

          <Form.Item label="Affiliate Number:">
            {getFieldDecorator('affiliate_number', {
              initialValue: values.affiliate_number,
              rules: [
                {
                  required: true,
                  message: 'Por favor ingrese su numero de afiliado!',
                }
              ],
            })(
              <Input
                size="large"
                name="affiliate_number"
                maxLength={40}
                className="Form_input"
                onChange={handleChange}/>
              )
            }
          </Form.Item>
        </Input.Group>

        <Input.Group compact>
          <Form.Item label="Blood Type:" className="Form_input_wrp">
            {getFieldDecorator('blood_type', {
              initialValue: values.blood_type,
              rules: [
                {
                  required: true,
                  message: 'Por favor ingrese su tipo de sangre!',
                }
              ],
            })(
              <Select size="large" className="Form_input" onChange={onChangeBloodType}>
                <Option value="A+">A+</Option>
                <Option value="A-">A-</Option>
                <Option value="B+">B+</Option>
                <Option value="B-">B-</Option>
                <Option value="AB+">AB+</Option>
                <Option value="AB-">AB-</Option>
                <Option value="0+">0+</Option>
                <Option value="0-">0-</Option>
              </Select>
              )
            }
          </Form.Item>

          {/* <Form.Item label="Address:">
            {getFieldDecorator('address', {
              rules: [
                {
                  required: true,
                  message: 'Please input your address!',
                }
              ],
            })(<Input size="large" maxLength={40} className="Form_input"/>)}
          </Form.Item> */}
        </Input.Group>

        <Input.Group compact>
          <Form.Item label="¿Tiene alguna alergia?" className="Form_input_wrp">
            {getFieldDecorator('allergy', {
              initialValue: values.allergy,
              rules: [
                {
                  required: true,
                  message: 'Por favor responda si tiene una alergia!',
                }
              ],
            })(
              <Select size="large" className="Form_input" onChange={onChangeAllergy}>
                <Option value={false}>No</Option>
                <Option value={true}>Si</Option>
              </Select>
              )
            }
          </Form.Item>
          
          {values.allergy && 
          <Form.Item label="Información sobre su alergia:">
            {getFieldDecorator('allergy_obs', {
              initialValue: values.allergy_obs,
              rules: [
                {
                  required: values.allergy,
                  message: 'Por favor ingrese los detalles de su alergia!',
                }
              ],
            })(
              <Input
                size="large"
                name="allergy_obs"
                maxLength={100}
                className="Form_input"
                onChange={handleChange}/>
              )
            }
          </Form.Item>
          }
        </Input.Group>
        
        <Input.Group compact>
          <Form.Item label="¿Tiene alguna dieta especial?" className="Form_input_wrp">
            {getFieldDecorator('special_diet', {
              initialValue: values.special_diet,
              rules: [
                {
                  required: true,
                  message: 'Por favor responda si tiene una dieta especial!',
                }
              ],
            })(
              <Select size="large" className="Form_input" onChange={onChangeSpecialDiet}>
                <Option value={false}>No</Option>
                <Option value={true}>Si</Option>
              </Select>
              )
            }
          </Form.Item>
          
          {values.special_diet && 
          <Form.Item label="Información sobre su alergia:">
            {getFieldDecorator('special_diet_obs', {
              initialValue: values.special_diet_obs,
              rules: [
                {
                  required: values.special_diet,
                  message: 'Please input your special diet!',
                }
              ],
            })(
              <Select size="large" className="Form_input" onChange={onChangeSpecialDietObs}>
                <Option value="Sin Sal">Sin Sal</Option>
                <Option value="Sin Gluten">Sin Gluten</Option>
                <Option value="Vegetariana">Vegetariana</Option>
                <Option value="Vegana">Vegana</Option>
              </Select>
              )
            }
          </Form.Item>
          }
        </Input.Group>
        
        <Input.Group compact>
          <Form.Item label="¿Tiene algun tratamiento periodico?" className="Form_input_wrp">
            {getFieldDecorator('periodic_treatment', {
              initialValue: values.periodic_treatment,
              rules: [
                {
                  required: true,
                  message: 'Por favor responda si tiene un tratamiento periodico!',
                }
              ],
            })(
              <Select size="large" className="Form_input" onChange={onChangePeriodicTreatment}>
                <Option value={false}>No</Option>
                <Option value={true}>Si</Option>
              </Select>
              )
            }
          </Form.Item>
          
          {values.periodic_treatment && 
          <Form.Item label="Información sobre su tratamiento periodico:">
            {getFieldDecorator('periodic_treatment_obs', {
              initialValue: values.periodic_treatment_obs,
              rules: [
                {
                  required: values.periodic_treatment,
                  message: 'Por favor responda si tiene un tratamiento periodico!',
                }
              ],
            })(
              <Input
                size="large"
                name="periodic_treatment_obs"
                maxLength={100}
                className="Form_input"
                onChange={handleChange}/>
              )
            }
          </Form.Item>
          }
        </Input.Group>
        
        <Input.Group compact>
          <Form.Item label="¿Tiene alguna limitacion fisica?" className="Form_input_wrp">
            {getFieldDecorator('physical_limitation', {
              initialValue: values.physical_limitation,
              rules: [
                {
                  required: true,
                  message: 'Por favor responda si tiene una limitacion fisica!',
                }
              ],
            })(
              <Select size="large" className="Form_input" onChange={onChangePhysicalLimitation}>
                <Option value={false}>No</Option>
                <Option value={true}>Si</Option>
              </Select>
              )
            }
          </Form.Item>
          
          {values.physical_limitation && 
          <Form.Item label="Información sobre su limitacion fisica:">
            {getFieldDecorator('physical_limitation_obs', {
              initialValue: values.physical_limitation_obs,
              rules: [
                {
                  required: values.physical_limitation,
                  message: 'Por favor ingrese los detalles de su limitacion fisica!',
                }
              ],
            })(
              <Input
                size="large"
                name="physical_limitation_obs"
                maxLength={100}
                className="Form_input"
                onChange={handleChange}/>
              )
            }
          </Form.Item>
          }
        </Input.Group>
        
        <Input.Group compact>
          <Form.Item label="¿Tiene alguna medicación?" className="Form_input_wrp">
            {getFieldDecorator('medication', {
              initialValue: values.medication,
              rules: [
                {
                  required: true,
                  message: 'Por favor responda si consume alguna medicacion!',
                }
              ],
            })(
              <Select size="large" className="Form_input" onChange={onChangeMedication}>
                <Option value={false}>No</Option>
                <Option value={true}>Si</Option>
              </Select>
              )
            }
          </Form.Item>
          
          {values.medication && 
          <Form.Item label="Información sobre su medicación:">
            {getFieldDecorator('medication_obs', {
              initialValue: values.medication_obs,
              rules: [
                {
                  required: values.medication,
                  message: 'Por favor ingrese los detalles de su medicacion!',
                }
              ],
            })(
              <Input
                size="large"
                name="medication_obs"
                maxLength={100}
                className="Form_input"
                onChange={handleChange}/>
              )
            }
          </Form.Item>
          }
        </Input.Group>
        
        <Input.Group compact>
          <Form.Item label="¿Tiene alguna cirugia?" className="Form_input_wrp">
            {getFieldDecorator('surgeries', {
              initialValue: values.surgeries,
              rules: [
                {
                  required: true,
                  message: 'Por favor responda si tiene cirugias!',
                }
              ],
            })(
              <Select size="large" className="Form_input" onChange={onChangeSurgeries}>
                <Option value={false}>No</Option>
                <Option value={true}>Si</Option>
              </Select>
              )
            }
          </Form.Item>
          
          {values.surgeries && 
          <Form.Item label="Información sobre su cirugia:">
            {getFieldDecorator('surgeries_obs', {
              initialValue: values.surgeries_obs,
              rules: [
                {
                  required: values.surgeries,
                  message: 'Por favor ingrese los detalles de sus cirugias!',
                }
              ],
            })(
              <Input
                size="large"
                name="surgeries_obs"
                maxLength={100}
                className="Form_input"
                onChange={handleChange}/>
              )
            }
          </Form.Item>
          }
        </Input.Group>
        
        <Input.Group compact>
          <Form.Item label="¿Tiene datos adicionales de relevancia?" className="Form_input_wrp">
            {getFieldDecorator('additional_data', {
              initialValue: values.additional_data,
              rules: [
                {
                  required: true,
                  message: 'Por favor responda si tiene datos adicionales!',
                }
              ],
            })(
              <Select size="large" className="Form_input" onChange={onChangeAdditionalData}>
                <Option value={false}>No</Option>
                <Option value={true}>Si</Option>
              </Select>
              )
            }
          </Form.Item>
          
          {values.additional_data && 
          <Form.Item label="Información adicional:">
            {getFieldDecorator('additional_obs', {
              initialValue: values.additional_obs,
              rules: [
                {
                  required: values.additional_data,
                  message: 'Por favor ingrese los datos adicionales!',
                }
              ],
            })(
              <Input
                size="large"
                name="additional_obs"
                maxLength={100}
                className="Form_input"
                onChange={handleChange}/>
              )
            }
          </Form.Item>
          }
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

const MedicalRecordsForm = Form.create({ name: 'medical-records-form' })(MedicalRecords);

export default MedicalRecordsForm;;

