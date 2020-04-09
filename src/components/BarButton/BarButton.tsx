import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';

const BarButton = (props) => {
  const { style, onPress, disabled, children } = props;
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[
        {
          backgroundColor: disabled ? 'gray' : 'green',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: 10,
        },
        style,
      ]}>
      {children}
    </TouchableHighlight>
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
