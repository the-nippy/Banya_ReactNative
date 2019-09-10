/**
 created by Lex. 2019/7/29
 **/
import React, {PureComponent, Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';

//组件
import Toolbar from '../../component/header/Toolbar';
import LinearView from '../../component/linear/LinearView';
import Swiper from 'react-native-swiper';
import {connect} from 'react-redux';

//数据
import {COLOR, WIDTH} from "../../utils/contants";
import {getNewMovies, getUSBoxMovies} from "../../utils/request/MovieR";
import MovieItem250 from "../../component/movieItem/MovieItem250";
import {getWeeklyMovies} from "../../utils/request/MovieR";
import {operateComingMovies} from "../../redux/movies";
import MovieSimpleItem from "../../component/movieItem/MovieSimpleItem";


//资源
const FUNCTIONS = ['Top250', '正在上映', '即将上映', '新片榜'];
const ICON_250 = require('../../constant/image/movie/top250.png');
const ICON_WILL = require('../../constant/image/movie/will.png');
const ICON_PLAYING = require('../../constant/image/movie/playing.png');
const ICON_NEW_MOVIE = require('../../constant/image/movie/new_movie.png');
const ICON_MENU = require('../../constant/image/movie/menu.png');
const Icons = [ICON_250, ICON_WILL, ICON_PLAYING, ICON_NEW_MOVIE];

//资源
const ITEM_HEIGHT = 166;
const ITEM_IMAGE_HEIGHT = 150;
const ITEM_IMAGE_WIDTH = 106;

const ITEM_WEEK_WIDTH = (WIDTH - 40) / 3;
const ITEM_WEEK_HEIGHT = ITEM_WEEK_WIDTH + 70;

class Movie extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      weeklyMovies: [],
      usBoxMovies: [],
    }
  }

  async componentDidMount(): void {
    await this.freshData();
    await this.RefreshWeeklyMovies();
  }

  // shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
  //   // console.info('this.props.themeColor', this.props.themeColor)
  //   // console.info('nextProps', nextProps)
  //   // if (this.props.themeColor === nextProps.themeColor) {
  //   //   return false;
  //   // }
  //   return true;
  // }


  freshData = async () => {
    try {
      //
      // console.info('[ freshData]')
      await this.props.operateComingMovies(0);
      this.forceUpdate();
    } catch (e) {
      console.warn('catch error freshData', e);
    }
  }

  RefreshWeeklyMovies = async () => {
    let weeklyMovies = await getWeeklyMovies();
    let usBoxMovies = await getUSBoxMovies();
    console.info('usBoxMovies', usBoxMovies)
    this.setState({weeklyMovies: weeklyMovies.subjects, usBoxMovies: usBoxMovies.subjects})
  }


  //Top250等function被点击
  onFunctionsPress = (index) => {
    switch (index) {
      case 0:
        this.props.navigation.navigate('Top250')
        break;
      case 1:
        this.props.navigation.navigate('InTheater');
        break;
      case 2:
        this.props.navigation.navigate('ComingMovies');
        break;
      case 3:
        this.props.navigation.navigate('NewMovie');
        break;
      default:
        break;
    }
  }

  layoutItem = (data, index) => {
    // console.info('[layoutItem]index', index)
    return {
      length: ITEM_WEEK_HEIGHT + 8,
      offset: (ITEM_WEEK_HEIGHT + 8) * Math.ceil(((index + 1) / 3)),
      index,
    }
  }

  renderSwiperItem = () => {
    //Swiper 不允许空的child
    //Swiper组件本身需要宽高
    if (this.props.comingMovies?.length > 0) {
      let movies = this.props.comingMovies;
      //让首页只显示六条轮播
      if (movies.length >= 6) {
        movies = movies.slice(0, 6)
      }
      return movies.map((item, index) => (
        <MovieSimpleItem
          key={index}
          item={item}
          isShowGrade={false}
          navigation={this.props.navigation}
        />))
    } else {
      return (
        <View style={{width: WIDTH, height: ITEM_HEIGHT}}>
          <Text>no data</Text>
        </View>
      )
    }
  }

  renderListMovie = ({item, index}) => {
    let Item = item.subject;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('MovieDetail', {item: Item});
        }}
        style={[styles.listItemContainer, {backgroundColor: this.props.themeColor}]}>
        <Image source={{uri: Item?.images?.small}} style={styles.listItemImage}/>
        <View
          style={{width: ITEM_WEEK_WIDTH - 6, justifyContent: 'center', alignItems: 'center', marginHorizontal: 3,}}>
          <Text numberOfLines={1} style={{fontSize: 15, color: '#fcfffa'}}>{Item.title}</Text>
        </View>
        <View
          // numberOfLines={1}
          style={styles.listItemBottomTexts}>
          <Text>{Item.genres.slice(0, 2).map((item, index) => (
            <Text key={index} style={{fontSize: 13}}>{(index > 0 ? '-' : '') + item}</Text>))}
          </Text>
          <Text style={{marginLeft: 10, color: '#2c2c2c', fontSize: 13}}>{Item.rating?.average + '分'}</Text>
        </View>
      </TouchableOpacity>
    )
      ;
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#ddd'}}>
        <Toolbar
          title={'电影'}
          hideLeftButtons={true}
          leftButtons={[
            {
              icon: ICON_MENU,
              onPress: () => {
                this.props.navigation.openDrawer();
              },
            }
          ]}
        />
        <ScrollView style={{flex: 1}}>

          <Swiper
            autoplay={true}
            autoplayTimeout={5}
            dotColor={'#eee'}
            activeDotColor={COLOR.defaultColor}
            paginationStyle={{justifyContent: 'flex-end', marginBottom: 120, marginRight: 15}}
            style={{width: WIDTH, height: ITEM_HEIGHT + 5}}>
            {this.renderSwiperItem()}
          </Swiper>

          <View
            style={styles.functionContainer}
          >
            {FUNCTIONS.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.single_function}
                  onPress={() => {
                    this.onFunctionsPress(index)
                  }}>
                  <LinearView
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={['#4b7bab', '#263656', '#4b7bab']}
                    style={{paddingHorizontal: 5, paddingVertical: 5, borderRadius: 7}}>
                    <Image source={Icons[index]} style={styles.function_image}/>
                  </LinearView>
                  <Text style={{fontSize: 12, color: '#FFF', marginTop: 5}}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <LinearView
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#8eaa9d', '#fdfff2', '#f2eec7']}
            style={{marginTop: 10, height: 40, flexDirection: 'row', alignItems: 'center'}}
          >
            <Text>口碑榜</Text>
          </LinearView>

          <FlatList
            extraData={[this.state, this.props.themeColor]}
            renderItem={this.renderListMovie}
            data={this.state.weeklyMovies}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            getItemLayout={this.layoutItem}
          />


          <LinearView
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#8eaa9d', '#fdfff2', '#f2eec7']}
            style={{marginTop: 10, height: 40, flexDirection: 'row', alignItems: 'center'}}
          >
            <Text>豆瓣电影北美票房榜</Text>
          </LinearView>

          <FlatList
            extraData={[this.state, this.props.themeColor]}
            renderItem={this.renderListMovie}
            data={this.state.usBoxMovies}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            getItemLayout={this.layoutItem}
          />


        </ScrollView>
      </View>
    );
  }
}

export default connect((state) => ({
  comingMovies: state.movies.comingMovies,
  themeColor: state.publicInfo.themeColor,
}), {
  operateComingMovies,
})(Movie);

const styles = StyleSheet.create({
  functionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // height: 60,
    borderRadius: 8,
    backgroundColor: '#ded',
    paddingHorizontal: 6,
    paddingVertical: 8,
    marginTop: 10
  },
  single_function: {

    // width: (WIDTH - 48) / 4,
    // marginHorizontal: 6,
    // marginVertical:10,
    // height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 16,
    // paddingHorizontal: 8,
  },
  function_image: {
    width: 30, height: 30, paddingHorizontal: 5,
    paddingVertical: 5
  },
  listItemContainer: {
    width: ITEM_WEEK_WIDTH,
    height: ITEM_WEEK_HEIGHT,
    marginLeft: 10,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 5
  },
  listItemImage: {
    width: ITEM_WEEK_WIDTH,
    height: ITEM_WEEK_WIDTH + 30,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  listItemBottomTexts: {
    width: ITEM_WEEK_WIDTH - 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
