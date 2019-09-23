/**
 created by Lex. 2019/9/22
 **/

import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

//组件
import Toolbar from "../../component/header/Toolbar";
import {connect} from 'react-redux';
import {NavigationEvents} from 'react-navigation';
import {WIDTH} from "../../utils/contants";
import LinearView from "../../component/linear/LinearView";
//数据

//资源
const ITEM_WIDTH = (WIDTH - 60) / 2;
const ITEM_HEIGHT = ITEM_WIDTH + 30;
const ICON_SELECTED = require('../../constant/image/movie/select_on.png');
const ICON_NOT_SELECTED = require('../../constant/image/movie/select_off.png');

class Collect extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isSelectMode: false,
    }
  }

  getCollectMovieView = (i) => {

    // return (
    //
    // );
  }

  render() {

    function CollectMovieView(props) {
      let {item, key, isSelectMode} = props;
      let isSelected = true;
      return (
        <View
          key={key}
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 15,
            borderRadius: 8,
            backgroundColor: '#FFF',
            height: ITEM_WIDTH,
            marginTop: 10,
          }}>
          <Image source={{uri: item.images.medium}}
                 style={{width: ITEM_WIDTH, height: ITEM_WIDTH - 30, borderTopRightRadius: 8, borderTopLeftRadius: 8}}/>
          <View>
            <Text>{item.title}</Text>
          </View>

          {isSelectMode ?
            <View style={{...StyleSheet.absoluteFill, backgroundColor: '#9999'}}>
              <Image
                source={isSelected ? ICON_SELECTED : ICON_NOT_SELECTED}
                style={{
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  right: 10,
                  bottom: 10,
                  tintColor: '#c84438'
                }}/>
            </View>
            : null}
        </View>
      )
    }

    const views = [];
    this.props.collectMovies.forEach((value, key) => {
      console.info('[value]', value)
      // views.unshift(this.getCollectMovieView(value, key))
      views.unshift(<CollectMovieView item={value} key={key} isSelectMode={true}/>)
    })

    return (
      <View style={{flex: 1}}>
        <Toolbar
          title={'收藏'}
          rightButtons={[
            {
              text: '多选',
              onPress: () => {
                this.setState({isSelectMode: !this.state.isSelectMode})
              }
            }
          ]}
        />

        <LinearView
          colors={['#cce0eb', '#FEE', '#dfdbab']}
          style={{flex: 1}}>
          {/*<Text>已收藏的电影列表</Text>*/}
          <View
            style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}
          >
            {views}
          </View>

          {
            this.state.isSelectMode ?
              <TouchableOpacity style={{
                marginHorizontal: 25,
                width: WIDTH - 50,
                height: 40,
                backgroundColor: '#ae2d33',
                position: 'absolute',
                bottom: 20,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{fontSize: 16, color: '#FFF'}}>{'删除所选' + '个收藏电影'}</Text>
              </TouchableOpacity>
              : null
          }
        </LinearView>

        <NavigationEvents
          onWillFocus={() => {
            this.forceUpdate()
          }}
        />
      </View>
    );
  }

}

export default connect((state) => ({
  themeColor: state.publicInfo.themeColor,
  collectMovies: state.movies.collectMovies,
}), {})(Collect);
