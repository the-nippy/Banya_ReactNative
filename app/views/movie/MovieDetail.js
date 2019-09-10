/**
 created by Lex. 2019/8/26

 电影详情页
 **/


import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  // Modal,
} from 'react-native';

import Toolbar from "../../component/header/Toolbar";
import {COLOR, WIDTH} from "../../utils/contants";


//组件
// import {} from 'react-'
import Video from 'react-native-video';
import Modal from 'react-native-modal';
import MovieSimpleItem from "../../component/movieItem/MovieSimpleItem";
import {Rating} from "react-native-ratings";
import StarRating from "../../component/starRating/StarRating";

import ImageViewer from 'react-native-image-zoom-viewer';

//数据
import {TOOLBAR_HEIGHT} from "../../component/header/Toolbar.style";
import {getMovieDetailData} from "../../utils/request/MovieR";
import {getDeeperColor, transformRateToValue} from "./util";
import SimpleProgress from "../../component/progress/SimpleProgress";
import {connect} from 'react-redux';

//资源
const ICON_BACK = require('../../constant/image/back.png');
const ICON_MENU = require('../../constant/image/menu_point.png');
const ICON_NO_IMAGE = require('../../constant/image/noPng.png');
const ICON_PLAY = require('../../constant/image/movie/play.png');
const ICON_CANCEL = require('../../constant/image/cancel.png');


const alphaValues = ['FF', '99'];

class MovieDetail extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      videoModalVisible: false,
      currentVideoUrl: '',
      imageModalVisible: false,
      imageModalUrl: '',
      //
      titleAlpha: alphaValues[0],

    }
  }

  async componentWillMount() {
    const {item} = this.props.navigation.state.params;
    try {
      let movieDetailData = await getMovieDetailData(item.id);
      console.info('详情页数据', movieDetailData);
      this.setState({detail: movieDetailData})
    } catch (e) {
      this.setState({loading: true})
      console.warn('Detail error');
    }

  }

  //计算评分占比  返回百分数数组
  getGradeRatioArray = () => {
    const {detail} = this.state;
    //评分
    let RatingDetail = detail?.rating?.details;
    //各个评分的百分比数组
    let percentArray = new Array();
    if (RatingDetail) {
      let keys = Object.keys(RatingDetail);
      let allCount = 0;
      for (let i = 0; i < keys.length; i++) {
        allCount = allCount + RatingDetail[keys[i]];
      }
      console.info('allCount', allCount);
      if (allCount === 0) {
        percentArray = ['0%', '0%', '0%', '0%', '0%'];
      } else {
        for (let i = 0; i < keys.length; i++) {
          //小数转百分数，百分数留两位小数
          const value = Math.round((RatingDetail[keys[i]] / allCount) * 10000) / 100;
          percentArray[keys.length - i] = value + '%';
        }
      }
    } else {
      percentArray = ['0%', '0%', '0%', '0%', '0%'];
    }
    // console.info('percentArray', percentArray)
    return percentArray;
  }

  //处理ScrollView滚动，设置标题透明度
  dealViewScroll = ({nativeEvent}) => {
    console.info('nativeEvent', nativeEvent);
    const contentOffset = nativeEvent.contentOffset;
    if (contentOffset.y > 80) {
      this.checkAlpha(0)
    } else {
      this.checkAlpha(1);
    }
  }
  checkAlpha = (index) => {
    if (this.state.titleAlpha === alphaValues[index]) {
      return;
    } else {
      this.setState({titleAlpha: alphaValues[index]})
    }
  }


  renderModal = (movieTitle) => {
    return (
      <View style={styles.modal_content}>

        <View style={styles.modal_head}>
          <Text style={{fontSize: 16, color: this.props.themeColor}}>{`《${movieTitle}》预告片：`}</Text>
          <TouchableOpacity
            style={[styles.modal_cancel_button, {backgroundColor: this.props.themeColor,}]}
            onPress={() => {
              this.setState({videoModalVisible: false})
            }}>
            <Image source={ICON_CANCEL} style={{width: 12, height: 12}} resizeMode={'contain'}/>
          </TouchableOpacity>
        </View>


        <Video
          controls={true}
          source={{uri: this.state.currentVideoUrl}}   // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref
          }}                                      // Store reference
          // onBuffer={this.onBuffer}                // Callback when remote video is buffering
          // onError={this.videoError}               // Callback when video cannot be loaded
          style={styles.backgroundVideo}
        />

      </View>
    )
  }

  render() {
    const {item} = this.props.navigation.state.params;

    const themeColor = this.props.themeColor;
    const deepThemeColor = getDeeperColor(themeColor);
    // console.info('deepThemeColor', deepThemeColor);

    //提取StarRating和Progress组合的组件
    let StarRatingAndProgress = function (props) {
      const {numberOfAllStars, progressPercent} = props;
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <StarRating starImageSize={10} numberOfAllStars={numberOfAllStars} containerStyle={styles.star_progress}
                      useGreyStar={true}/>
          <SimpleProgress progressPercent={progressPercent} containerStyle={{marginLeft: 5}}/>
        </View>
      );
    }

    const {detail} = this.state;

    //平均分
    let grade = detail?.rating?.average || 0;

    //演职员
    let directorsAndCasts = detail?.directors || [];
    directorsAndCasts = directorsAndCasts.concat(detail?.casts || []);

    //预告片  剧照
    const trailerObject = detail.trailers?.[0] || [];

    const bigPhotos = detail.photos?.slice(0, 2) || [];

    const smallPhotos = detail.photos?.slice(2, 10) || [];

    return (
      <View style={{flex: 1, backgroundColor: themeColor}}>
        <View
          // alpha={0.5}
          style={[styles.head_container, {backgroundColor: themeColor + this.state.titleAlpha}]}>

          <TouchableOpacity onPress={() => {
            this.props.navigation.goBack();
          }}>
            <Image source={ICON_BACK} style={{width: 18, height: 18}} resizeMode='contain'/>
          </TouchableOpacity>
          <Text style={{color: '#dddddd', fontSize: 18}}>
            {item.title}
          </Text>
          <Image source={ICON_MENU} style={{width: 18, height: 18}}/>

        </View>

        <ScrollView
          style={{flex: 1}}
          onScroll={this.dealViewScroll}
        >

          <View style={{height: TOOLBAR_HEIGHT, backgroundColor: themeColor, marginBottom: 5}}/>

          <MovieSimpleItem
            disabled={true}
            item={item}
            isShowGrade={false}
          />

          <View style={[styles.rating_container, {backgroundColor: deepThemeColor}]}>
            <View>
              <Text style={{fontSize: 14, color: '#FFF'}}>豆瓣评分</Text>
              <Image/>
            </View>

            <View style={styles.rating_middle}>
              {grade === 0 ? <View>
                <Text style={[styles.grade_text, {fontSize: 13}]}>{'未上线电影\n暂无评分'}</Text>
                <StarRating
                  numberOfAllStars={5}
                  numberOfFill={0}
                  starImageSize={14}
                  containerStyle={styles.grade_rating}
                />
              </View> : <View>
                <Text style={styles.grade_text}>{grade % 1 === 0 ? grade + '.0' : grade}</Text>
                <StarRating
                  numberOfAllStars={5}
                  numberOfFill={transformRateToValue(detail?.rating?.average)}
                  starImageSize={16}
                  containerStyle={styles.grade_rating}
                />
              </View>}

              <View>
                {this.getGradeRatioArray().map((item, index) => (
                  //索引index不从0开始？
                  <StarRatingAndProgress key={index} numberOfAllStars={5 - index + 1} progressPercent={item}/>
                ))}
              </View>
            </View>

            <View style={{height: StyleSheet.hairlineWidth, backgroundColor: '#aaa', marginTop: 10}}/>

            <View style={{marginVertical: 5, alignItems: 'flex-end'}}>
              <Text style={{fontSize: 12, color: '#FFF'}}>8.2万人看过，3.7万人想看</Text>
            </View>
          </View>

          <View style={{marginHorizontal: 10, marginTop: 10}}>
            <ScrollView
              contentContainerStyle={{flexDirection: 'row', alignItems: 'center',}}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              <Text style={styles.channel_tag_text}>所属频道</Text>
              {
                detail.tags?.length > 0 ? detail.tags?.map((item, index) => (
                  <View
                    key={index}
                    style={styles.channel_tag}><Text style={styles.channel_tag_text}>{item}</Text></View>
                )) : item.genres?.map((item, index) => (
                  <View key={index} style={styles.channel_tag}>
                    <Text style={styles.channel_tag_text}>{item}</Text>
                  </View>
                ))
              }
            </ScrollView>
          </View>

          <View style={{marginHorizontal: 10, marginTop: 10}}>
            <Text style={styles.bold_text}>简介</Text>
            <Text style={{color: '#FFF', paddingVertical: 2, fontSize: 16, lineHeight: 19}}
                  numberOfLines={5}
                  ellipsizeMode={'tail'}
            >{(detail.summary ? detail.summary : '暂无简介内容') + '\n\n'}</Text>
          </View>

          <View style={{marginHorizontal: 10, marginTop: 10}}>
            <Text style={styles.bold_text}>演职员</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              {directorsAndCasts.map((item, index) => {
                const directorAndCastImage = item.avatars?.small ? {uri: item.avatars?.small} : ICON_NO_IMAGE;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Celebrity', {item: item})
                    }}
                    key={index} style={{width: 90, height: 180, marginRight: 6, justifyContent: 'flex-start'}}>
                    <Image source={directorAndCastImage} resizeMode={'contain'}
                           style={{width: 90, height: 140, borderRadius: 5}}/>
                    <Text style={{fontSize: 13, color: '#FFF'}}>{item.name}</Text>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>

          <View
            style={[styles.title_comment, {marginTop: 0}]}>
            <Text style={styles.bold_text}>剧照</Text>
            <Text onPress={() => {
              this.props.navigation.navigate('PhotoList')
            }} style={{color: '#FFF', fontSize: 16}}>全部</Text>
          </View>

          <View style={{marginHorizontal: 10}}>
            {/*<Text style={styles.bold_text}>剧照</Text>*/}
            <ScrollView
              style={{marginTop: 10}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
            >
              {trailerObject?.medium ?
                <TouchableOpacity
                  onPress={() => {
                    this.setState({videoModalVisible: true, currentVideoUrl: trailerObject.resource_url})
                    // this.props.navigation.navigate('MovieVideo', {videoUri: trailerObject.resource_url});
                  }}>
                  <ImageBackground
                    source={{uri: trailerObject?.medium}}
                    style={[styles.big_photo, styles.trailer_image]}>
                    <View
                      style={styles.trailer_play}>
                      <Image source={ICON_PLAY} style={{width: 30, height: 30}}/>
                    </View>
                  </ImageBackground>
                  <View style={styles.trailer_textContainer}>
                    <View style={{borderBottomRightRadius: 6}}>
                      <Text style={styles.trailer_text}>预告片</Text>
                    </View>
                  </View>
                  <View style={styles.trailer_timeContainer}>
                    <Text style={{
                      color: '#FFF', marginRight: 5, marginBottom: 5
                    }}>5:00</Text>
                  </View>
                </TouchableOpacity>
                : null}
              {bigPhotos?.map((item, index) => (
                <TouchableOpacity
                  key={index} onPress={() => {
                  this.setState({imageModalVisible: true, imageModalUrl: item.image})
                }}>
                  <Image
                    source={{uri: item.image}}
                    style={styles.big_photo}/>
                </TouchableOpacity>
              ))}
              <View style={{flexWrap: 'wrap', height: 150}}>
                {smallPhotos.map((item, index, array) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.setState({imageModalVisible: true, imageModalUrl: item.image})
                    }}
                  >
                    <Image
                      source={{uri: item.image}}
                      style={{
                        width: 100,
                        height: 74,
                        marginLeft: 2,
                        marginTop: index % 2 === 0 ? 0 : 2,
                        borderTopRightRadius: index === (array.length - 2) ? BORDER_PHOTO : 0,
                        borderBottomRightRadius: index === (array.length - 1) ? BORDER_PHOTO : 0
                      }}/>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View
            style={styles.title_comment}>
            <Text style={styles.bold_text}>短评</Text>
            <Text>全部</Text>
          </View>
          <View style={[styles.comment_container, {backgroundColor: deepThemeColor}]}>
            <View style={{marginHorizontal: 5}}>
              {detail.popular_comments?.map((item, index) => (
                <View key={index} style={{paddingHorizontal: 10}}>
                  <View
                    style={styles.comment_author}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image source={{uri: item.author?.avatar}} style={{width: 36, height: 36, borderRadius: 18}}/>
                      <View style={{marginLeft: 10}}>
                        <Text style={[styles.comment_text, {fontWeight: 'bold'}]}>{item.author?.name}</Text>
                        <StarRating numberOfAllStars={5} starImageSize={12} numberOfFill={item.rating.value}
                                    containerStyle={{width: 60, marginTop: 4}}/>
                      </View>
                    </View>
                    <Text style={{color: '#9e9e9e'}}>{item.created_at?.split(' ')?.[0]}</Text>
                  </View>
                  <Text style={styles.comment_text}
                        numberOfLines={4}>{item.content}</Text>
                  <View style={{height: 1, backgroundColor: '#919191', marginTop: 15}}/>
                </View>
              ))}
            </View>
          </View>


        </ScrollView>

        <Modal
          isVisible={this.state.videoModalVisible}
          onBackdropPress={() => this.setState({videoModalVisible: false})}
          // backdropColor={"#B4B3DB"}
          backdropOpacity={0.6}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={800}
          animationOutTiming={800}
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}
        >
          {this.renderModal(detail.title)}
        </Modal>

        <Modal
          isVisible={this.state.imageModalVisible}
          enableSwipeDown={true}
          onBackdropPress={() => this.setState({imageModalVisible: false})}
        >
          <ImageViewer imageUrls={[{url: this.state.imageModalUrl}]}/>
        </Modal>

      </View>
    );
  }
}

export default connect((state) => ({
  themeColor: state.publicInfo.themeColor,
}))(MovieDetail);

const BORDER_PHOTO = 10;
const styles = StyleSheet.create({
  star_progress: {
    width: 40,
    justifyContent: 'flex-end'
  },
  head_container: {
    ...StyleSheet.absoluteFill,
    // opacity:0.3,
    zIndex: 100,
    // alpha: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: TOOLBAR_HEIGHT,
    // backgroundColor: '#4b7bab66'
  },
  channel_tag: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginHorizontal: 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#777777'
  },
  channel_tag_text: {
    color: '#FFF',
    fontSize: 14
  },
  bold_text: {
    fontSize: 19,
    color: '#FFF',
    fontWeight: 'bold',
    marginVertical: 10
  },
  big_photo: {
    width: 200,
    height: 150,
    marginRight: 2,
  },
  comment_text: {
    fontSize: 15,
    lineHeight: 17,
    color: '#FFF'
  },
  title_comment: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  grade_text: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold'
    // color: '#ffd34b'
  },
  grade_rating: {
    width: 80, marginTop: 5
  },
  rating_container: {
    paddingHorizontal: 15,
    marginHorizontal: 10,
    backgroundColor: '#6a300c',
    marginTop: 5,
    paddingTop: 5,
    borderRadius: 8
  },
  rating_middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5
  },
  trailer_play: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#72727255'
  },
  comment_container: {
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10
  },
  comment_author: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  modal_content: {
    // width: WIDTH - 30,
    height: 3 * (WIDTH) / 4,
    backgroundColor: 'white',
    // margin: 15,
    paddingHorizontal: 10,
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  backgroundVideo: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  modal_cancel_button: {
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal_head: {
    position: 'absolute',
    top: 8,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 5,
    zIndex: 100,
    height: 24
  },
  trailer_image: {
    borderTopLeftRadius: BORDER_PHOTO,
    borderBottomLeftRadius: BORDER_PHOTO,
    // borderRadius: BORDER_PHOTO,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trailer_textContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  trailer_text: {
    color: '#FFF', backgroundColor: '#c46941', paddingHorizontal: 4,
    paddingVertical: 3,
  },
  trailer_timeContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
})
