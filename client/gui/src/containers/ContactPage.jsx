import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from './Layout';
import Contact from '../components/Contact';

class ContactPage extends Component {
  render() {
    return (
      <>
        { !this.props.loading &&
          <Layout>
            <Contact
              contact={this.props.auth.user.emergency_contact}
              profile={this.props.auth.user.profile}
            />
          </Layout>
        }
      </>
    );
  }
}


ContactPage.propTypes = {
  
};

function mapStateToProps(state) {
  console.log(state)
  return {
    loading: state.auth.loading,
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(ContactPage);

