/**
 created by Lex. 2019/8/13
 **/


import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

export default class LinearView extends PureComponent {

  static propTypes = {
    style: PropTypes.object,
    colors: PropTypes.array.isRequired,
    start: PropTypes.object,
    end: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LinearGradient
        start={this.props.start}
        end={this.props.end}
        colors={this.props.colors}
        style={this.props.style}>
        {this.props.children}
      </LinearGradient>
    );
  }

}
