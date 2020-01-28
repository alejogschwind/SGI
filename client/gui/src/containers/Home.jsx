import React from 'react';

import FlashMessagesList from '../components/FlashMessagesList';
import '../assets/statics/containers/Home.css';

// ANTD
import EventFilter from '../components/EventCardList/EventFilter'
import Header from '../components/Header';
import EventCardList from '../components/EventCardList';
import ResponsiveMenu from '../components/Header/ResponsiveMenu';
import MenuBtn from '../components/Header/MenuBtn';
import Layout from './Layout';

import axios from 'axios';


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
    axios.get('http://192.168.1.104:8000/events/')
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

export default Home;