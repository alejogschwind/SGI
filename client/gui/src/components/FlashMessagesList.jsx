import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FlashMessage from './FlashMessage';
import { deleteFlashMessage } from '../actions/flashMessages'

class FlashMessagesList extends React.Component {
  render() {
    const {deleteFlashMessage} = this.props;
    const messages = this.props.messages.map(message =>
        <FlashMessage
          key={message.id}
          message={message}
          deleteFlashMessage={deleteFlashMessage}
        />
      )
    return (
      <div>
        {messages}
      </div>
    );
  }
}

FlashMessagesList.protoTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    messages: state.flashMessages
  }
}

const mapDispatchToProps = {
  deleteFlashMessage: deleteFlashMessage
}

export default connect(mapStateToProps,mapDispatchToProps)(FlashMessagesList);