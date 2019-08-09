import {createSwitchNavigator, createAppContainer} from 'react-navigation';
// import AppStackNavigator from './AppStackNavigator';

import AppDrawerNavigator from '../views/Main';
// import SplashScreen from '../views/SplashScreen';
// import Login from '../views/login/Login';

const routeConfigMap = {
  // SplashScreen,
  // App: AppStackNavigator,
  AppDrawerNavigator,
  // Login,
};

const switchConfig = {
  headerMode: 'none',
  initialRouteName: 'AppDrawerNavigator',
};

const AppNavigator = createSwitchNavigator(routeConfigMap, switchConfig);

// export default createAppContainer(AppNavigator);
export default createAppContainer(AppDrawerNavigator);
