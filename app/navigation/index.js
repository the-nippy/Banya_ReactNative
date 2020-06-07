import {createSwitchNavigator, createAppContainer} from 'react-navigation';


import AppDrawerNavigator from './Routers';


const routeConfigMap = {
  AppDrawerNavigator,
};

const switchConfig = {
  headerMode: 'none',
  initialRouteName: 'AppDrawerNavigator',
};

const AppNavigator = createSwitchNavigator(routeConfigMap, switchConfig);

export default createAppContainer(AppNavigator);
