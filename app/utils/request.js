import {WEATHER_URL, WEATHER_KEY} from '../constant/config';

/**
 * fetch 数据需要 json() 转化为json数据
 *
 * */


//请求天气
async function requestWeatherData(cityName) {
  if (!cityName) {
    return new Error('cityName为空');
  }
  let weatherList = [];
  //通过返回一个Promise   resolve
  return new Promise((resolve, reject) => {
    fetch(WEATHER_URL + "?city=" + cityName + "&key=" + WEATHER_KEY, {method: 'GET'})
      .then(res => {
        res.json().then(res => {
          // console.info('', res)
          if (res.error_code && res.error_code === 207301) {
            reject(new Error(res.reason));
          }
          weatherList = res.result?.future;
          if (weatherList) {
            console.info('[request]weather', weatherList)
            resolve(weatherList);
          } else {
            // console.info('[getWeather]', '当前天气数据空' + weatherList)
            reject(new Error('ERROR_no_data'))
          }
        }, err => {
          console.info('errjson', err)
          reject(err)
        })
      }, err => {
        console.info('err', err)
        reject(err)
      })
  })

}


export function request(uri, method, params) {

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