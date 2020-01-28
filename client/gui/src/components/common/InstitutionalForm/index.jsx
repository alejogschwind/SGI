import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateInstitutional } from '../../../actions/updateProfileActions';
import { authSetCurrentUser } from '../../../actions/authActions';
import { openNotification } from '../PersonalForm';

import { Form, Input, DatePicker, Select, Button, Icon } from 'antd';

class InstitutionalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loanding: false,
      is_rotaractor: (this.props.institutional.weel === 'Rotaract')
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loanding:true})
        const id = localStorage.getItem('userId')
        const token = localStorage.getItem('token')
        this.props.updateInstitutional(values, id)
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

  onWeelChange = value => {
    this.setState({is_rotaractor: value == 'Rotaract'})
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { institutional } = this.props;
    const { Option } = Select;
    
    const weelSelector = <Select size="large" onChange={this.onWeelChange} maxLength={20}>
      <Option value="Rotaract">Rotaract</Option>
      <Option value="Rotary">Rotary</Option>
      <Option value="Interact">Interact</Option>
    </Select>
    
    const airaupCommissionSelector = <Select size="large" maxLength={20}>
      <Option value="IT">IT</Option>
      <Option value="RRPP">RRPP</Option>
      <Option value="Mejora Continua">Mejora Continua</Option>
    </Select>
    
    const airaupPositionSelector = <Select size="large" maxLength={20}>
      <Option value="Presidente">Presidente</Option>
      <Option value="Vicepresidente">Vicepresidente</Option>
      <Option value="Tesorero">Tesorero</Option>
    </Select>

    const districtSelector = <Select size="large" maxLength={20}>
      <Option value="4921">4921</Option>
      <Option value="4900">4900</Option>
      <Option value="5009">5009</Option>
    </Select>

    const districtPositionSelector = <Select size="large" maxLength={20}>
      <Option value="Presidente">Presidente</Option>
      <Option value="Vicepresidente">Vicepresidente</Option>
      <Option value="Tesorero">Tesorero</Option>
    </Select>
    
    const clubSelector = <Select size="large" maxLength={20}>
      <Option value="Rotaract Club Tandil">Rotaract Club Tandil</Option>
      <Option value="Rotaract Club Olavarria">Rotaract Club Olavarria</Option>
      <Option value="Rotaract Club Villa Gessel">Rotaract Club Villa Gessel</Option>
    </Select>

    const clubPositionSelector = <Select size="large" maxLength={20}>
      <Option value="Presidente">Presidente</Option>
      <Option value="Vicepresidente">Vicepresidente</Option>
      <Option value="Tesorero">Tesorero</Option>
    </Select>
    
    console.log(this.state)

    return (
      <Form>
        <Form.Item label="Rueda:">
          {getFieldDecorator('weel', {
            initialValue: institutional.weel,
            rules: [
              {
                required: true,
                message: 'Por favor seleccione la rueda a la que pertenece!',
              }
            ],
          })(weelSelector)}
        </Form.Item>
        
        { this.state.is_rotaractor && 
          <>
            <Form.Item label="Comite AIRAUP:">
              {getFieldDecorator('airaup_commission', {
                initialValue: institutional.airaup_commission,
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
                initialValue: institutional.airaup_position,
                rules: [
                  {
                    required: this.state.is_rotaractor,
                    message: 'Por favor seleccione una opción!',
                  }
                ],
              })(airaupPositionSelector)}
            </Form.Item>

            <Form.Item label="Seleccione su Distrito:">
              {getFieldDecorator('district', {
                initialValue: institutional.district,
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
                initialValue: institutional.district_position,
                rules: [
                  {
                    required: this.state.is_rotaractor,
                    message: 'Por favor seleccione una opción!',
                  }
                ],
              })(districtPositionSelector)}
            </Form.Item>

            <Form.Item label="Seleccione su Distrito:">
              {getFieldDecorator('club', {
                initialValue: institutional.club,
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
                initialValue: institutional.club_position,
                rules: [
                  {
                    required: this.state.is_rotaractor,
                    message: 'Por favor seleccione una opción!',
                  }
                ],
              })(clubPositionSelector)}
            </Form.Item>
          </>
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


InstitutionalForm.propTypes = {
  
};

const WrappedInstitutionalForm = Form.create({ name: 'institutional' })(InstitutionalForm);

export default connect(null,{ updateInstitutional, authSetCurrentUser })(WrappedInstitutionalForm);
