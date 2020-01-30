import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from './Layout';

import ListEventRequests from '../components/ListEventRequests'

class EventRequestsPage extends Component {
  render() {
    return (
      <Layout>
        <ListEventRequests
          event={this.props.match.params.id}
        />
      </Layout>
    );
  }
}

EventRequestsPage.propTypes = {
  
};

export default EventRequestsPage;
