/**
 created by Lex. 2019/8/15
 **/

//传入评分，获取星数，并非等比规律
const transformRateToValue = (rate) => {
  let value = 0;
  if (rate >= 9.2) {
    value = 5;
  } else if (rate >= 8.3) {
    value = 4.5;
  } else if (rate >= 7.5) {
    value = 4;
  } else if (rate >= 6.6) {
    value = 3.5;
  } else if (rate >= 6) {
    value = 3;
  } else if (rate >= 5) {
    value = 2.5;
  } else if (rate >= 4) {
    value = 2;
  } else if (rate >= 3) {
    value = 1.5;
  } else if (rate >= 2) {
    value = 1;
  } else {
    value = 0.5
  }
  return value;
}

//获取更深的颜色，每个数转16进制，色值-2
const getDeeperColor = (colorOfRgb) => {
  if (!colorOfRgb.startsWith('#')) {
    console.warn('传入颜色值格式错误')
    return colorOfRgb;
  }
  let newColorArray = [];
  // colorOfRgb.toString(16);
  for (let i = 0; i < colorOfRgb.length; i++) {
    if (i === 0) {
      continue;
    }
    let originalValue = parseInt(colorOfRgb[i], 16);
    originalValue -= 2;
    if (originalValue < 0) {
      originalValue = 0;
    }
    newColorArray[i] = originalValue.toString(16);
  }
  return '#' + newColorArray.join('');
}


export {
  transformRateToValue,
  getDeeperColor,
}
