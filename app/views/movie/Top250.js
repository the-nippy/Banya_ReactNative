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
  StyleSheet,
  FlatList,
} from 'react-native';
import Toolbar from '../../component/header/Toolbar';
import ImageButton from '../../component/button/ImageButton';

import {getTop250} from '../../utils/request/MovieR';

const ICON_LEFT = require('../../constant/image/movie/left.png');
const ICON_RIGHT = require('../../constant/image/movie/right.png');


export default class Top250 extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      //Top xx-xx
      start: 0,
      end: 25,
    }
  }

  async componentWillMount(): void {
    await this.freshData();
  }

  freshData = async () => {
    try {
      const start = this.state.start;
      const count = this.state.end - this.state.start;
      const data = await getTop250(start, count);
      this.setState({top250List: data})
      console.info('data', data)
    } catch (e) {
      console.warn('top250', e);
    }
  }

  renderTop250Item = () => {
    return (
      <View style={{marginHorizontal: 10, marginVertical: 8, backgroundColor: '#FFF'}}>
        <Image></Image>
        <View>
          <Text></Text>
        </View>
      </View>
    );
  }

  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#eee'}}>
        <Toolbar title={'Top250'}/>

        <View
          style={styles.barContainer}>
          <View style={styles.changeImages}>
            <ImageButton source={ICON_RIGHT} style={{transform: [{rotate: '180deg'}]}} isShow={false}/>
            <ImageButton source={ICON_RIGHT}/>
          </View>

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> {'当前显示 Top' + this.state.start + '--Top' + this.state.end}</Text>
          </View>
        </View>

        <FlatList
          keyExtractor={this._keyExtractor}
          data={[{}, {}]}
          renderItem={this.renderTop250Item}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  changeImages: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50
  },
  barContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10
  }
})
