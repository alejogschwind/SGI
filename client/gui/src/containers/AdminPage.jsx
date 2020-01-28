import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInscriptionsRequests } from '../actions/inscriptionsActions'
import PropTypes, { element } from 'prop-types';
import Layout from './Layout';
import Card from '../components/common/Card'

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      allInscripions: [],
      approvedInscriptions: [],
      pendingInscriptions: [],
    }
  }

  componentDidMount() {
    this.props.getInscriptionsRequests()
      .then(
        (res) => {
          const approvedInscriptions = res.data.filter( element => element.status == 'approved')
          const pendingInscriptions = res.data.filter( element => element.status == 'pending')
          this.setState({
            loading: false,
            allInscripions: res.data,
            approvedInscriptions: approvedInscriptions,
            pendingInscriptions: pendingInscriptions
          })
        },
        (err) => {
          console.log(err.response.data)
        }
      )
  }

  listInscriptions = () => {
    {
      this.state.inscriptions.forEach((element) =>
        <Card
          key={element.pk}
          eventName={element.event.title}
          firstName={element.user.personal.first_name}
          lastName={element.user.personal.last_name}
        />
      )
    }
  }

  render() {
    console.log(this.state)
    return (
      <Layout>
          {
            this.state.allInscripions.map((element) =>
              <Card
                key={element.pk}
                inscription={element}
                status={element.status}
              />
            )
          }
      </Layout>
    );
  }
}


AdminPage.propTypes = {
  
};


export default connect(null, {
  getInscriptionsRequests
})(AdminPage);
