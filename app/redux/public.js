/**
 created by Lex. 2019/8/14

 公共的状态
 **/
import {fromJS} from 'immutable';


const CHANGE_LOCATION = 'CHANGE_LOCATION';
const CHANGE_THEME_COLOR = 'CHANGE_THEME_COLOR';

const INITIAL_STATE = {
  //是否允许获取定位
  isAllowLocation: false,
  themeColor: '#95543e',
};

export default function (state = INITIAL_STATE, action) {

  switch (action.type) {

    case CHANGE_LOCATION:
      return {
        ...state,
        isAllowLocation: action.isAllowLocation
      }
    case CHANGE_THEME_COLOR:
      return {
        ...state,
        themeColor: action.themeColor
      }
      return state;
    default:
      return state;
  }

}

export function changeLocationState(isAllowed) {
  return ({
    type: CHANGE_LOCATION,
    isAllowLocation: isAllowed
  })
}

export function changeThemeColor(color) {
  return ({
    type: CHANGE_THEME_COLOR,
    themeColor: color
  })
}
