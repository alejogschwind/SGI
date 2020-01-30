import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
const { SubMenu } = Menu;
// import './styles.css'

class RequestFilter extends React.Component {
  
  render() {
    return (
      <Menu mode="horizontal" defaultSelectedKeys='1' className="RequestFilter_wrp">
        <SubMenu title="Estado">
          <Menu.Item key="estado:1">Todas</Menu.Item>
          <Menu.Item key="estado:2">Aprobadas</Menu.Item>
          <Menu.Item key="estado:3">Pendientes</Menu.Item>
          <Menu.Item key="estado:4">Denegados</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

RequestFilter.propTypes = {

};

export default RequestFilter;