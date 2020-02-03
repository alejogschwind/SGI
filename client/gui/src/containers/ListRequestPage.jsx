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
                  event_title={element.event.title}
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
  loading: PropTypes.bool.isRequired,
  inscriptions: PropTypes.object.isRequired,
  setInscriptions: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    inscriptions: state.inscriptions
  }
}

export default connect(mapStateToProps,{
  setInscriptions
})(ListRequestPage);
