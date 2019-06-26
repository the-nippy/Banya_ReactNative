import {createStackNavigator} from 'react-navigation';
// 首页
import HomePage from '../views/home/HomePage';

import Main from '../views/Main';
//天气
import Weather from '../views/weather/Weather';
//历史上的今天
// import History from '../views/history/History';

const routeConfigMap = {
  Main:Main,
  Home: HomePage,
  Weather,

};

const stackConfig = {
  headerMode: 'none',
  initialRouteName: 'Main',
};

const AppStackNavigator = createStackNavigator(routeConfigMap, stackConfig);

export default AppStackNavigator;
