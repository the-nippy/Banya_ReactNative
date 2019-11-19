import React, {Component} from 'react';
import {
  StatusBar,
} from 'react-native';

import AppNavigation from './navigation';
import NavigationService from './navigation/NavigationService';
import {store, persistor} from './redux';
import {Provider} from 'react-redux';

import {PersistGate} from 'redux-persist/es/integration/react'


export default class App extends Component {

  componentDidMount(): void {
    if (!__DEV__) {
      GLOBAL.console = {
        info: () => {
        },
        log: () => {
        },
        warn: () => {
        },
        debug: () => {
        },
        error: () => {
        }
      };
    }
  }

  render() {
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
