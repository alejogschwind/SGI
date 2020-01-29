import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, Icon, Skeleton, Statistic } from 'antd';
const { Meta } = Card;

class AdminCardEvent extends Component {
  render() {
    return (
      <Card
        style={{ width: 90 + 'vw', marginTop: 16 }}
        actions={[
          <Icon type="unordered-list" key="unordered-list" />,
          <Icon type="edit" key="edit"/>,
          <Icon type="ellipsis" key="ellipsis" />,
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
