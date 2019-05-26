import React, {PureComponent} from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';

import {connect} from 'react-redux';
import Toolbar from '../../component/header/Toolbar';
import {changeCity, getWeatherByCity} from '../../redux/constant';
import {WEATHER_URL, WEATHER_KEY} from '../../constant/config';
import request from '../../utils/request';

import {ShowToast} from '../../utils/toast';

const ICON_UP = require('../../constant/image/up_arrow_16px.png');

const Dimension = require('Dimensions');
const SCREEN_WIDTH = Dimension.get('window').width;


class Weather extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      currentCity: '深圳',
      //城市选择
      isCityShow: false,
      //列表数据
      listData: []
    }
  }

  componentWillMount() {

    this.freshWeatherData()
    // this.fetchDWeatherData();
  }

  freshWeatherData = () => {
    this.props.getWeatherByCity(this.props.cityName);
  }


  //搜索城市
  searchCity = () => {

    const cityText = this.state.cityText;
    if (!cityText) {
      return;
    }
    this.props.changeCity(cityText);
    this.props.getWeatherByCity(cityText);
    ShowToast('已切换至' + cityText);
  }

  //搜索文本改变
  onSearchTextChange = (text) => {
    this.setState({cityText: text})
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}, index) => {

    //去掉年份字符串
    const time = item.date.slice(5);

    return (
      <View
        key={index}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 60,
            marginTop: 5,
            backgroundColor: '#e4e4e4',
            paddingRight: 8,
          }}
        >
          <View style={styles.textItem}><Text>{time}</Text></View>
          <View style={styles.textItem}><Text>{item.temperature}</Text></View>
          <View style={styles.textItemDes}><Text>{item.weather}</Text></View>
          <View style={styles.textItem}><Text>{item.direct}</Text></View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        <Toolbar
          title={'天气'}
        />
        <View style={{paddingHorizontal: 8}}>
          <TouchableOpacity
            style={{
              height: 40,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // backgroundColor: '#e4e4e4'
            }}
            onPress={() => {
              this.setState({isCityShow: !this.state.isCityShow})
            }}>
            <Text style={{fontSize: 18, color: '#19324d'}}>{'当前城市 : ' + this.props.cityName}</Text>
            <Image style={this.state.isCityShow ? styles.searchImage_up : styles.searchImage_down}
                   source={ICON_UP}/>
          </TouchableOpacity>
          {this.state.isCityShow ?
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5}}>
              <TextInput
                style={styles.searchInput}
                numberOfLines={1}
                underlineColorAndroid="transparent"
                placeholder={'请输入城市'}
                onChangeText={this.onSearchTextChange}
              />
              <TouchableOpacity
                style={styles.searchButton}
                onPress={this.searchCity}><Text>{'确认'}</Text></TouchableOpacity>
            </View>
            : null}
        </View>

        <View style={[styles.weatherTextTitle, {
          borderTopWidth: (this.state.isCityShow ? 0 : 1)
        }]}>
          <Text style={{fontSize: 16,}}>{'最近五日天气详情：'}</Text>
        </View>

        <FlatList
          data={this.props.weatherList}
          extraData={this.state.currentCity}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}


export default connect((state) => ({
  cityName: state.constant.cityName,
  weatherList: state.constant.weatherList,
}), {changeCity, getWeatherByCity})(Weather);


const styles = StyleSheet.create({
  textItem: {
    width: (SCREEN_WIDTH - 80) / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textItemDes: {
    width: (SCREEN_WIDTH - 80) / 4 + 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 3,
    width: 200,
    height: 35,
    paddingVertical: 0,
    paddingLeft: 5,
    borderColor: '#333'
  },
  searchButton: {
    width: 85,
    height: 35,
    backgroundColor: '#6899ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    borderRadius: 3,
  },
  searchImage_up: {
    // width: 30,
    // height: 30,
  },
  searchImage_down: {
    // width: 30,
    // height: 30,
    transform: [{rotate: '180deg'}]
  },
  weatherTextTitle: {
    marginHorizontal: 8,
    marginTop: 10,
    borderTopColor: '#0e0d24',
    height: 50,
    justifyContent: 'center',
  }

})