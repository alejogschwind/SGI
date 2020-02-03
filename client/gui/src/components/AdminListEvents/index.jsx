import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEventsAsRDR } from '../../actions/eventsActions';

import AdminCardEvent from '../AdminCardEvent'

import './statics/css/styles.css'

class AdminListEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      events: []
    }
  }

  componentDidMount() {
    this.props.getEventsAsRDR()
      .then(
        (res) => {
          this.setState({
            loading: false,
            events: res.data
          })
        }
      )
  }

  render() {
    return (
      <section className="AdminListEvents_wrp">
        {
          this.state.events.map(event => {
            return (
              <AdminCardEvent
                key={event.pk}
                id={event.pk}
                loading={this.state.loading}
                title={event.title}
                public={event.public}
                inscriptions={event.inscriptions}
                max_inscriptions={event.max_inscriptions}
              />
            )
          }
          )
        }
      </section>
    );
  }
}

AdminListEvents.propTypes = {
  getEventsAsRDR: PropTypes.func.isRequired
};

export default connect(null, {
  getEventsAsRDR
})(AdminListEvents);
