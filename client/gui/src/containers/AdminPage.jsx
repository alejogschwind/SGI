import React, { Component } from 'react';
import PropTypes, { element } from 'prop-types';


import Layout from './Layout';
import Card from '../components/common/Card'
import AdminListEvents from '../components/AdminListEvents';

class AdminPage extends Component {

  render() {
    console.log(this.state)
    return (
      <Layout>

        <br />

        <AdminListEvents

        />
          {/* {
            this.state.allInscripions.map((element) =>
              <Card
                key={element.pk}
                inscription={element}
                status={element.status}
              />
            )
          } */}
      </Layout>
    );
  }
}


AdminPage.propTypes = {
  
};


export default AdminPage;
