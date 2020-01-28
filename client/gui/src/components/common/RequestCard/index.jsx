import React, { Component } from 'react';
import PropTypes, { element } from 'prop-types';

import {Badge, Avatar, Card } from 'antd';
const { Meta } = Card;

class RequestCard extends Component {
  render() {
    const STATUS = {
      pending: {
        badge: 'processing',
        text: 'Pendiente de aprobación'
      },
      approved: {
        badge: 'success',
        text: 'Solicitud aprobada'
      },
      deny: {
        badge: 'error',
        text: 'Solicitud rechazada'
      },
      cancelled: {
        badge: 'default',
        text: 'Solicitud cancelada'
      }
    }
    const { first_name, last_name, avatar, status, event} = this.props;
    return (
      <div>
        <Card style={{ width: '90vw', marginTop: 16 }}>
          <Meta
            avatar={
              <Avatar src={'http://192.168.1.104:8000' + avatar} />
            }
            title={first_name + ' ' + last_name}
          />
          <p>{event}</p>
          <Badge status={STATUS[status].badge} />
          {STATUS[status].text}
        </Card>
      </div>
    );
  }
}


RequestCard.propTypes = {
  
};



export default RequestCard;
