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
import CheckBox from 'react-native-check-box';
import Toolbar from '../../component/header/Toolbar';
import SwipeableItem from '../../component/swipeable/SwipeableItem';

const ListData = [
  {key: 'a'},
  {key: 'b'}
]


export default class HomePage extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      isChecked: false,
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
        <View style={{paddingVertical: 10}}>
          <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={() => {
              this.setState({
                isChecked: !this.state.isChecked
              })
            }}
            isChecked={this.state.isChecked}
            leftText={"CheckBox"}
          />
          <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={() => {
              this.setState({
                isChecked: !this.state.isChecked
              })
            }}
            isChecked={this.state.isChecked}
            leftText={"CheckBox"}
          />
        </View>
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
