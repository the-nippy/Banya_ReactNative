/**
 created by Lex. 2019/7/29
 **/

const BaseGetRequest = (url, params, needHeader) => {

  if (params) {
    const keys = Object.keys(params);
    url += '?';
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (i !== keys.length - 1) {
        url = url + key + '=' + params[key] + '&';
      } else {
        url = url + key + '=' + params[key]
      }
    }
  }

  let options = {}
  //Todo  添加头部
  if (needHeader) {
    options = {}
  }

  return new Promise((resolve, reject) => {
    fetch(url, options).then(res => {
      res.json().then(result => {
        resolve(result);
      }, err => {
        console.info('[BaseRequest]json', res);
        reject(err);
      })
    }, err => {
      console.info('[BaseRequest]url', url);
      reject(err);
    })
  })
}


const BasePostRequest = (url, params) => {
  let options = {
    method: 'POST',
    //Todo  Header
    header: {},
  }
  if (params) {
    options.body = JSON.stringify(params);
  }

  return new Promise((resolve, reject) => {
    fetch(url, options).then(res => {
      res.json().then(
        result => {
          resolve(result);
        }, err => {
          console.info('[BasePostRequest]json', res);
          reject(err);
        }
      )
    }, err => {
      console.info('[BasePostRequest]url', url);
      reject(err);
    })
  })
}

export {
  BaseGetRequest,
  BasePostRequest,
}
