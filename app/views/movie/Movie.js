/**
 created by Lex. 2019/7/29
 **/
import React, {PureComponent} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,

} from 'react-native';

import Toolbar from '../../component/header/Toolbar';

const FUNCTIONS = ['Top250', '正在上映', '即将上映'];

export default class Movie extends PureComponent {

  static navigationOptions = {
    drawerLabel: '电影',
    drawerLockMode: 'unlocked'
  }

  constructor(props) {
    super(props);
  }

  //Top250等function被点击
  onFunctionsPress = (index) => {
    switch (index) {
      case 0:
        this.props.navigation.navigate('Top250')
        break;
      case 1:
        break;
      case 2:
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#eee'}}>
        <Toolbar
          title={'电影'}
        />
        <ScrollView style={{flex: 1}}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.openDrawer()
          }}>
            <Text>电影界面</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 15,
              paddingHorizontal: 15,
              height: 60,
              borderRadius: 8,
              backgroundColor: '#fff'
            }}
            // horizontal={true}
            // showsHorizontalScrollIndicator={false}
          >
            {FUNCTIONS.map((item, index) => {
              return (
                <View style={{paddingHorizontal: 5, paddingVertical: 5}}>
                  <TouchableOpacity onPress={() => {
                    this.onFunctionsPress(index)
                  }}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>


        </ScrollView>
      </View>
    );
  }
}
