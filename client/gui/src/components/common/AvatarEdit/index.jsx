import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { updateProfile } from '../../../actions/updateProfileActions'
import { authCheckState } from '../../../actions/authActions'

import { Upload } from 'antd'
import './statics/css/styles.css';

class AvatarEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      avatar: this.props.avatar,
      bio: null,
      loading: false,
      success: null,
      error: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    const id = localStorage.getItem('userId')
    console.log(e.file)
    let dataForm = new FormData()
    dataForm.append('avatar', e.file)
    this.props.updateProfile(dataForm,id)
      .then(
        (res) => {
          console.log(res.data)
          this.setState({loading: false, success: true})
          this.props.authCheckState()
        },
        (err) => {
          this.setState({loading:false, error: true})
          console.error(err)
        }
      )
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true, error: null, success: null});
      return;
    }
    if (info.file.status === 'done') {
      console.log(info)
    }
  };

  render() {
    const { avatar, loading } = this.state;
    return (
      <Upload
        name="avatar"
        multiple={false}
        showUploadList={false}
        customRequest={this.handleSubmit}
        style={{'background': 'red'}}
        // beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        <div className="Avatar_wrp">
          { this.state.loading && <div className="Avatar_loading"></div>}
          { this.state.success && <div className="Avatar_border Avatar_border_success"></div>}
          { this.state.error && <div className="Avatar_border Avatar_border_error"></div>}
          { avatar ? 
            <img className={ this.props.scale ? "Avatar_profile Avatar_2x": "Avatar_profile"} width="70" height="70" src={avatar}/>
            :
            <div className={ this.props.scale ? "Avatar_profile Avatar_2x": "Avatar_profile"}></div>
          }
        </div>
      </Upload>
    );
  }
}


AvatarEdit.propTypes = {
  
};


export default connect(null, { authCheckState, updateProfile })(AvatarEdit);
