/**
 created by Lex. 2019/8/15
 **/

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


export {
  transformRateToValue
}
