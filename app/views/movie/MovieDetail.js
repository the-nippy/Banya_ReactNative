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

export default class MovieDetail extends PureComponent {

  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    const {item} = this.props.navigation.state.params;
    let movieDetailData = await getMovieDetailData(item.id);
    console.info('详情页数据', movieDetailData);
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
            backgroundColor: '#4f71cd',
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

            <View style={{marginVertical: 10}}>
              <Text>8.2万人看过，3.7万人想看</Text>
            </View>
          </View>

          <View>
            <Text>所属频道</Text>
          </View>

          <View>
            <Text>简介</Text>
            <Text></Text>
          </View>

          <View>
            <View>
              <Text>演职员</Text>
              <Text>全部</Text>
            </View>
            {[].map(() => {
            })}
          </View>

          <View>
            <View>
              <Text>剧照/短评</Text>
              <Text>全部</Text>
            </View>

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
  }
})
