/**
 created by Lex. 2019/9/10
 **/


import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import Toolbar from "../../component/header/Toolbar";

//组件

//数据

//资源

export default class Celebrity extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Toolbar
          title={'影人'}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({});
