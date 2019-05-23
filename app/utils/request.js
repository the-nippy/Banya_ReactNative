import {WEATHER_URL, WEATHER_KEY} from '../constant/config';

/**
 * fetch 数据需要 json() 转化为json数据
 *
 * */

async function requestWeatherData(cityName) {
  if (!cityName) {
    return new Error('cityName为空');
  }
  let weatherList = [];
  await fetch(WEATHER_URL + "?city=" + cityName + "&key=" + WEATHER_KEY, {method: 'GET'})
    .then(res => {
      res.json().then(res => {
        weatherList = res.result?.future;
        if (weatherList) {
          console.info('[request]weather', weatherList)
        } else {
          console.info('[getWeather]', '当前天气数据空')
          return new Error('ERROR')
        }
      }, err => {
        console.info('errjson', err)
        return new Error('ERROR')
      })
    }, err => {
      console.info('err', err)
      return new Error('ERROR')
    })
}


export default async function request(uri, method, params) {

  fetch(uri, {
    method: method,
    headers: JSON.stringify(params),
    // body: JSON.stringify(params)
  }).then(
    (res) => {
      if (res) {
        console.info('请求成功', res.json())
        return res.json();
      } else {

      }
    },
    (err) => {
      console.info('请求错误', err)
    }
  )

}

export {
  requestWeatherData,
}