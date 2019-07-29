/**
 created by Lex. 2019/7/29
 **/
import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Toolbar from '../../component/header/Toolbar';

import {getTop250} from '../../utils/request/MovieR';

export default class Top250 extends PureComponent {

  constructor(props) {
    super(props);
  }

  async componentWillMount(): void {
    await this.freshData();
  }

  freshData = async () => {
    try {
      const data = await getTop250(10, 20);
      this.setState({top250List: data})
      console.info('data', data)
    } catch (e) {
      console.warn('top250', e);
    }
  }

  render() {
    return (
      <View>
        <Toolbar title={'Top250'}/>
      </View>
    );
  }
}
