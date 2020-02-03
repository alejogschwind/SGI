import React from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../actions/eventsActions'

import '../assets/statics/containers/Home.css';

import EventFilter from '../components/EventCardList/EventFilter'
import EventCardList from '../components/EventCardList';
import Layout from './Layout';


class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      menu: false,
      events: [],
      loading: true
    }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu() {
    // console.log('open')
    this.setState({menu: !this.state.menu})
  }

  componentDidMount() {
    this.props.getEvents()
      .then(
        (res) => {
          this.setState({loading: false})
          this.setState({events: res.data})
        },
        (res) => {

        }
      )
  }

  render() {
    const { events, loading } = this.state;
    const body = document.getElementsByTagName('body')[0];
    loading ? 
      body.className = 'not_scrollable'
    :
      body.className = 'scrollable';
    return (
      <Layout>
        <EventFilter />
        <EventCardList events={events} loading={loading}/>
      </Layout>
    );
  }
}

export default connect(null, { getEvents })(Home);