import React, {Component} from 'react';
import {
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';

import AppNavigation from './navigation';
import NavigationService from './navigation/NavigationService';
import {store, persistor} from './redux';
import {Provider} from 'react-redux';

import {PersistGate} from 'redux-persist/es/integration/react'


export default class App extends Component {
  render() {

    // return (
    //   <View>
    //     <StatusBar
    //       barStyle={"light-content"}
    //     />
    //       <AppNavigation ref={navigator => NavigationService.setNavigator(navigator)}/>
    //   </View>
    // );

    return (
      <Provider store={store}>
        <StatusBar
          barStyle={"light-content"}
        />
        <PersistGate persistor={persistor}>
          <AppNavigation ref={navigator => NavigationService.setNavigator(navigator)}/>
        </PersistGate>
      </Provider>
    );
  }
}