/**
 created by Lex. 2019/8/12
 **/
import {getComingMovies, getNewMovies, getTop250} from "../utils/request/MovieR";
import {BanError} from "../utils/BanError";

//储存电影数据

//每次请求 25 条数据
const count = 25;
const INITIAL_STATE = {
  top250: [[], [], [], [], []],
  newMovies: {isAllowLocation: false, city: '', data: []},
  //即将上映，每二十条一页，做成请求分页长列表
  comingMovies: [],

};

//action type

//追加 top250 数据
const APPEND_TOP250 = 'APPEND_TOP250';
//插入 新片榜 数据
const INSERT_NEW_MOVIES = 'INSERT_NEW_MOVIES';

//操作即将上映数据   state没有数据时初始化，state有数据返回新数据时替换或追加，startIndex判断
const OPERATE_COMING_MOVIES = 'OPERATE_COMING_MOVIES';

export default function (state = INITIAL_STATE, action) {

  switch (action.type) {
    case APPEND_TOP250:
      const currentTop250Data = state.top250;
      const newTop250Data = dealAppendTop250(currentTop250Data, action);
      return {
        ...state,
        top250: newTop250Data
      };
    case INSERT_NEW_MOVIES:
      const currentNewMovieData = state.newMovies;
      const newMoviesData = dealInsertNewMovies(currentNewMovieData, action);
      return {
        ...state,
        newMovies: newMoviesData
      };
    case OPERATE_COMING_MOVIES:
      const currentComingMovies = state.comingMovies;
      const newComingMovies = dealComingMovies(currentComingMovies, action);
      return {
        ...state,
        comingMovies: newComingMovies
      }
    default:
      return state;
  }

}

//代理处理 Top250 追加数据
function dealAppendTop250(current250Data = [[], [], [], [], []], action) {
  const pageData = current250Data[action.page];
  //只有在已有数据是 0 和 25 条数据的时候才能追加
  if (pageData.length === 25 || pageData.length === 0) {
    current250Data[action.page] = pageData.concat(action.data);
  }
  return current250Data;
}

//Top 250 为五个数组，五页。每次请求25条数据
export function appendNewTop250Data(page, nodeIndex) {

  return async function (dispatch) {
    const start = page * 50 + nodeIndex * 25;
    try {
      let newData = await getTop250(start, count);
      dispatch({
        type: APPEND_TOP250,
        page: page,
        nodeIndex: nodeIndex,
        data: newData.subjects,
      })
    } catch (e) {
      console.warn('[appendNewTop250Data]', e)
    }
  }
}

//代理处理 new_movies 数据
function dealInsertNewMovies(currentNewMovies, action) {
  if (currentNewMovies.length) {

  }
}

//todo  新片榜不做redux
export function insertNewMovieData(city) {

  return async function (dispatch) {
    try {
      let data = await getNewMovies(city);
      dispatch({
        type: INSERT_NEW_MOVIES,
        data: data,
      })
    } catch (e) {
      throw new BanError(100);
    }
  }
}

//代理处理即将上映
function dealComingMovies(currentComingMovies = [], action) {
  if (currentComingMovies.length === action.start) {
    return currentComingMovies.concat(action.data);
  } else if (action.start === 0) {
    return action.data;
  } else {
    return currentComingMovies;
  }
}

export function operateComingMovies(startIndex) {
  //每次请求20条
  const count = 20;
  return async function (dispatch) {
    try {
      let comingMovies = await getComingMovies(startIndex, count);
      console.info('comingMovies', comingMovies)
      if (comingMovies.subjects) {
        dispatch({
          type: OPERATE_COMING_MOVIES,
          start: startIndex,
          data: comingMovies.subjects
        })
      }
    } catch (e) {
      throw new BanError(100)
    }
  }
}
