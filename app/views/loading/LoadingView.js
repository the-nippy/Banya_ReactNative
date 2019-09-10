/**
 created by Lex. 2019/9/10
 **/

import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';


//组件
import LinearView from "../../component/linear/LinearView";

//数据
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//资源
const ICON_FAIL = require('../../constant/image/fail.png');

class Loading extends PureComponent {

  static propTypes = {
    loadingState: PropTypes.string.isRequired,
    reloadData: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loadingState === STATES.LOADING) {
      return (
        <LinearView
          colors={['#cce0eb', '#FEE', '#dfdbab']}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        >
          <ActivityIndicator size={'large'} color={this.props.themeColor}/>
        </LinearView>
      );
    } else if (this.props.loadingState === STATES.FAIL) {
      return (
        <LinearView
          colors={['#cce0eb', '#FEE', '#dfdbab']}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.reloadData()
            }}
            style={{alignItems: 'center'}}
          >
            <Image source={ICON_FAIL} style={{width: 40, height: 40, tintColor: this.props.themeColor}}/>
            <Text style={{marginTop: 15, color: '#b7b7b7', fontSize: 18}}>点击重新加载</Text>
          </TouchableOpacity>
        </LinearView>
      );
    } else {
      console.warn('LoadingView未传入状态')
      return null;
    }
  }

}

const LoadingView = connect((state) => ({
  themeColor: state.publicInfo.themeColor
}), {})(Loading);

const STATES = {
  LOADING: 'LOADING',
  FAIL: 'FAIL',
}

export {
  LoadingView,
  STATES,
}
