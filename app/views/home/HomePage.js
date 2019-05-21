/**
 * HomePage页面
 *
 *
 * */

import React, {PureComponent} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,

} from 'react-native';

//多选框
import Toolbar from '../../component/header/Toolbar';
import SwipeableItem from '../../component/swipeable/SwipeableItem';
import Swipeable from 'react-native-swipeable';


const ListData = [
  {key: 'a'},
  {key: 'b'}
]


function Example1({onOpen, onClose}) {
  return (
    <Swipeable
      leftContent={(
        <View style={[styles.leftSwipeItem, {backgroundColor: 'lightskyblue'}]}>
          <Text>Pull action</Text>
        </View>
      )}
      rightButtons={[
        <TouchableOpacity style={[styles.rightSwipeItem, {backgroundColor: 'lightseagreen'}]}>
          <Text>1</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.rightSwipeItem, {backgroundColor: 'orchid'}]}>
          <Text>2</Text>
        </TouchableOpacity>
      ]}
      onRightButtonsOpenRelease={onOpen}
      onRightButtonsCloseRelease={onClose}
    >
      <View style={[styles.listItem, {backgroundColor: 'salmon'}]}>
        <Text>Example 1</Text>
      </View>
    </Swipeable>
  );
}


export default class HomePage extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      isChecked: false,
      currentlyOpenSwipeable: null
    }
  }

  componentDidMount(): void {

  }

  _keyExtractor = (item, index) => item.id;

  //渲染列表项
  _renderItem = (item, index) => {
    return (
      <SwipeableItem
        key={index}
        title={'系统消息'}
        note={'2019.5.4'}
        content={'AAA'}
        isEditMode={this.state.isEditMode}
      />
    );
  }

  render() {

    const {currentlyOpenSwipeable} = this.state;
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          //当前的滑动条回到初始状态
          currentlyOpenSwipeable.recenter();
        }

        this.setState({currentlyOpenSwipeable: swipeable});
      },
      onClose: () => this.setState({currentlyOpenSwipeable: null})
    };

    return (
      <View style={styles.container}>
        <Toolbar
          title='消息测试'
          leftButtons={{
            text:'天气',
            onPress:()=>{
              this.props.navigation.navigate('Weather')
            }
          }}
          rightButtons={{
            text: '编辑',
            onPress: () => {
              const mode = this.state.isEditMode;
              this.setState({isEditMode: !mode})
            }
          }}/>

        <Example1 {...itemProps}/>
        <FlatList
          data={ListData}
          extraData={this.state.isEditMode}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e4e4',

  },
  listItem: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 25
    // alignItems:'center'
  },

})
