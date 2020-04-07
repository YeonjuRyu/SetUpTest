import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';

const BarButton = (props) => {
  const { onPress, disabled, children } = props;
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        backgroundColor: disabled ? 'red' : 'blue',
        height: 50,
        width: 100,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
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
