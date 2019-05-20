import React, {Component} from 'react';
import {
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';

import AppNavigation from '../navigation/index';
import NavigationService from '../navigation/NavigationService';

export default class App extends Component {
  render() {

    return (
      <View>
        <StatusBar
          barStyle={"light-content"}
        />
          <AppNavigation ref={navigator => NavigationService.setNavigator(navigator)}/>
      </View>
    );

    // return (
    //   <Provider store={store}>
    //     <StatusBar
    //       barStyle={"light-content"}
    //     />
    //     <PersistGate persistor={persistor}>
    //       <AppNavigation ref={navigator => NavigationService.setNavigator(navigator)}/>
    //     </PersistGate>
    //   </Provider>
    // );
  }
}