import React from 'react';

import {Progress} from 'antd';
import NavigationBar from '../components/NavigationBar';
import Greetings from '../components/Greetings';
import FlashMessagesList from '../components/FlashMessagesList';
import UploadProfileAvatar from '../components/UploadProfileAvatar';
import ChangePassword from '../components/ChangePassword';
import '../assets/statics/containers/EditProfile.css';

import { Row, Col} from 'antd'
import PersonalDataForm from '../components/StepsUpdateProfile/PersonalDataForm';
import AddressForm from '../components/AddressForm';
import EmergencyContactForm from '../components/StepsUpdateProfile/EmergencyContactForm';
import MedicalRecordsForm from '../components/StepsUpdateProfile/MedicalRecordsForm';
import InstitutionalForm from '../components/StepsUpdateProfile/InstitutionalForm';

class EditProfile extends React.Component {

  render() {
    
    return (
      <div className="page-wrapper">
        <h1 className="page-title">Editar Perfil</h1>
        <div className="row">
          <div className="left-col">
            <section className="EditProfile__left-column">
              <UploadProfileAvatar className="EditProfile__avatar-upload"/>
              <ChangePassword className="EditProfile__change-password"/>
            </section>
          </div>
          <div className="right-col">
            <section className="EditProfile__right-column">
              <div className="progress_bar">
                <span>Porcentaje de perfil completo:</span>
                <Progress percent={50} status="active" />
              </div>
              {/* <PersonalDataForm /> */}
              {/* <AddressForm /> */}
              {/* <EmergencyContactForm /> */}
              <MedicalRecordsForm />
              <InstitutionalForm />
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;



