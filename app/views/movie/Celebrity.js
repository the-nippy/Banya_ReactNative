/**
 created by Lex. 2019/9/10
 **/


import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  WebView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';


//组件
import Toolbar from "../../component/header/Toolbar";
import StarRating from "../../component/starRating/StarRating";
import {LoadingView, STATES} from "../loading/LoadingView";

//数据
import {transformRateToValue} from "./util";
import {DealError} from "../../utils/BanError";
import {getCelebrityDetailData} from "../../utils/request/MovieR";

//资源
const HEIGHT_BASE_INFO = 130;

export default class Celebrity extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      celebrity: {},
      loadState: STATES.LOADING,
    }
  }

  async componentWillMount() {
    await this.freshData();
  }

  freshData = async () => {
    const {item} = this.props.navigation.state.params;
    try {
      let detailData = await getCelebrityDetailData(item.id);
      console.info('detailData', detailData)
      this.setState({celebrity: detailData, loadState: ''})
    } catch (e) {
      console.warn(e)
      DealError(e);
      this.setState({loadState: STATES.FAIL})
    }
  }

  render() {

    const {celebrity, loadState} = this.state;
    console.info('celebrity', celebrity)
    console.info('loadState', loadState)

    return (
      <View style={{flex: 1}}>
        <Toolbar
          title={'影人'}
        />
        {
          (loadState === STATES.LOADING || loadState === STATES.FAIL)
            ?
            <LoadingView loadingState={this.state.loadState} reloadData={this.freshData}/>
            :
            <ScrollView style={{flex: 1}}>

              <View
                style={styles.baseInfo_container}>
                <Image source={{uri: celebrity?.avatars?.medium}}
                       style={{width: 90, height: HEIGHT_BASE_INFO, borderRadius: 10}}/>
                <View style={styles.info_container}>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>{celebrity.name}</Text>
                  <Text style={{fontSize: 17, fontWeight: 'bold'}}>{celebrity.name_en}</Text>
                  <Text>{celebrity.constellation}</Text>
                  <Text>{celebrity.born_place}</Text>
                </View>
              </View>

              <Text style={styles.subtitle}>简介</Text>

              {celebrity.summary.length > 0 ?
                <Text numberOfLines={3}
                      style={{marginHorizontal: 15, lineHeight: 16, fontSize: 15}}>{celebrity.summary}</Text> :
                <Text style={{marginLeft: 15}}>暂无简介</Text>
              }

              <Text style={styles.subtitle}>作品</Text>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{marginLeft: 15}}
                contentContainerStyle={styles.scrollView_content}
              >
                {celebrity.works?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      this.props.navigation.push('MovieDetail', {item: item, type: 'back'})
                    }}
                    style={{
                      height: 185,
                      marginLeft: index === 0 ? 0 : 15,
                    }}>
                    <Image source={{uri: item.subject.images.medium}}
                           style={styles.work_image}/>
                    <Text numberOfLines={1} style={{fontWeight: 'bold', width: 100}}>{item.subject.title}</Text>
                    <View style={styles.row_center}>
                      <StarRating
                        starImageSize={12} numberOfAllStars={5}
                        numberOfFill={transformRateToValue(item.subject.rating.average)}
                        containerStyle={{width: 70}}/>
                      <Text>{item.subject.rating.average}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.subtitle}>相册</Text>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{marginLeft: 15, marginBottom: 15}}
                contentContainerStyle={styles.scrollView_content}
              >
                {celebrity.photos?.map((item, index) => (
                  <Image
                    key={index}
                    style={{width: 190, height: 140, borderRadius: 5, marginLeft: index === 0 ? 0 : 3}}
                    source={{uri: item?.image}}
                  />
                ))}
                <View style={styles.all_photo}>
                  <Text>全部照片</Text>
                  <View style={styles.all_divide}/>
                </View>

              </ScrollView>

            </ScrollView>
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  subtitle: {
    marginHorizontal: 15,
    marginVertical: 15,
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold'
  },
  baseInfo_container: {
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: HEIGHT_BASE_INFO,
    marginTop: 15
  },
  row_center: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  scrollView_content: {flexDirection: 'row', alignItems: 'center', paddingRight: 15},
  work_image: {width: 100, height: 140, borderRadius: 8},
  info_container: {justifyContent: 'space-between', height: HEIGHT_BASE_INFO, marginLeft: 15},
  all_photo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    height: 140,
    backgroundColor: '#d7d7d7',
    marginLeft: 3
  },
  all_divide: {height: 1, width: 50, backgroundColor: '#999', marginTop: 5},
});
