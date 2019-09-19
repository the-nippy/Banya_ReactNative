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
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
//数据

//资源

export default class PhotoList extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollableTabView renderTabBar={() => <DefaultTabBar someProp={'here'}/>}>
        <MyPage tabLabel="React" pageIndex={1}/>
        <MyPage tabLabel="Flow" pageIndex={2}/>
        <MyPage tabLabel="Jest" pageIndex={3}/>
      </ScrollableTabView>
    );
  }

}


export class MyPage extends PureComponent {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#9effb1'}}>
        <Text>{'page' + this.props.pageIndex}</Text>
      </View>
    );
  }


}
