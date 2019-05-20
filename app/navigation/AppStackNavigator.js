import {createStackNavigator} from 'react-navigation';
// 首页
import HomePage from '../views/home/HomePage';
//天气
import Weather from '../views/weather/Weather';

const routeConfigMap = {
  Home:HomePage,
  Weather,

};

const stackConfig = {
  headerMode: 'none',
  initialRouteName: 'Home',
};

const AppStackNavigator = createStackNavigator(routeConfigMap, stackConfig);

export default AppStackNavigator;
