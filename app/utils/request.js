import {WEATHER_URL} from '../constant/config';

/**
 * fetch 数据需要 json() 转化为json数据
 *
 * */
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