import React from 'react';

import {
  Form,
  Input,
  Select,
  Button,
  message,
} from 'antd';

const { Option } = Select;

class Institutional extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      is_rotaractor: true,
    }

    this.onWeelChange = this.onWeelChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  continue = e => {
    e.preventDefault();
    // Send POST REQ to the Server //
    this.props.nextStep();
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  }

  onWeelChange = value => {
    this.setState({is_rotaractor: value == 'Rotaract'})
    this.props.handleSelection({weel: value})
  }
  onAiraupCommChange = value => {this.props.handleSelection({airaup_commission: value})}
  onAiraupPosChange = value => {this.props.handleSelection({airaup_position: value})}
  onDistrictChange = value => {this.props.handleSelection({district: value})}
  onDistrictPosChange = value => {this.props.handleSelection({district_position: value})}
  onClubChange = value => {this.props.handleSelection({club: value})}
  onClubPosChange = value => {this.props.handleSelection({club_position: value})}

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err,values) => {
  //     if (!err) {
  //       console.log(values)
  //       if (!this.is_rotaractor) {
  //         values = {
  //           ...values,
  //           club:null,
  //           club_position:null,
  //           district:null,
  //           district_position:null,
  //           airaup_commission:null,
  //           airaup_position:null}
  //       }
  //       this.props.updateInstitutional(values, this.props.id)
  //         .then(
  //           (res) => {
  //             message.success('Datos institucionales actulizados!')
  //           },
  //           (res) => {
  //             message.success(res.response)
  //           }
  //         )
  //     }
  //   })
  // }

  render() {
    const { values, handleSelection } = this.props;
    const { getFieldDecorator } = this.props.form;

    const weelSelector = <Select size="large" onChange={this.onWeelChange} maxLength={20} className="Form_input">
      <Option value="Rotaract">Rotaract</Option>
      <Option value="Rotary">Rotary</Option>
      <Option value="Interact">Interact</Option>
    </Select>
    
    const airaupCommissionSelector = <Select size="large" onChange={this.onAiraupCommChange} maxLength={20} className="Form_input">
      <Option value="IT">IT</Option>
      <Option value="RRPP">RRPP</Option>
      <Option value="Mejora Continua">Mejora Continua</Option>
    </Select>
    
    const airaupPositionSelector = <Select size="large" onChange={this.onAiraupPosChange} maxLength={20} className="Form_input">
      <Option value="Presidente">Presidente</Option>
      <Option value="Vicepresidente">Vicepresidente</Option>
      <Option value="Tesorero">Tesorero</Option>
    </Select>

    const districtSelector = <Select size="large" onChange={this.onDistrictChange} maxLength={20} className="Form_input">
      <Option value="4921">4921</Option>
      <Option value="4900">4900</Option>
      <Option value="5009">5009</Option>
    </Select>

    const districtPositionSelector = <Select size="large" onChange={this.onDistrictPosChange} maxLength={20} className="Form_input">
      <Option value="Presidente">Presidente</Option>
      <Option value="Vicepresidente">Vicepresidente</Option>
      <Option value="Tesorero">Tesorero</Option>
    </Select>
    
    const clubSelector = <Select size="large" onChange={this.onClubChange} maxLength={20} className="Form_input">
      <Option value="Rotaract Club Tandil">Rotaract Club Tandil</Option>
      <Option value="Rotaract Club Olavarria">Rotaract Club Olavarria</Option>
      <Option value="Rotaract Club Villa Gessel">Rotaract Club Villa Gessel</Option>
    </Select>

    const clubPositionSelector = <Select size="large" onChange={this.onClubPosChange} maxLength={20} className="Form_input">
      <Option value="Presidente">Presidente</Option>
      <Option value="Vicepresidente">Vicepresidente</Option>
      <Option value="Tesorero">Tesorero</Option>
    </Select>

    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>Datos Institucionales:</h2>
        <Input.Group compact>
          <Form.Item label="Rueda:" style={{marginRight: 40 +'px'}}>
            {getFieldDecorator('weel', {
              initialValue: values.weel,
              rules: [
                {
                  required: true,
                  message: 'Por favor seleccione la rueda a la que pertenece!',
                }
              ],
            })(weelSelector)}
          </Form.Item>
        </Input.Group>
        
        {this.state.is_rotaractor && <>
        <Input.Group compact>
          <Form.Item label="Comite AIRAUP:" style={{marginRight: 40 +'px'}}>
            {getFieldDecorator('airaup_commission', {
              initialValue: values.airaup_commission,
              rules: [
                {
                  required: this.state.is_rotaractor,
                  message: 'Por favor seleccione una opción!',
                }
              ],
            })(airaupCommissionSelector)}
          </Form.Item>

          <Form.Item label="Cargo en AIRAUP:">
            {getFieldDecorator('airaup_position', {
              initialValue: values.airaup_position,
              rules: [
                {
                  required: this.state.is_rotaractor,
                  message: 'Por favor seleccione una opción!',
                }
              ],
            })(airaupPositionSelector)}
          </Form.Item>
        </Input.Group>
        
        <Input.Group compact>
          <Form.Item label="Seleccione su Distrito:" style={{marginRight: 40 +'px'}}>
            {getFieldDecorator('district', {
              initialValue: values.district,
              rules: [
                {
                  required: this.state.is_rotaractor,
                  message: 'Por favor seleccione su distrito!',
                }
              ],
            })(districtSelector)}
          </Form.Item>

          <Form.Item label="Cargo en el Distrito:">
            {getFieldDecorator('district_position', {
              initialValue: values.district_position,
              rules: [
                {
                  required: this.state.is_rotaractor,
                  message: 'Por favor seleccione una opción!',
                }
              ],
            })(districtPositionSelector)}
          </Form.Item>
        </Input.Group>
        
        <Input.Group compact>
          <Form.Item label="Seleccione su Distrito:" style={{marginRight: 40 +'px'}}>
            {getFieldDecorator('club', {
              initialValue: values.club,
              rules: [
                {
                  required: this.state.is_rotaractor,
                  message: 'Por favor seleccione su club!',
                }
              ],
            })(clubSelector)}
          </Form.Item>

          <Form.Item label="Cargo en el Distrito:">
            {getFieldDecorator('club_position', {
              initialValue: values.club_position,
              rules: [
                {
                  required: this.state.is_rotaractor,
                  message: 'Por favor seleccione una opción!',
                }
              ],
            })(clubPositionSelector)}
          </Form.Item>
        </Input.Group>
        </>
        }

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

const InstitutionalForm = Form.create({ name: 'emergency-contact-form' })(Institutional);

export default InstitutionalForm;