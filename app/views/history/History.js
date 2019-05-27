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

//多选框
import Toolbar from '../../component/header/Toolbar';
import SwipeableItem from '../../component/swipeable/SwipeableItem';
import Swipeable from 'react-native-swipeable';
import {connect} from 'react-redux';

class History extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentWillMount(): void {
  }

  render() {
    const DATA = this.props.historyInfoList?.[2];
    console.info('pic', DATA.pic)
    return (
      <View>
        <Toolbar
          title={'历史上的今天'}
        />
        <View>
          <Image
            source={{uri: DATA.pic}}
            style={{width: 80, height: 80}}
          />
          <Text>{DATA.title}</Text>
          <Text>{DATA.des}</Text>
        </View>
      </View>
    );
  }
}

export default connect(state => ({
  historyInfoList: state.constant.historyInfoList
}), {})(History)