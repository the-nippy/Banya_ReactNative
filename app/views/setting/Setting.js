/**
 created by Lex. 2019/7/29
 **/
import React, {PureComponent} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

//组件
import Toolbar from "../../component/header/Toolbar";
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {HEIGHT, WIDTH} from "../../utils/contants";

//数据
import {changeThemeColor} from "../../redux/public";

const colors =
  ['#95543e', '#ffdc40', '#ffa243',
    '#41cf28', '#25c1cf', '#404cbe',
    '#7654b4', '#b87aa2', '#f17073',
    '#3c83b7', '#9e8ad1', '#78b682',
    '#c0cb63', '#b1388a', '#b36c22',
    '#6a300c', '#84432d'
  ]

//横行显示个数
const colCount = 3;
//左侧 margin
const singleMargin = 10;
const WIDTH_COLOR_ITEM = (WIDTH - singleMargin * (colCount + 1)) / 3;
const HEIGHT_COLOR_ITEM = 100;

//资源

class Setting extends PureComponent {

  constructor(props) {
    super(props);
  }

  renderColorView = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // console.info('item',item)
          this.props.changeThemeColor(item)
        }}
        style={{
          backgroundColor: item,
          width: WIDTH_COLOR_ITEM,
          height: HEIGHT_COLOR_ITEM,
          borderRadius: 10,
          marginLeft: singleMargin,
          marginTop: 10,
        }}/>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Toolbar title={'主题设定'}/>

        <Animatable.View animation={'bounceIn'} style={{flex: 1}}>

          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={colors}
            // horizontal={true}
            numColumns={colCount}
            // extraData={}
            renderItem={this.renderColorView}
          />
        </Animatable.View>

      </View>
    );
  }
}

export default connect(() => ({}), {
  changeThemeColor
})(Setting);
