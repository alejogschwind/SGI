import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WrappedContactForm from '../common/ContactForm'

import { PageHeader } from 'antd';

class Contact extends Component {
  render() {
    return (
      <div>
        <PageHeader
          onBack={() => window.history.back()}
          title="Contacto de Emergencia"
        />
  
        <div className="Personal_form_wrp">
          <WrappedContactForm
            contact={this.props.contact}
          />
        </div>

      </div>
    );
  }
}


Contact.propTypes = {
  
};


export default Contact;
