import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import './styles.css'

class EventFilter extends React.Component {
  
  render() {
    return (
      <Menu mode="horizontal" defaultSelectedKeys='1' className="EventFilter_wrp">
        <Menu.Item key="1">Todos</Menu.Item>
        <Menu.Item key="2">Activos</Menu.Item>
        <Menu.Item key="3">Pasados</Menu.Item>
      </Menu>
    );
  }
}

EventFilter.propTypes = {

};

export default EventFilter;