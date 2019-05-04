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

import Toolbar from '../component/header/Toolbar';
import SwipeableItem from '../component/swipeable/SwipeableItem';

const ListData = [
  {key: 'a'},
  {key: 'b'}
]


export default class extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
    }
  }

  componentDidMount(): void {

  }

  _keyExtractor = (item, index) => item.id;

  //渲染列表项
  _renderItem = (item) => {
    return (
      <SwipeableItem
        title={'系统消息'}
        note={'2019.5.4'}
        content={'AAA'}
        isEditMode={this.state.isEditMode}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          title='消息测试'
          hideLeftButtons={true}
          rightButtons={{
            text: '编辑',
            onPress: () => {
              const mode = this.state.isEditMode;
              this.setState({isEditMode: !mode})
            }
          }}/>
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

  }
})
