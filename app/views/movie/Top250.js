/**
 created by Lex. 2019/7/29

 Top 250 数据实时请求，放在Redux做状态管理以及缓存

 使用 react-native-ratings 而不是 react-native-star-rating ,
 react-native-star-rating 依赖 react-native-vector-icons
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
  ActivityIndicator,
} from 'react-native';

//组件
import {Rating, AirbnbRating} from 'react-native-ratings';
import Toolbar from '../../component/header/Toolbar';
import ImageButton from '../../component/button/ImageButton';
import {connect} from 'react-redux';
import LinearView from '../../component/linear/LinearView';
import MovieItem250, {ITEM_250_HEIGHT} from '../../component/movieItem/MovieItem250';

//数据
import {appendNewTop250Data} from '../../redux/movies';

//资源
import {COLOR, WIDTH} from "../../utils/contants";
import {LoadingView, STATES} from "../loading/LoadingView";
import {DealError} from "../../utils/BanError";

const ICON_LEFT = require('../../constant/image/movie/left.png');
const ICON_RIGHT = require('../../constant/image/movie/right.png');
const ICON_RIGHT_ARROW = require('../../constant/image/right_nullArrow.png');

const ITEM_HEIGHT = 150;
const ITEM_WIDTH = 106;


class Top250 extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      //Top xx-xx
      start: 0,
      end: 25,
      page: 0,
      //每页50条数据，分两节  0  1
      nodeIndex: 0,
      // start: this.page,
      top250List: [],
      isBottomLoadingShow: false,

      loadState: STATES.LOADING,
    }
  }

  async componentWillMount(): void {
    console.info('this.state.page', this.state.page)
    const currentPageData = this.props.top250List?.[this.state.page] || [];
    if (currentPageData.length === 0) {
      await this.freshData();
    } else {
      this.setState({loadState: ''})
    }
  }

  //是追加数据时，拼接到原有数据
  freshData = async () => {
    //Todo  设置loading和处理error
    try {
      await this.props.appendNewTop250Data(this.state.page, this.state.nodeIndex);
      this.setState({loadState: '', isBottomLoadingShow: false})
      console.info('top250 over')
    } catch (e) {
      console.warn('freshData', e)
      DealError(e);
      this.setState({loadState: STATES.FAIL, isBottomLoadingShow: false});
    }
    // this.setState({isBottomLoadingShow: false})
    // this.forceUpdate();
  }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }


  //获取当前电影的Top start
  getTopIndex = () => {
    const baseStart = this.state.page * 50 + 1;
    return baseStart;
  }

  //点击进入下一页
  onToNextPagePress = () => {
    const currentPage = this.state.page;
    if (currentPage <= 3) {
      this.setState({page: (currentPage + 1), nodeIndex: 0, loadState: STATES.LOADING}, this.freshData)
    }
  }

  reachListBottom = async () => {
    const currentPageData = this.props.top250List?.[this.state.page] || [];
    console.info('To250到底,当前长度', currentPageData.length)
    if (currentPageData.length === 25) {
      this.setState({nodeIndex: 1, isBottomLoadingShow: true}, this.freshData)
    } else if (currentPageData.length === 50) {

    }
  }


  renderTop250Item = ({item, index}) => {
    if (item) {
      return (
        <MovieItem250
          isShowNo={true}
          No={(this.getTopIndex() + index)}
          item={item}
        />
      );
    } else {
      return null;
    }

  }

  _keyExtractor = (item, index) => index.toString();

  layoutItem = (data, index) => {
    // console.info('[layoutItem]index', index)
    return {
      length: ITEM_250_HEIGHT,
      offset: (ITEM_250_HEIGHT) * index,
      index,
    }
  }

  render() {

    //取出当前页的数据
    const currentPageData = this.props.top250List?.[this.state.page] || [];

    //是否显示加载下一页的底部框
    let showBottomToNext = false;
    if (currentPageData.length === 50) {
      showBottomToNext = true;
    }

    return (
      <LinearView
        colors={['#cce0eb', '#FEE', '#dfdbab']}
        style={{flex: 1}}>
        <Toolbar title={'Top250'}/>

        <View
          style={styles.barContainer}>
          <View style={styles.changeImages}>
            <ImageButton
              source={ICON_RIGHT} style={{transform: [{rotate: '180deg'}]}}
              isShow={this.state.page !== 0}
              onPress={() => {
                this.setState({page: (this.state.page - 1)}, () => this.forceUpdate())
              }}
            />
            <ImageButton
              source={ICON_RIGHT}
              isShow={this.state.page !== 4}
              onPress={this.onToNextPagePress}
            />
          </View>

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> {'当前显示 Top' + (this.state.page * 50 + 1) + '--Top' + (this.state.page + 1) * 50}</Text>
          </View>
        </View>

        {(this.state.loadState === STATES.LOADING || this.state.loadState === STATES.FAIL)
          ? <LoadingView loadingState={this.state.loadState} reloadData={this.freshData}/>
          : <FlatList
            keyExtractor={this._keyExtractor}
            data={currentPageData}
            extraData={this.props.top250List}
            renderItem={this.renderTop250Item}
            onEndReachedThreshold={0.3}
            onEndReached={this.reachListBottom}
            getItemLayout={this.layoutItem}
            ListFooterComponent={() => {
              if (this.state.isBottomLoadingShow) {
                return (
                  <View style={{height: 60, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size={'large'}/>
                  </View>
                );
              } else {
                if (!showBottomToNext) {
                  return null;
                }
                return (
                  <TouchableOpacity
                    onPress={this.onToNextPagePress}
                    style={{
                      height: 60,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    {this.state.page === 4 ? null :
                      <View style={{flexDirection: 'row', backgroundColor: COLOR.defaultColor, alignItems: 'center'}}>
                        <Text style={{
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          color: '#FFF',
                          fontStyle: 'italic'
                        }}>{'Top ' + ((this.state.page + 1) * 50 + 1) + '-' + (this.state.page + 2) * 50}</Text>
                        <Image source={ICON_RIGHT_ARROW}
                               style={{backgroundColor: COLOR.defaultColor, height: 16, width: 28}}/>

                      </View>}
                    <View style={{...StyleSheet.absoluteFill, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{fontSize: 15}}>到底了</Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            }}
          />}

        {/*{this.showBottomView()}*/}

      </LinearView>
    );
  }
}

export default connect(state => ({
  top250List: state.movies.top250,
}), {
  appendNewTop250Data,
})(Top250);


const styles = StyleSheet.create({
  changeImages: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    zIndex: 100
  },
  barContainer: {
    marginHorizontal: 20,
    marginVertical: 6,
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    // zIndex: 100
  },
})
