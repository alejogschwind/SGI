import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import AdminMenu from './AdminMenu'
import EventForm from './EventForm'

import { Route, Switch } from 'react-router-dom'

class AdminLayout extends Component {
  render() {
    console.log(this.state)
    return (
      <div style={{'display': 'flex'}}>
        <AdminMenu />
        <div className="Admin-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

AdminLayout.propTypes = {

};

export default AdminLayout;