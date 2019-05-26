/**
 * 创建的常规的状态保存
 *
 * 初始状态为对象
 * 包含城市string，城市天气array等数据
 *
 *
 * 天气
 *
 * 城市
 *
 * */
import {WEATHER_URL, WEATHER_KEY} from '../constant/config';
import {requestWeatherData} from '../utils/request';
import {ShowToast} from "../utils/toast";

const INITIAL_STATE = {
  weatherList: [],
  cityName: '深圳',
};
// const INITIAL_WEATHER = [];
//改变城市
const CHANGE_CITY = 'CHANGE_CITY';
//改变天气数据
const CHANGE_WEATHER = 'CHANGE_WEATHER';

//处理的reducer
export default function (state = INITIAL_STATE, action) {


  switch (action.type) {
    case CHANGE_CITY:
      const state1 = {...state};
      state1.cityName = action.cityName;
      return state1;

    case CHANGE_WEATHER:
      const state2 = {...state};
      state2.weatherList = action.weatherList;
      return state2;

    default:
      return state;
  }

}


export function changeCity(cityText) {
  return {
    type: CHANGE_CITY,
    cityName: cityText
  }
}

export function getWeatherByCity(cityName) {
  return async function (dispatch) {
    try {
      //request返回的是一个Promise对象
      const weatherList = await requestWeatherData(cityName);
      console.info('[redux-constant]weather', weatherList)
      dispatch({
        type: CHANGE_WEATHER,
        weatherList: weatherList
      })
    } catch (e) {
      console.info('ERROR', e.message)
      ShowToast(e.message)
    }
  }
}