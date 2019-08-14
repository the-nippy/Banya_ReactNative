/**
 created by Lex. 2019/8/14

 公共的状态
 **/

const CHANGE_LOCATION = 'CHANGE_LOCATION';

const INITIAL_STATE = {
  //是否允许获取定位
  isAllowLocation: false,
};

export default function (state = INITIAL_STATE, action) {

  switch (action.type) {

    case CHANGE_LOCATION:
      return {
        ...state,
        isAllowLocation: action.isAllowLocation
      }
    case '2':
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
