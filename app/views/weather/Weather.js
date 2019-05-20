import React, {PureComponent} from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import Toolbar from '../../component/header/Toolbar';
import {WEATHER_URL, WEATHER_KEY} from '../../constant/config';
import request from '../../utils/request';

const Dimension = require('Dimensions');
const SCREEN_WIDTH = Dimension.get('window').width;


export default class Weather extends PureComponent {

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

    this.fetchDWeatherData();
  }

  fetchDWeatherData = async () => {
    // todo  get请求参数拼接
    const city = this.state.currentCity;
    fetch('http://apis.juhe.cn/simpleWeather/query?city=' + city + '&key=3d4b6b460d38f52a0afb316b1f154ae3', {method: 'GET'}).then(
      res => {
        res.json().then(
          result => {
            this.setState({listData: result.result.future})
            console.info('[]result', result.result.future)
          },
          err => {
            console.info('err', err)
          }
        )
        // console.info('res', JSON.stringify())
      },
      err => console.info('err', err)
    );
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
          <View style={styles.textItem}><Text>{item.weather}</Text></View>
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
        <View style={{backgroundColor: '#e4e4e4'}}>
          <TouchableOpacity>
            <Text>{'当前城市' + this.state.currentCity}</Text>
            {/*<Image source={''}/>*/}
          </TouchableOpacity>
          {this.state.isCityShow
            ? <View>

            </View>
            : null}
        </View>

        <FlatList
          data={this.state.listData}
          extraData={this.state.currentCity}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textItem: {
    width: (SCREEN_WIDTH - 40) / 4,
    alignItems: 'center',
    justifyContent: 'center',
  }
})