import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WrappedInstitutionalForm from '../common/InstitutionalForm'

import { PageHeader } from 'antd';

class Institutional extends Component {
  render() {
    return (
      <div>
        <PageHeader
          onBack={() => window.history.back()}
          title="Institucionales"
        />
  
        <div className="Personal_form_wrp">
          <WrappedInstitutionalForm
            institutional={this.props.institutional}
          />
        </div>

      </div>
    );
  }
}


Institutional.propTypes = {
  
};


export default Institutional;
