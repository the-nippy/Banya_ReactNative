/**
 * 重点   动画交互
 *
 * */


import React, {PureComponent} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import Movie from './movie/Movie';
import Top250 from './movie/Top250';

import Setting from './setting/Setting';
import History from './history/History';

// import HomePage from './home/HomePage';
// import Weather from './weather/Weather';

import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';

import {
  createDrawerNavigator, createAppContainer, createStackNavigator, DrawerItems
}
  from 'react-navigation';


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const MovieMap = createStackNavigator({
  Movie: Movie,
  Top250: Top250,
}, {
  initialRouteName: 'Movie',
  headerMode: 'none'
})

const MyDrawerNavigator = createDrawerNavigator(
  {
    Movie:
      {
        screen: MovieMap,
          drawerLockMode: 'unlocked',
          navigationOptions: ({navigation}) => ({
            title: '主页',
            gesturesEnabled: true,
            drawerLockMode: 'unlocked',
            drawerIcon: ({tintColor}) => (
              <Image
                source={require('../constant/image/circle_check_32px.png')}
                style={[styles.icon, {tintColor: tintColor}]}
              />
            ),
          })
      },
    Setting: {
      screen: Setting,
      navigationOptions: ({navigation}) => ({
        title: '主页',
        gesturesEnabled: true,
        drawerLockMode: 'unlocked',
        drawerIcon: ({tintColor}) => (
          <Image
            source={require('../constant/image/circle_check_32px.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      })
    },
    History: {
      screen: History,
      navigationOptions: ({navigation}) => ({
        title: '主页',
        gesturesEnabled: true,
        drawerLockMode: 'unlocked',
        drawerIcon: ({tintColor}) => (
          <Image
            source={require('../constant/image/circle_check_32px.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      })
    }
    // Weather: {screen: Weather}
  },

  {
    initialRouteName: 'Movie',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: false,
    drawerLockMode: 'unlocked',//设置是否响应手势
    tabBarPosition: 'bottom',
    drawerWidth: 200, //抽屉的宽度或返回的功能。
    drawerPosition: 'left', //选项是left或right。默认是left位置。
    useNativeAnimations: false, //启用原生动画。默认是true。
    drawerBackgroundColor: '#FFF', //使用抽屉背景获取某种颜色。默认是white。
    contentComponent: props => {
      return (
        <ScrollView>
          <View>
            <View style={{
              height: 100,
              backgroundColor: '#4c70ca',
              alignItems: 'flex-start',
              justifyContent: 'center'
            }}>
              <Text style={{marginLeft: 20, fontSize: 21}}>全部活动类型</Text>
            </View>

            <View style={{width: 200, height: 30, backgroundColor: '#ffffff'}}></View>

            <DrawerItems {...props} />

          </View>
        </ScrollView>
      )
    }
  });

// const MyApp = createAppContainer(MyDrawerNavigator);
const MyApp = MyDrawerNavigator;
export default MyApp;
