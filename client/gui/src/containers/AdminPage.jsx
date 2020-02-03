import React, { Component } from 'react';

import Layout from './Layout';
import AdminListEvents from '../components/AdminListEvents';

class AdminPage extends Component {

  render() {
    return (
      <Layout>
        <br />
        <AdminListEvents />
      </Layout>
    );
  }
}

export default AdminPage;
