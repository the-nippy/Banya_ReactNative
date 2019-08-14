/**
 created by Lex. 2019/8/14

 新片榜，请求新片榜需要位置参数（城市名），默认北京

 需要请求位置
 **/

import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
} from 'react-native';

//组件
import Toolbar from "../../component/header/Toolbar";
import {connect} from 'react-redux';

//数据
import publicData, {changeLocationState} from "../../redux/public";
import {getCityFromLocation} from "../../utils/location";


class NewMovie extends PureComponent {

  constructor(props) {
    super(props);
  }

  async componentDidMount(): void {
    /*
     if (!this.props.isAllowLocation) {
       Alert.alert('定位', '需要获取您的位置来请求数据', [
         {
           text: '拒绝', onPress: () => {
           }
         }
       ])
     }
    */

    try {
      let location = await getCityFromLocation();
      console.info('location', location)
    } catch (e) {
      console.warn('e!!', e)
    }
  }

  render() {
    return (
      <View>
        <Toolbar title={'新片榜'}/>
      </View>
    );
  }
}


export default connect(state => ({
  isAllowLocation: state.publicData.isAllowLocation
}), {
  changeLocationState,
})(NewMovie);
