import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd';
import TableData from '../common/TableData';

class ConfirmData extends React.Component {
  continue = e => {
    e.preventDefault();
    this.props.update();
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  }
  render() {
    return(
      <>
        <TableData data={this.props.personalValues} title="Datos Personales"/>
        <br/>
        <TableData data={this.props.medicalValues} title="Datos Medicos"/>
        <br/>
        <TableData data={this.props.eContactValues} title="Contacto de Emergencias"/>
        <br/>
        <TableData data={this.props.institutionalValues} title="Datos Institucionales"/>
        <br/>
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
            Actualizar
          </Button>
        </div>
      </>
    )
  } 
}

ConfirmData.propTypes = {

}

export default ConfirmData

