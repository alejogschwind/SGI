import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Divider, Tag } from 'antd';

import axios from 'axios';
import AdminLayout from './AdminLayout';


class ListEvents extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: [],
      loading: true,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/events')
      .then((res) => {
        this.setState({loading: false})
        this.setState({events: res.data})
      },
      () => {

      })
  }

  render() {
    const columns = [
      {
        title: 'Evento',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Comienza',
        dataIndex: 'start_date',
        key: 'star_date',
      },
      {
        title: 'Termina',
        dataIndex: 'end_date',
        key: 'end_date',
      },
      {
        title: 'Tipo',
        key: 'type',
        dataIndex: 'type',
        render: type => (
          <span>
            <Tag color="red">
              {type}
            </Tag>
          </span>
        ),
      },
      {
        title: 'Opciones',
        key: 'action',
        render: (text, record) => (
          <span>
            <a>Edit</a>
            <Divider type="vertical" />
            <a>Ocultar</a>
          </span>
        ),
      },
    ];
    return (
      <div>
        <AdminLayout>
          <Table columns={columns} dataSource={this.state.events}/>
        </AdminLayout>
      </div>
    );
  }
}


ListEvents.propTypes = {
  
};


export default ListEvents;
