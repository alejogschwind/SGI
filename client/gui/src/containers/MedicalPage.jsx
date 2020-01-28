import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from './Layout'
import Medical from '../components/Medical'

class MedicalPage extends Component {
  render() {
    return (
      <>
        { !this.props.loading &&
          <Layout>
            <Medical
              medical={this.props.auth.user.medical_record}
              profile={this.props.auth.user.profile}
            />
          </Layout>
        }
      </>
    );
  }
}


MedicalPage.propTypes = {
  
};

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(MedicalPage);

