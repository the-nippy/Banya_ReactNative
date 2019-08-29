/**
 created by Lex. 2019/8/29
 **/

import React, {PureComponent} from 'react';
import {
  View,
} from 'react-native';

//组件
import PropTypes from 'prop-types';

//数据
import {WIDTH} from "../../utils/contants";

const DEFAULT_HEIGHT = 6;
const DEFAULT_WIDTH = WIDTH / 3 + 20;
//资源

export default class SimpleProgress extends PureComponent {

  static propTypes = {
    progressPercent: PropTypes.string.isRequired,
    containerStyle: PropTypes.object,
    barStyle: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }


  render() {

    const {containerStyle, progressPercent, barStyle} = this.props;
    return (
      <View style={[{
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        borderRadius: 2,
        backgroundColor: '#d0c8bc'
      }, containerStyle]}>
        <View
          style={[{width: progressPercent, height: '100%', backgroundColor: '#edae64', borderRadius: 2}, barStyle]}/>
      </View>
    );
  }
}
