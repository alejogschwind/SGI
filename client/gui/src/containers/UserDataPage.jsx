import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Layout from './Layout'
import UserData from '../components/UserData'

class UserDataPage extends Component {
  render() {
    return (
      <Layout>
        <UserData
          user={this.props.match.params.id}
        />
      </Layout>
    );
  }
}


UserDataPage.propTypes = {
  
};


export default UserDataPage;
