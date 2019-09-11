/**
 created by Lex. 2019/8/14
 **/

import {ShowToast} from "./toast";

/**
 * 100  请求错误
 *
 * **/

export class BanError extends Error {

  constructor(errorCode) {
    super();
    this.errorCode = errorCode;
  }

}


export function DealError(error) {

  switch (error.errorCode) {
    //网络错误
    case 100:
      ShowToast('网络连接错误，请联网重试');
      break;
    case 2:
      break;
    default:
      ShowToast('Error' + e.toString());
      break;

  }

}
