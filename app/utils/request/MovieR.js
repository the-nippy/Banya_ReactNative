/**
 created by Lex. 2019/7/29
 **/

import {BasePostRequest, BaseGetRequest} from './baseRequest';
import {URLS} from './RequestConfig';

//获取Top250的数据
const getTop250 = async (start, count) => {
  return new Promise((resolve, reject) => {
    BaseGetRequest(URLS.MOVIE.Top250, {start, count}).then(
      res => {
        resolve(res);
      }, err => {
        reject(err);
      })
  })
}

//新片榜
const getNewMovies = async (city) => {
  return new Promise((resolve, reject) => {
    BaseGetRequest(URLS.MOVIE.New_Movie, {city: city}).then(
      res => {
        resolve(res);
      }, err => {
        reject(err);
      }
    )
  })
}

export {
  getTop250,
  getNewMovies,

}
