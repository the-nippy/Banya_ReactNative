/**
 created by Lex. 2019/8/14
 **/
import {BaseGetRequest} from "./request/baseRequest";
import {URLS} from "./request/RequestConfig";

//获取位置信息

const MapKey = 'DZIBZ-YKSK3-EBF37-3JSNA-RZMCF-Z6BCS';

function getLocationInfo() {

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(res => {
      if (res.coords) {
        resolve(res.coords);
      } else {
        reject(res);
      }
    }, err => {
      reject(err);
    })
  })

}

export async function getCityFromLocation() {

  let coords = {};
  try {
    coords = await getLocationInfo();
  } catch (e) {
    throw e;
  }
  const location = coords.latitude + ',' + coords.longitude;
  const params = {
    location,
    key: MapKey
  }

  return new Promise((resolve, reject) => {
    BaseGetRequest(URLS.MAP.COORDS, params).then(
      res => {
        console.info('res', res)
        if (res?.result?.ad_info) {
          resolve(res.result.ad_info);
        } else {
          reject(res)
        }
      },
      err => {
        reject(err);
      }
    )
  })
}
