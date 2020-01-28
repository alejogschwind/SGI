import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Event from '../components/Event'
import Layout from '../containers/Layout';
import API from '../api';
import FlashMessagesList from '../components/FlashMessagesList';
import { deleteAllFlashMessage, addFlashMessage } from '../actions/flashMessages'

class EventPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      event: {}
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;;
    const api = new API({ url: 'http://192.168.1.104:8000'});
    api.createEntity({ name: 'events'})
    api.endpoints.events.getOne({ id })
      .then(
        (res) => {
          console.log(res.data)
          this.setState({ loading: false, event: res.data })
        }
      )
  }

  render() {
    const { event } = this.state;
    return (
      <Layout>
        { !this.state.loading &&
          <Event 
            event={event}
            deleteAllFlashMessage={deleteAllFlashMessage}
            addFlashMessage={addFlashMessage}
          />
        }
      </Layout>
    );
  }
}

EventPage.propTypes = {

};

export default EventPage;