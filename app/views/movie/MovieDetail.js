/**
 created by Lex. 2019/8/26

 电影详情页
 **/


import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Toolbar from "../../component/header/Toolbar";
import {COLOR} from "../../utils/contants";

//组件
// import {} from 'react-'

//数据

//资源

export default class MovieDetail extends PureComponent {

  constructor(props) {
    super(props);
  }

  /**
   * 底部的按钮先做成一个绝对定位的布局，根据到顶部的margin做成动画，改变的是到顶部的margin值
   *
   * 到到达ScrollView的底部的时候，触发事件，将该绝对布局隐藏，评论这个View衔接在ScrollView下
   * */

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          alpha={0.5}
          style={{
            ...StyleSheet.absoluteFill,
            // opacity:0.3,
            alpha: 0.8,
            zIndex: 100,
            // flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: 60,
            backgroundColor: '#4b7bab66'
          }}>
          <Text>
            速度与激情
          </Text>

        </View>


        <ScrollView style={{flex: 1,}}>
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <View key={index} style={{height: 90, backgroundColor: '#ccd', marginTop: 30}}>
                <Text>{item}</Text>
              </View>
            )
          )}
        </ScrollView>

      </View>
    );
  }

}
