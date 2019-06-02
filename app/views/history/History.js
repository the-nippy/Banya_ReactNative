// import React, {PureComponent} from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
//
// //多选框
// import Toolbar from '../../component/header/Toolbar';
// import SwipeableItem from '../../component/swipeable/SwipeableItem';
// import Swipeable from 'react-native-swipeable';
// import {connect} from 'react-redux';
//
// class History extends PureComponent {
//
//   constructor(props) {
//     super(props);
//   }
//
//   componentWillMount(): void {
//   }
//
//   render() {
//     const DATA = this.props.historyInfoList?.[2];
//     console.info('pic', DATA.pic)
//     return (
//       <View>
//         <Toolbar
//           title={'历史上的今天'}
//         />
//         <View>
//           <Image
//             source={{uri: DATA.pic}}
//             style={{width: 80, height: 80}}
//           />
//           <Text>{DATA.title}</Text>
//           <Text>{DATA.des}</Text>
//         </View>
//       </View>
//     );
//   }
// }
//
// export default connect(state => ({
//   historyInfoList: state.constant.historyInfoList
// }), {})(History)


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

class MyHomeScreen extends PureComponent {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../../constant/image/circle_black_in_32px.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Notifications')}
      >
        <Text>Go to notifications</Text>
      </TouchableOpacity>
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
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.goBack()}
      >
        <Text>Go back home</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
});

const MyApp = createAppContainer(MyDrawerNavigator);
export default MyApp;