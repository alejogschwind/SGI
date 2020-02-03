import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API_HOST } from '../../../config';

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
    const { first_name, last_name, avatar, status, event_title} = this.props;
    return (
      <div>
        <Card style={{ width: '90vw', marginTop: 16 }}>
          <Meta
            avatar={
              <Avatar src={API_HOST + avatar} />
            }
            title={first_name + ' ' + last_name}
          />
          <p>{event_title}</p>
          <Badge status={STATUS[status].badge} />
          {STATUS[status].text}
        </Card>
      </div>
    );
  }
}

RequestCard.propTypes = {
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  event_title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default RequestCard;
