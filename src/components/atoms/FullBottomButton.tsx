import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';

const FullBottomButton = (props) => {
  const { style, onPress, title, color, disabled } = props;
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1.0 : 0.7}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 60,
          backgroundColor: disabled ? 'rgb(216,216,216)' : color,
        },
        style,
      ]}
      onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

FullBottomButton.defaultProps = {
  title: null,
  onPress: () => {},
  disabled: false,
  color: 'rgb(44,160,165)',
};

FullBottomButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
};

export default FullBottomButton;
