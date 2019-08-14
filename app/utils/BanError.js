/**
 created by Lex. 2019/8/14
 **/

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
    case '':
      break;
    case 2:
      break;
    default:
      break;

  }

}
