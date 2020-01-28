import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from './Layout'
import Institutional from '../components/Institutional'

class InstitutionalPage extends Component {
  render() {
    return (
      <>
        { !this.props.loading &&
          <Layout>
            <Institutional
              institutional={this.props.auth.user.institutional}
              profile={this.props.auth.user.profile}
            />
          </Layout>
        }
      </>
    );
  }
}


InstitutionalPage.propTypes = {
  
};

function mapStateToProps(state) {
  console.log(state)
  return {
    loading: state.auth.loading,
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(InstitutionalPage);

