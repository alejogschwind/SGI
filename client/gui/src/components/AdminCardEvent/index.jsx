import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, Icon, Skeleton, Statistic } from 'antd';
const { Meta } = Card;

class AdminCardEvent extends Component {
  render() {
    return (
      <Card
        style={{ width: 90 + 'vw', marginBottom: 16}}
        actions={[
          <Link to={`admin/request/${this.props.id}`}>
            <Icon type="unordered-list" key="unordered-list" />
          </Link>,
          <Icon type="edit" key="edit"/>
        ]}
      >
        <Skeleton loading={this.props.loading}>
          <Meta
            title={this.props.title}
          />
          <br/>
          <Statistic
            title="Inscriptos"
            value={this.props.inscriptions}
            suffix={'/ '+ this.props.max_inscriptions}
          />
        </Skeleton>
      </Card>
    );
  }
}

AdminCardEvent.propTypes = {
  id: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  public: PropTypes.bool.isRequired,
  inscriptions: PropTypes.number.isRequired,
  max_inscriptions: PropTypes.number.isRequired,
};

export default AdminCardEvent;
