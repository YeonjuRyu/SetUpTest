import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

const Input = (props) => {
  const { editable } = props;
  let content = '';
  return (
    <TouchableOpacity
      style={{ borderWidth: 1, borderRadius: 3, height: 50, width: '100%' }}>
      <TextInput onChangeText={() => {}} editable={editable} />
    </TouchableOpacity>
  );
};

Input.defaultProps = {
  content: '',
  editable: true,
};

Input.propTypes = {
  content: PropTypes.string,
  editable: PropTypes.bool,
};

export default Input;
