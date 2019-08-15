/**
 created by Lex. 2019/8/14

 新片榜，请求新片榜需要位置参数（城市名），默认北京

 需要请求位置
 **/

import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  FlatList, StyleSheet,
} from 'react-native';

//组件
import Toolbar from "../../component/header/Toolbar";
import {connect} from 'react-redux';

//数据
import publicData, {changeLocationState} from "../../redux/public";
import {getCityFromLocation} from "../../utils/location";
import {getNewMovies} from "../../utils/request/MovieR";
import {Rating} from "react-native-ratings";
import {transformRateToValue} from "./util";
import LinearView from "../../component/linear/LinearView";

const ITEM_HEIGHT = 150;
const ITEM_WIDTH = 106;

class NewMovie extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      newMoviesList: []
    }
  }

  async componentDidMount(): void {

    let movies = await getNewMovies();
    console.info('new_movies', movies);
    this.setState({newMoviesList: movies.subjects})

    //新片榜不需要定位
    // try {
    //   let location = await getCityFromLocation();
    //   console.info('location', location)
    // } catch (e) {
    //   console.warn('e!!', e)
    // }
  }


  renderTop250Item = ({item, index}) => {


    const showOrgTitle = item.title == item.original_title;
    const rateValue = item?.rating?.average;

    const peoples = item.directors?.concat(item?.casts);

    return (
      <View style={styles.movie_item}>
        <Image source={{uri: item.images?.small}} style={{width: ITEM_WIDTH, height: ITEM_HEIGHT}}
               resizeMode='contain'/>

        <View style={styles.movie_item_right}>
          <View>
            <Text style={styles.movie_title}>{item.title}</Text>
            {showOrgTitle ? null : <Text
              numberOfLines={1}
              style={styles.movie_org_title}>{'(' + item.original_title + ')'}</Text>
            }
          </View>

          <View
            style={{
              // paddingLeft: 5,
              flexDirection: 'row', alignItems: 'center'
            }}>
            {/*<Rating*/}
            {/*  readonly={true}*/}
            {/*  type='star'*/}
            {/*  ratingCount={5}*/}
            {/*  startingValue={transformRateToValue(rateValue)}*/}
            {/*  imageSize={13}*/}
            {/*  style={{width: 60}}*/}
            {/*/>*/}
            <View style={{flexDirection: 'row'}}>
              <Text style={{flexDirection: 'row'}}>
                <Text>{'评分：'}</Text>
                <Text style={{fontSize: 13, color: '#000', fontWeight: 'bold'}}>{item?.rating?.average}</Text>
              </Text>
              <Text style={{marginLeft: 10}} numberOfLines={1}>{
                item.genres?.map((Item, index,array) => (
                  <Text key={index} style={{
                    paddingHorizontal: 2,
                    color: '#614d62'
                  }}>{Item + (index === array.length - 1 ? '' : ' - ')}</Text>
                ))}
              </Text>
            </View>
          </View>

          <View>
            <Text style={{}}>{'首映：' + item.pubdates ?.[0]}</Text>
          </View>

          <Text numberOfLines={2} style={{flexDirection: 'row', alignItems: 'center', color: '#305058'}}>
            {peoples?.map((item, index) => (
              <Text key={index}
                    onPress={() => {
                      console.info('Name', item.name)
                    }}
                    style={{marginHorizontal: 3, fontSize: 13}}>{item.name + '  '}</Text>
            ))}
          </Text>
        </View>

      </View>
    );
  }

  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <LinearView
        colors={['#cce0eb', '#FEE', '#dfdbab']}
        style={{flex: 1}}>
        <Toolbar title={'新片榜'}/>

        <FlatList
          style={{flex: 1}}
          keyExtractor={this._keyExtractor}
          data={this.state.newMoviesList}
          extraData={this.state}
          renderItem={this.renderTop250Item}
        />

      </LinearView>
    );
  }
}


export default connect(state => ({
  isAllowLocation: state.publicData.isAllowLocation
}), {
  changeLocationState,
})(NewMovie);


const styles = StyleSheet.create({

  barContainer: {
    marginHorizontal: 20,
    marginVertical: 6,
    height: 40,
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
  },
  textNumber: {
    backgroundColor: '#dea554',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8
  },

  movie_item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8
  },

  movie_item_right: {
    flex: 1,
    height: ITEM_HEIGHT,
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingHorizontal: 10
  }
})
