/**
 created by Lex. 2019/9/10

 剧照相册等图片列表
 **/


import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';


//组件
import Toolbar from "../../component/header/Toolbar";

//数据

//资源

export default class PhotoList extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Toolbar title={'图片'}/>
      </View>
    );
  }

}
