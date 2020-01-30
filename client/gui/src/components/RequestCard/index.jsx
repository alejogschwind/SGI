import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, Icon, Skeleton, Badge, Descriptions, Statistic } from 'antd';
const { Meta } = Card;

class RequestCard extends Component {
  render() {
    const { inscription, loading } = this.props;
    const STATUS = {
      pending: {
        badge: 'processing',
        text: 'Pendiente de aprobación'
      },
      approved: {
        badge: 'success',
        text: 'Aprobada'
      },
      deny: {
        badge: 'error',
        text: 'Denegada'
      },
      cancelled: {
        badge: 'default',
        text: 'Cancelada'
      }
    }
    return (
      <Card
        style={{ width: 90 + 'vw', marginTop: 16}}
        actions={[
          <Icon type="check" key="check"/>,
          <Icon type="close" key="close" />,
        ]}
      >
        <Skeleton loading={loading}>
          <Meta
            title={inscription.event.title}
            />
          <br/>
          <Badge status={STATUS[inscription.status].badge} />{STATUS[inscription.status].text}
          <Descriptions>
            <Descriptions.Item label="Solicitante">{inscription.user.personal.first_name} {inscription.user.personal.last_name}</Descriptions.Item>
          </Descriptions>
          {/* <Statistic title="Inscriptos" value={this.props.inscriptions} suffix={'/ '+ this.props.max_inscriptions} /> */}
        </Skeleton>
      </Card>
    );
  }
}


RequestCard.propTypes = {
  
};


export default RequestCard;
