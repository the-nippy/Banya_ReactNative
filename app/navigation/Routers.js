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

import Movie from '../views/movie/Movie';
import Top250 from '../views/movie/Top250';
import NewMovie from "../views/movie/NewMovies";
import ComingMovies from '../views/movie/Coming';
import InTheater from "../views/movie/InTheater";
import MovieDetail from '../views/movie/MovieDetail';
import MovieVideo from '../views/movie/MovieVideo';
import PhotoList from '../views/movie/PhotoList';
import Celebrity from "../views/movie/Celebrity";


import Setting from '../views/setting/Setting';
import History from '../views/history/History';

// import HomePage from './home/HomePage';
// import Weather from './weather/Weather';

import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';

import {
  createDrawerNavigator, createAppContainer, createStackNavigator, DrawerItems, SafeAreaView,
}
  from 'react-navigation';
import {WIDTH} from "../utils/contants";


const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const MovieMap = createStackNavigator({
  Movie: Movie,
  Top250: Top250,
  NewMovie: NewMovie,
  ComingMovies: ComingMovies,
  InTheater: InTheater,
  MovieDetail: MovieDetail,
  MovieVideo: MovieVideo,
  Celebrity: Celebrity,
  PhotoList: PhotoList,
}, {
  initialRouteName: 'Movie',
  headerMode: 'none'
})

const MyDrawerNavigator = createDrawerNavigator(
  {
    Movie:
      {
        screen: MovieMap,
        navigationOptions: ({navigation}) => ({
          drawerLabel: '电影',
          gesturesEnabled: true,
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
        drawerLabel: '设定',
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
        drawerLabel: '历史',
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
    order: ['Movie', 'History', 'Setting'],
    // swipeEnabled: true,
    animationEnabled: true,
    // lazy: false,
    drawerLockMode: 'unlocked',//设置是否响应手势
    // tabBarPosition: 'bottom',
    drawerWidth: WIDTH * 2 / 3, //抽屉的宽度或返回的功能。
    drawerPosition: 'left', //选项是left或right。默认是left位置。
    useNativeAnimations: false, //启用原生动画。默认是true。
    drawerBackgroundColor: '#FFF', //使用抽屉背景获取某种颜色。默认是white。
    contentOptions: {
      //未选中的侧边item背景色
      // inactiveBackgroundColor:'#eee',
      // activeBackgroundColor: '#efefef',
      activeTintColor: '#FFF',
    },
    contentComponent: props => {
      return (
        <ScrollView>
          <SafeAreaView>
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
          </SafeAreaView>
        </ScrollView>
      )
    }
  });

// const MyApp = createAppContainer(MyDrawerNavigator);
export default MyDrawerNavigator;
