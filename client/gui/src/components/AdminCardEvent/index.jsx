import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, Icon, Skeleton, Statistic } from 'antd';
const { Meta } = Card;

class AdminCardEvent extends Component {
  render() {
    return (
      <Card
        style={{ width: 90 + 'vw', marginTop: 16 }}
        actions={[
          <Link to={`admin/request/${this.props.id}`}><Icon type="unordered-list" key="unordered-list" /></Link>,
          <Icon type="edit" key="edit"/>
        ]}
      >
        <Skeleton loading={this.props.loading}>
          <Meta
            title={this.props.title}
          />
          <br/>
          <Statistic title="Inscriptos" value={this.props.inscriptions} suffix={'/ '+ this.props.max_inscriptions} />
        </Skeleton>
      </Card>
    );
  }
}


AdminCardEvent.propTypes = {
  
};


export default AdminCardEvent;
