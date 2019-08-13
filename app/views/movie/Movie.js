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
import LinearView from '../../component/linear/LinearView';
import {WIDTH} from "../../utils/contants";

const FUNCTIONS = ['Top250', '正在上映', '即将上映'];
const ICON_250 = require('../../constant/image/movie/top250.png');
const ICON_WILL = require('../../constant/image/movie/will.png');
const ICON_PLAYING = require('../../constant/image/movie/playing.png');
const ICON_MENU = require('../../constant/image/movie/menu.png');
const Icons = [ICON_250, ICON_WILL, ICON_PLAYING];


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
          hideLeftButtons={true}
          leftButtons={[
            {
              icon: ICON_MENU,
              onPress: () => {
                this.props.navigation.openDrawer();
              },
            }
          ]}
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
              justifyContent: 'space-around',
              // marginHorizontal: 15,
              // paddingHorizontal: 15,
              height: 60,
              borderRadius: 8,
              backgroundColor: '#fff'
            }}
            // horizontal={true}
            // showsHorizontalScrollIndicator={false}
          >
            {FUNCTIONS.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#4b7bab',
                    // width: WIDTH/4,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    paddingHorizontal: 8,
                  }}>
                  <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}
                    onPress={() => {
                      this.onFunctionsPress(index)
                    }}>
                    <Image source={Icons[index]} style={{
                      width: 30, height: 30, paddingHorizontal: 5,
                      paddingVertical: 5
                    }}/>
                    <Text style={{fontSize: 12, color: '#FFF', marginLeft: 5}}>{item}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>


          <LinearView
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#A00', '#0A0', '#00A']}
          >
            <Text>你在哪</Text>
            <Text>OK</Text>
          </LinearView>


        </ScrollView>
      </View>
    );
  }
}
