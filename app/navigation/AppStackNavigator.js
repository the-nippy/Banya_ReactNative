import {createStackNavigator} from 'react-navigation';
// 首页
import HomePage from '../views/home/HomePage';


const routeConfigMap = {
  HomePage: HomePage,
};

const stackConfig = {
  headerMode: 'none',
  initialRouteName: 'HomePage',
};

const AppStackNavigator = createStackNavigator(routeConfigMap, stackConfig);

export default AppStackNavigator;
