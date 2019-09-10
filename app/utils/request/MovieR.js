/**
 created by Lex. 2019/7/29
 **/

import {BasePostRequest, BaseGetRequest} from './baseRequest';
import {URLS} from './RequestConfig';
import {BanError} from "../BanError";

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
const getNewMovies = async () => {
  return new Promise((resolve, reject) => {
    BaseGetRequest(URLS.MOVIE.New_Movie,).then(
      res => {
        resolve(res);
      }, err => {
        reject(err);
      })
  })
}

//正在上映
const getInTheaterMovies = async (city) => {
  return new Promise((resolve, reject) => {
    BaseGetRequest(URLS.MOVIE.In_Theater, {city: city}).then(
      res => {
        resolve(res);
      }, err => {
        reject(err);
      })
  })
}

//即将上映
const getComingMovies = (start, count) => {
  return new Promise((resolve, reject) => {
    BaseGetRequest(URLS.MOVIE.Coming_Soon).then(
      res => {
        resolve(res);
      }, err => {
        reject(err);
      }
    )
  })
}

//口碑榜

const getWeeklyMovies = () => {
  return new Promise((resolve, reject) => {
    BaseGetRequest(URLS.MOVIE.Weekly).then(
      res => {
        resolve(res);
      }, err => {
        reject(err);
      }
    )
  })
}

//北美票房榜
const getUSBoxMovies = () => {
  return new Promise(((resolve, reject) => {
    BaseGetRequest(URLS.MOVIE.US_Box).then(
      res => {
        resolve(res);
      }, err => {
        reject(err);
      }
    )
  }))
}

//获取指定id电影详情
const getMovieDetailData = (movie_id) => {
  if (!movie_id) {
    console.warn('Movie_id为空')
    return;
  }
  return new Promise((resolve, reject) => {
    fetch(URLS.MOVIE.Detail + movie_id).then(
      res => {
        res.json().then(
          result => {
            resolve(result);
          }, err => {
            reject(err);
          }
        )
      }, err => {
        reject(new BanError(100));
      }
    )
  })
}


export {
  getTop250,
  getNewMovies,
  getComingMovies,
  getInTheaterMovies,
  getWeeklyMovies,
  getUSBoxMovies,
  getMovieDetailData,
}
