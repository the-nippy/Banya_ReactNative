import React, {PureComponent} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';
import styles from './Toolbar.style';
import TextButton from '../button/TextButton';

const ICON_BACK = require('../../constant/image/back.png');
const fallbackView = <View/>;

class Toolbar extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    hideLeftButtons: PropTypes.bool,
    leftButtons: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        onPress: PropTypes.func,
      })),
      PropTypes.shape({
        text: PropTypes.string,
        onPress: PropTypes.func,
      }),
    ]),
    rightButtons: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        onPress: PropTypes.func,
      })),
      PropTypes.shape({
        text: PropTypes.string,
        onPress: PropTypes.func,
      }),
    ]),
    onBackPress: PropTypes.func,
  };

  static defaultProps = {
    hideLeftButtons: false,
  };

  renderButton = (button, i) => {
    if (button.icon) {
      return (
        <TouchableOpacity
          key={i}
          onPress={button.onPress}
          disabled={button.disabled}
          style={styles.iconButton}>
          <Image
            source={button.icon}
            style={styles.buttonIcon}
            resizeMode="contain"/>
        </TouchableOpacity>
      );
    } else {
      return (
        <TextButton
          key={i}
          text={button.text}
          disabled={button.disabled}
          onPress={button.onPress}/>
      )
    }
  };

  render() {
    const {title, hideLeftButtons, leftButtons, rightButtons, backgroundColor, style} = this.props;

    let leftButtonsView = fallbackView;
    if (leftButtons) {
      const finalLeftButtons = Array.isArray(leftButtons) ? leftButtons : [leftButtons];
      leftButtonsView = (
        <View style={styles.buttons}>
          {finalLeftButtons.map(this.renderButton)}
        </View>
      );
    } else if (!hideLeftButtons) {
      leftButtonsView = (
        <TouchableOpacity
          onPress={this.goBack}
          style={styles.backButton}>
          <Image
            source={ICON_BACK}
            style={styles.backIcon}
            resizeMode="contain"/>
        </TouchableOpacity>
      );
    }

    let rightButtonsView = fallbackView;
    if (rightButtons) {
      const finalRightButtons = Array.isArray(rightButtons) ? rightButtons : [rightButtons];
      rightButtonsView = (
        <View style={styles.buttons}>
          {finalRightButtons.map(this.renderButton)}
        </View>
      );
    }

    const containerStyle = StyleSheet.compose(styles.container, style);
    const finalContainerStyle = backgroundColor ? [containerStyle, {backgroundColor}] : containerStyle;
    return (
      <View style={finalContainerStyle}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
        </View>
        <View style={styles.actionBar}>
          {leftButtonsView}
          {rightButtonsView}
        </View>
      </View>
    );
  }

  goBack = () => {
    if (typeof this.props.onBackPress === 'function') {
      this.props.onBackPress();
    } else {
      this.props.navigation.goBack(null);
    }
  };
}

export default withNavigation(Toolbar);
// export default Toolbar;
