import {createStackNavigator} from 'react-navigation';
// 首页
import HomePage from '../views/home/HomePage';

import Main from '../views/Main';

//历史上的今天
// import History from '../views/history/History';

const routeConfigMap = {
  Main:Main,
  Home: HomePage,

};

const stackConfig = {
  headerMode: 'none',
  initialRouteName: 'Main',
};

const AppStackNavigator = createStackNavigator(routeConfigMap, stackConfig);

export default AppStackNavigator;
