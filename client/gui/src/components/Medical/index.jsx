import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WrappedMedicalForm from '../common/MedicalForm'

import { PageHeader } from 'antd';

class Medical extends Component {
  render() {
    return (
      <div>
        <PageHeader
          onBack={() => window.history.back()}
          title="Medicos"
        />
  
        <div className="Personal_form_wrp">
          <WrappedMedicalForm 
            medical={this.props.medical}
          />
        </div>

      </div>
    );
  }
}


Medical.propTypes = {
  
};


export default Medical;
