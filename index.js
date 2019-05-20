/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
// import HomePage from './app/views/home/HomePage';
import {name as appName} from './app.json';
import SimpleApp from './app/navigation/index';

AppRegistry.registerComponent(appName, () => SimpleApp);
