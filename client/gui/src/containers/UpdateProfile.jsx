import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePersonal, updateMedicalRecords, updateEmergencyContact, updateInstitutional } from '../actions/updateProfileActions';

import { Steps, Button, message } from 'antd';
import '../assets/statics/containers/UpdateProfile.css';
import PersonalDataForm from '../components/StepsUpdateProfile/PersonalDataForm';
import MedicalRecordsForm from '../components/StepsUpdateProfile/MedicalRecordsForm';
import EmergencyContactForm from '../components/StepsUpdateProfile/EmergencyContactForm';
import InstitutionalForm from '../components/StepsUpdateProfile/InstitutionalForm';

const { Step } = Steps;

class UpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  
    this.done = this.done.bind(this)
  }
  
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  
  done() {
    message.success('Perfil actualizado satisfactoriamente!')
    this.props.history.push('/')
  }
  
  render() {
    const { current } = this.state;
    const { user_id } = this.props.auth.user;
    const steps = [
        {
          title: 'Datos Personales',
          content: <PersonalDataForm updatePersonal={this.props.updatePersonal} id={user_id}/>,
        },
        {
          title: 'Datos Medicos',
          content: <MedicalRecordsForm updateMedicalRecords={this.props.updateMedicalRecords} id={user_id}/>,
        },
        {
          title: 'Contacto de Emergencia:',
          content: <EmergencyContactForm updateEmergencyContact={this.props.updateEmergencyContact} id={user_id}/>,
        },
        {
          title: 'Datos Institucionales:',
          content: <InstitutionalForm updateInstitutional={this.props.updateInstitutional} id={user_id}/>,
        },
    ];
    return (
      <div className="UpdateProfile__wrapper">
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={this.done}>
              Done
            </Button>
          )}
        </div>
      </div>
    );
  }
}

UpdateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  updatePersonal: PropTypes.func.isRequired,
  updateMedicalRecords: PropTypes.func.isRequired,
  updateEmergencyContact: PropTypes.func.isRequired,
  updateInstitutional: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = {
  updatePersonal,
  updateMedicalRecords,
  updateEmergencyContact,
  updateInstitutional
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);