/**
 created by Lex. 2019/7/30
 **/
import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';

export default class ImageButton extends PureComponent {

  static propTypes = {
    style: ViewPropTypes.style,
    imageStyle: ViewPropTypes.style,
    // source:
    onPress: PropTypes.func.isRequired,
    isShow: PropTypes.bool,
  }

  constructor(props) {
    super(props);
  }

  render() {
    let {style, source, onPress, imageStyle, isShow} = this.props;
    if (isShow !== false) {
      isShow = true;
    }
    return (
      isShow ? <TouchableOpacity
        style={[{paddingHorizontal: 8, paddingVertical: 5}, style]}
        onPress={onPress}
      >
        <Image source={source} style={[{width: 25, height: 25}, imageStyle]}/>
      </TouchableOpacity> : <View/>
    );
  }
}

