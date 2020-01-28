import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from './Layout'
import Personal from '../components/Personal'
import FlashMessagesList from '../components/FlashMessagesList';

class PersonalPage extends Component {
  render() {
    return (
      <>
        { !this.props.loading &&
          <Layout>
            <FlashMessagesList />
            <Personal
              personal={this.props.auth.user.personal}
              profile={this.props.auth.user.profile}
            />
          </Layout>
        }
      </>
    );
  }
}


PersonalPage.propTypes = {
  
};

function mapStateToProps(state) {
  console.log(state)
  return {
    loading: state.auth.loading,
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(PersonalPage);

