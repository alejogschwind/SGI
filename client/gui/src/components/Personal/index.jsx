import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AvatarEdit from '../common/AvatarEdit'

import PersonalData from '../StepsUpdateProfile/PersonalDataForm'


import './statics/css/styles.css';
import WrappedPersonalForm from '../common/PersonalForm';
import { PageHeader } from 'antd';

class Personal extends Component {

  handleChange(e) {
    console.log(e.target.value)
  }

  render() {
    return (
      <div>

        <PageHeader
          onBack={() => window.history.back()}
          title="Personales"
        />

        <div className="Personal_avatar_wrp">
          {this.props.profile &&
            <AvatarEdit
              style="Personal_avatar"
              // scale={true}
              avatar={this.props.profile.avatar}
            /> 
          }
        </div>

        <div className="Personal_form_wrp">
          <WrappedPersonalForm />
        </div>

      </div>
    );
  }
}

Personal.propTypes = {
  
};


export default Personal;
