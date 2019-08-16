/**
 created by Lex. 2019/7/29
 **/
import React, {PureComponent} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

//组件
import Toolbar from '../../component/header/Toolbar';
import LinearView from '../../component/linear/LinearView';
import Swiper from 'react-native-swiper';
import {connect} from 'react-redux';

//数据
import {COLOR, WIDTH} from "../../utils/contants";
import {getNewMovies} from "../../utils/request/MovieR";
import MovieItem250 from "../../component/movieItem/MovieItem250";
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

class Movie extends PureComponent {

  static navigationOptions = {
    drawerLabel: '电影',
    drawerLockMode: 'unlocked'
  }

  constructor(props) {
    super(props);
  }

  async componentDidMount(): void {
    await this.freshData();
  }

  freshData = async () => {
    try {
      await this.props.operateComingMovies(0);
      this.forceUpdate();
    } catch (e) {
      console.warn('catch error freshData', e);
    }
  }


  //Top250等function被点击
  onFunctionsPress = (index) => {
    switch (index) {
      case 0:
        this.props.navigation.navigate('Top250')
        break;
      case 1:
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
        <MovieSimpleItem key={index} item={item} isShowGrade={false}/>))
    } else {
      return (
        <View style={{width: WIDTH, height: ITEM_HEIGHT}}>
          <Text>no data</Text>
        </View>
      )
    }
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
            paginationStyle={{justifyContent: 'flex-end', marginBottom: 115, marginRight: 15}}
            style={{width: WIDTH, height: ITEM_HEIGHT+5}}>
            {this.renderSwiperItem()}
          </Swiper>

          <View
            style={styles.functionContainer}
          >
            {FUNCTIONS.map((item, index) => {
              return (
                <View
                  key={index}
                  style={styles.single_function}>
                  <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => {
                      this.onFunctionsPress(index)
                    }}>
                    <View
                      style={{backgroundColor: '#4b7bab', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 7}}>
                      <Image source={Icons[index]} style={styles.function_image}/>
                    </View>
                    <Text style={{fontSize: 12, color: '#FFF', marginLeft: 5}}>{item}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <LinearView
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['#8eaa9d', '#fdfff2', '#f2eec7']}
            style={{marginTop:10,height:40,flexDirection:'row',alignItems:'center'}}
          >
            <Text>口碑榜</Text>
          </LinearView>


        </ScrollView>
      </View>
    );
  }
}

export default connect((state) => ({
  comingMovies: state.movies.comingMovies,
}), {
  operateComingMovies,
})(Movie);

const styles = StyleSheet.create({
  functionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 60,
    borderRadius: 8,
    backgroundColor: '#eee',
    paddingHorizontal: 6,
    paddingVertical:8,
    marginTop: 10
  },
  single_function: {

    width: (WIDTH - 48) / 4,
    marginHorizontal: 6,
    // height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 8,
  },
  function_image: {
    width: 30, height: 30, paddingHorizontal: 5,
    paddingVertical: 5
  }
})
