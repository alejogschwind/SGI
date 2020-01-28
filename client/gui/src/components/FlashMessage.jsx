import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  render() {
    const { type, text} = this.props.message;
    return (
      <Alert
        message={text}
        banner
        closable
        type={type}
        onClose={this.onClose}
      />
    )
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired,
}

export default FlashMessage;