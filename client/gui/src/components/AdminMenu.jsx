import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd';

import { Link } from 'react-router-dom'

export class AdminMenu extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    const { SubMenu } = Menu;
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          style={{ width: 256 }}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span>Usuarios</span>
              </span>
            }
          >
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="calendar" />
                <span>Eventos</span>
              </span>
            }
          >
            <Menu.Item key="5"><Link to="/admin/events"><Icon type="unordered-list"/>Listar Eventos</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/admin/create/event"><Icon type="plus"/>Nuevo Evento</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default AdminMenu
