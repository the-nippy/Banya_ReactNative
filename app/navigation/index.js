import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AppStackNavigator from './AppStackNavigator';
import SplashScreen from '../views/SplashScreen';
import Login from '../views/login/Login';

const routeConfigMap = {
  SplashScreen,
  App: AppStackNavigator,
  Login,
};

const switchConfig = {
  headerMode: 'none',
  initialRouteName: 'SplashScreen',
};

const AppNavigator = createSwitchNavigator(routeConfigMap, switchConfig);

export default createAppContainer(AppNavigator);
