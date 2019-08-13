/**
 created by Lex. 2019/8/12
 **/
import {getTop250} from "../utils/request/MovieR";

//储存电影数据

//每次请求 25 条数据
const count = 25;
const INITIAL_STATE = {
  top250: [[], [], [], [], []],
};

//action type
const APPEND_TOP250 = 'APPEND_TOP250';

export default function (state = INITIAL_STATE, action) {

  switch (action.type) {
    case APPEND_TOP250:
      const currentTop250Data = state.top250;
      const newTop250Data = dealAppendTop250(currentTop250Data, action);
      return {
        ...state,
        top250: newTop250Data
      };
    case '':
      return;
    default:
      return state;
  }

}

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
