import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import styles from './TextButton.style';

export default class TextButton extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
  };

  static defaultProps = { disabled: false };

  render() {
    const { disabled, onPress, text, style, textStyle } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[styles.button, style]}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
