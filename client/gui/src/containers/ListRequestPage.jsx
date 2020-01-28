import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setInscriptions } from '../actions/inscriptionsActions';
import PropTypes from 'prop-types';
import Layout from './Layout';
import RequestCard from '../components/common/RequestCard'

class ListRequestPage extends Component {
  constructor(props) {
    super(props);
  }
  
  // TO DO: Buscar una manera de hacer menos request al servidor.
  componentDidMount() {
    this.props.setInscriptions()
  }

  render() {
    return (
      <Layout>
        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
          {
            this.props.inscriptions.map(function (element) {
              return (
                <RequestCard
                  key={element.pk}
                  first_name={element.user.personal.first_name}
                  last_name={element.user.personal.last_name}
                  avatar={element.user.profile.avatar}
                  event={element.event.title}
                  status={element.status}
                />
              )
            }
            )
          }
        </div>
      </Layout>
    );
  }
}


ListRequestPage.propTypes = {
  
};


function mapStateToProps(state) {
  console.log(state)
  return {
    loading: state.auth.loading,
    inscriptions: state.inscriptions
  }
}

export default connect(mapStateToProps,{
  setInscriptions
})(ListRequestPage);
