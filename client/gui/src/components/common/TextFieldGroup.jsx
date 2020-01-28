import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({ label, field, value, errors, non_field_errors, type, onChange}) => {
  if (errors) {
    if (errors.length === 0) {errors = null}
  }
  if (non_field_errors) {
    if (non_field_errors.length === 0) {non_field_errors = null}
  }
  return (
    <div className="form-group">
      <label htmlFor="username"><strong>{label}</strong></label>
      <input
        value={value}
        onChange={onChange}
        className={classnames("form-control", {"is-invalid": errors || non_field_errors})}
        type={type}
        name={field}
      />
      {errors && <ul className="invalid-feedback">{errors.map((val,index)=><li key={index}>{val}</li>)}</ul>}
      {non_field_errors && <ul className="invalid-feedback">{non_field_errors.map((val,index)=><li key={index}>{val}</li>)}</ul>}
    </div>
  );
}

TextFieldGroup.protoType = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  lable: PropTypes.string.isRequired,
  error: PropTypes.array.isRequired,
  non_field_errors: PropTypes.array.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

TextFieldGroup.defaultProps = {
  type: 'text',
  non_field_errors: []
}

export default TextFieldGroup;