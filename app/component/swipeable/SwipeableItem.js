import React, {PureComponent} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,

} from 'react-native';
import PropTypes from 'prop-types';
import Swipeable from 'react-native-swipeable';

const Dimensions = require('Dimensions');
const screenWidth = Dimensions.get('window').width;

const ICON_CIRCLE_CHECK = require('../../constant/image/circle_check_32px.png');
const ICON_CIRCLE_DASH = require('../../constant/image/circle_drashed_32px.png');

const ITEM_HEIGHT = 60;

const leftContent = <Text>Pull to activate</Text>;


export default class SwipeableItem extends PureComponent {

  /**
   * isEditMode 是否是编辑模式
   *
   * isChecked 是否被选中   内部状态
   * source  头部图片资源
   * title 左边文本
   * note 右边文本
   * content 下面文本
   *
   *
   * */
  static propTypes = {
    // isChecked: PropTypes.bool.isRequired,
    isEditMode: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    }
  }

  componentWillMount(): void {
  }

  //条目点击事件
  //在编辑模式下就是被选中，非编辑模式下就是跳转
  onItemPress = () => {
    if (this.props.isEditMode) {
      const isCheck = this.state.isChecked;
      this.setState({isChecked: !isCheck})
    } else {
      // this.navigation
    }
  }

  //渲染头部图片
  renderHeaderImage() {
    if (this.state.isChecked) {
      return (<Image source={ICON_CIRCLE_CHECK}/>);
    } else {
      return (<Image source={ICON_CIRCLE_DASH}/>);
    }
  }

  render() {

    const rightButtons = [
      <TouchableOpacity
        style={styles.buttonStyle1}
      ><Text>{'已读'}</Text></TouchableOpacity>,
      <TouchableOpacity
        style={styles.buttonStyle2}
      ><Text style={{color:'#FFF'}}>{'删除'}</Text></TouchableOpacity>
    ];


    return (
      <Swipeable
        leftContent={leftContent}
        rightButtons={rightButtons}
        rightButtonWidth={75}
        rightActionActivationDistance={0}
      >
        <TouchableOpacity
          style={styles.swipeContainer}
          onPress={this.onItemPress}>
          {this.props.isEditMode ? this.renderHeaderImage() : null}
          <Image
            style={styles.headImage}
            source={this.props.source}/>
          <View style={{flex: 1, paddingRight: 10}}>
            <View style={styles.rightTexts}>
              <Text>{this.props.title}</Text>
              <Text>{this.props.note}</Text>
            </View>
            <Text>{this.props.content}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  }

}

const styles = StyleSheet.create({
  swipeContainer: {
    flex: 1,
    paddingLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    height: ITEM_HEIGHT,
    backgroundColor: '#FFF'
  },
  buttonStyle1: {
    flex:1,
    marginTop: 5,
    backgroundColor: '#ff7687',
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    paddingLeft: 25,
    // alignItems: 'center',
  },
  buttonStyle2: {
    flex:1,
    marginTop: 5,
    backgroundColor: '#b9ffb4',
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    paddingLeft: 25,
    // alignItems: 'center',
  },
  headImage: {
    marginRight: 5,
  },
  rightTexts: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center'
  }

})