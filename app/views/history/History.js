import React, {PureComponent} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';

import {createDrawerNavigator, createAppContainer} from 'react-navigation';

// import {DrawerNavigator} from 'react-navigation'

class MyHomeScreen extends PureComponent {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../../constant/image/circle_black_in_32px.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
    drawerLockMode: 'unlocked',//设置是否响应手势
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#d0c44d'}}>

        <TouchableOpacity
          onPress={
            // () => this.props.navigation.navigate('Notifications')
            ()=>this.props.navigation.openDrawer()
          }
        >
          <Text>Go to notifications</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../../constant/image/circle_check_32px.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
    drawerLockMode: 'unlocked',//设置是否响应手势
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#99e'}}>
        <TouchableOpacity
          onPress={
            // () => this.props.navigation.goBack()

            ()=>this.props.navigation.openDrawer()

          }
        >
          <Text>Go back home</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {screen: MyHomeScreen},
    Notifications: {screen: MyNotificationsScreen},
  },

  {
    initialRouteName: 'Home',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: false,

    drawerLockMode: 'unlocked',//设置是否响应手势
    tabBarPosition: 'bottom',
    drawerWidth: 250, //抽屉的宽度或返回的功能。
    drawerPosition: 'left', //选项是left或right。默认是left位置。
    useNativeAnimations: false, //启用原生动画。默认是true。
    drawerBackgroundColor: 'pink', //使用抽屉背景获取某种颜色。默认是white。
  });

// const MyApp = createAppContainer(MyDrawerNavigator);
const MyApp = MyDrawerNavigator;
export default MyApp;