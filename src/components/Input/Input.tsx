import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const Input = (props) => {
  const { disabled, content } = props;
  return (
    <Text
      style={{
        color: disabled ? 'red' : 'blue',
        fontSize: 20,
      }}>
      {content}
    </Text>
  );
};

Input.defaultProps = {
  content: '',
  disabled: false,
};

Input.propTypes = {
  content: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Input;
