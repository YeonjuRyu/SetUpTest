import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';

const BarButton = (props) => {
  const { style, onPress, disabled, title } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={disabled ? 1.0 : 0.7}
      style={[
        {
          backgroundColor: disabled ? 'gray' : 'rgb(44, 160, 165)',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          borderRadius: 8,
          flexDirection: 'row',
        },
        style,
      ]}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

BarButton.defaultProps = {
  children: null,
  onPress: () => {},
  disabled: false,
};

BarButton.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default BarButton;
