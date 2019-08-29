/**
 created by Lex. 2019/8/29
 **/


import React, {PureComponent} from 'react';
import {
  View,
  Image,
} from 'react-native';

//组件
import PropTypes from 'prop-types';

//数据

//标记哪种星型
const FILL = 'FILL';
const HALF = 'HALF';
const EMPTY = 'EMPTY';

//资源
const ICON_FILL = require('./images/star_fill.png');
const ICON_HALF = require('./images/half_star.png');
const ICON_EMPTY = require('./images/star_empty.png');
const ICON_GREY = require('./images/star-grey.png');

export default class StarRating extends PureComponent {

  static propTypes = {
    numberOfAllStars: PropTypes.number.isRequired,
    numberOfFill: PropTypes.number,
    //图片尺寸，宽高一致
    starImageSize: PropTypes.number.isRequired,
    //容器的style
    containerStyle: PropTypes.object,
    useGreyStar: PropTypes.bool,
  }

  constructor(props) {
    super(props);
  }

  getStarViewArray = (length, type) => {
    const {starImageSize, useGreyStar} = this.props;
    const target = [];
    let icon;
    switch (type) {
      case FILL:
        icon = ICON_FILL;
        break;
      case HALF:
        icon = ICON_HALF;
        break;
      case EMPTY:
        icon = ICON_EMPTY;
        break;
      default:
        icon = ICON_FILL;
        break;
    }
    if (useGreyStar) {
      icon = ICON_GREY;
    }
    for (let i = 0; i < length; i++) {
      target.push(
        <Image key={i} source={icon} style={{width: starImageSize, height: starImageSize}}/>);
    }
    return target;
  }

  render() {

    const {numberOfAllStars, numberOfFill, starImageSize, containerStyle} = this.props;

    let finalNumberOfFill = numberOfFill ? numberOfFill : 0;
    //也可以通过实例化数组的方式map出view数组
    const fillStarView = this.getStarViewArray(Math.floor(finalNumberOfFill), FILL);
    const emptyStarView = this.getStarViewArray(numberOfAllStars - Math.ceil(finalNumberOfFill), EMPTY);
    //是否存在半星
    let isHalfStarExist = false;
    if ((fillStarView.length + emptyStarView.length + 1) === numberOfAllStars) {
      isHalfStarExist = true;
    }

    return (
      <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}, containerStyle]}>
        {fillStarView}
        {isHalfStarExist ?
          //静态图片尺寸不一的原因 half-star -2
          <Image source={ICON_HALF} style={{width: starImageSize - 2, height: starImageSize - 2}}/> : null}
        {emptyStarView}
      </View>
    );
  }

}
