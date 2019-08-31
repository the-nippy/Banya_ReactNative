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
} from 'react-native';
import Toolbar from "../../component/header/Toolbar";
import {COLOR} from "../../utils/contants";

//组件
// import {} from 'react-'
import MovieSimpleItem from "../../component/movieItem/MovieSimpleItem";
import {Rating} from "react-native-ratings";
import StarRating from "../../component/starRating/StarRating";

//数据
import {TOOLBAR_HEIGHT} from "../../component/header/Toolbar.style";
import {getMovieDetailData} from "../../utils/request/MovieR";
import {transformRateToValue} from "./util";
import SimpleProgress from "../../component/progress/SimpleProgress";


//资源
const ICON_BACK = require('../../constant/image/back.png');
const ICON_MENU = require('../../constant/image/menu_point.png');
const ICON_NO_IMAGE = require('../../constant/image/noPng.png');

export default class MovieDetail extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      detail: {},
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

  render() {
    const {item} = this.props.navigation.state.params;

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

    let directorsAndCasts = detail?.directors || [];
    directorsAndCasts = directorsAndCasts.concat(detail?.casts || []);

    return (
      <View style={{flex: 1, backgroundColor: '#eef'}}>
        <View
          // alpha={0.5}
          style={styles.head_container}>

          <TouchableOpacity onPress={() => {
            this.props.navigation.goBack();
          }}>
            <Image source={ICON_BACK} style={{width: 18, height: 18}} resizeMode='contain'/>
          </TouchableOpacity>
          <Text>
            速度与激情
          </Text>
          <Image source={ICON_MENU} style={{width: 18, height: 18}}/>

        </View>

        <ScrollView style={{flex: 1}}>

          <View style={{height: TOOLBAR_HEIGHT, backgroundColor: '#4b7bab66'}}/>

          <MovieSimpleItem
            item={item}
            navigation={this.props.navigation}
            isShowGrade={false}
          />

          <View style={{
            paddingHorizontal: 15,
            marginHorizontal: 10,
            backgroundColor: '#5893cd',
            paddingTop: 5,
            borderRadius: 8
          }}>
            <View>
              <Text style={{fontSize: 14, color: '#FFF'}}>豆瓣评分</Text>
              <Image/>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>
              <View>
                <Text style={{
                  fontSize: 22,
                  color: '#FFF',
                  fontWeight: 'bold'
                  // color: '#ffd34b'
                }}>6.4</Text>
                <StarRating
                  numberOfAllStars={5}
                  numberOfFill={2.5}
                  starImageSize={16}
                  containerStyle={{width: 80, marginTop: 5}}
                />
              </View>
              <View>
                <StarRatingAndProgress numberOfAllStars={5} progressPercent={'20%'}/>
                <StarRatingAndProgress numberOfAllStars={4} progressPercent={'20%'}/>
                <StarRatingAndProgress numberOfAllStars={3} progressPercent={'20%'}/>
                <StarRatingAndProgress numberOfAllStars={2} progressPercent={'20%'}/>
                <StarRatingAndProgress numberOfAllStars={1} progressPercent={'20%'}/>
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
              <Text>所属频道</Text>
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
            <Text style={{color: '#FFF', paddingVertical: 2, lineHeight: 18}}
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
                  <View key={index} style={{width: 90, height: 180, marginRight: 6, justifyContent: 'flex-start'}}>
                    <Image source={directorAndCastImage} resizeMode={'contain'}
                           style={{width: 90, height: 140, borderRadius: 5}}/>
                    <Text style={{fontSize: 13,color:'#FFF'}}>{item.name}</Text>
                  </View>
                )
              })}
            </ScrollView>
          </View>

          <View style={{marginHorizontal: 10}}>
            <Text style={styles.bold_text}>剧照</Text>
            {[].map(() => {
            })}
          </View>


          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
              <View key={index} style={{height: 90, backgroundColor: '#ccd', marginTop: 30}}>
                <Text>{item}</Text>
              </View>
            )
          )}
        </ScrollView>

      </View>
    );
  }
}

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
    backgroundColor: '#4b7bab66'
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
  channel_tag_text: {color: '#FFF', fontSize: 13},
  bold_text: {fontSize: 19, color: '#FFF', fontWeight: 'bold', marginBottom: 10},
})
