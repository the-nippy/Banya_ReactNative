/**
 created by Lex. 2019/7/29

 Top 250 数据实时请求，并不放在Redux做状态管理以及缓存

 使用 react-native-ratings 而不是 react-native-star-rating , 因为 react-native-star-rating 依赖 react-native-vector-icons
 尽量选择轻型第三方库

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
import {Rating, AirbnbRating} from 'react-native-ratings';
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
      top250List: [{}],
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
      this.setState({top250List: data.subjects})
      console.info('data', data)
    } catch (e) {
      console.warn('top250', e);
    }
  }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }

  renderTop250Item = ({item, index}) => {

    const ITEM_HEIGHT = 160;
    const ITEM_WIDTH = 110;

    const showOrgTitle = item.title == item.original_title;

    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 8
      }}>
        <Image source={{uri: item.images?.small}} style={{width: ITEM_WIDTH, height: ITEM_HEIGHT}}
               resizeMode='contain'/>
        <View style={{height: ITEM_HEIGHT, justifyContent: 'space-between', paddingTop: 20, paddingHorizontal: 10}}>

          <View>
            <Text style={styles.movie_title}>{item.title}</Text>
            {showOrgTitle ? null : <Text
              style={styles.movie_org_title}>{'(' + item.original_title + ')'}</Text>
            }
          </View>

          <View style={{paddingLeft: 5}}>
            <Rating
              readonly={true}
              type='star'
              // ratingImage={WATER_IMAGE}
              // ratingColor='yellow'
              // ratingBackgroundColor='#c8c7c8'
              ratingCount={5}
              fractions={16}
              imageSize={15}
              style={{width: 60}}
              // style={{ paddingVertical: 10 }}
            />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{item.year}</Text>
            {item.genres?.map((item, index) => (
              <View key={index}>
                <Text>{item}</Text>
              </View>)
            )}
          </View>

          <View>{item.pubdates?.map((item, index) => (<Text key={index}>{item}</Text>))}</View>


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
            <ImageButton
              source={ICON_RIGHT} style={{transform: [{rotate: '180deg'}]}}
              isShow={false}
              onPress={() => {
              }}
            />
            <ImageButton
              source={ICON_RIGHT}
              onPress={() => {
              }}
            />
          </View>

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> {'当前显示 Top' + this.state.start + '--Top' + this.state.end}</Text>
          </View>
        </View>

        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.top250List}
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
  },
  movie_title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  movie_org_title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#666'
  }
})
