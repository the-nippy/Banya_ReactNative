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

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          alpha={0.5}
          style={{
            ...StyleSheet.absoluteFill,
            // opacity:0.3,
            alpha:0.8,
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

        <ScrollView style={{flex: 1 }}>
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
