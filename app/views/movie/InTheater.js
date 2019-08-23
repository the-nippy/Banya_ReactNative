/**
 created by Lex. 2019/8/23

 正在上映
 **/


import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

//组件
import Toolbar from "../../component/header/Toolbar";
import {connect} from 'react-redux';

//数据
import {getCityFromLocation} from "../../utils/location";
import {NOT_ALLOW_LOCATION, ReFreshInTheaterMovies} from "../../redux/movies";
import MovieItem250 from "../../component/movieItem/MovieItem250";

//资源
const ICON_FRESH = require('../../constant/image/refresh.png');


class InTheater extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      locationData: {}
    }
  }

  async componentDidMount() {
    await this.getLocation();
    this.RefreshMoviesData();
  }

  //刷新当前页的数据
  RefreshMoviesData = () => {
    const city = this.state.locationData.city || NOT_ALLOW_LOCATION;
    this.props.ReFreshInTheaterMovies(city);
  }

  getLocation = async () => {
    try {
      let location = await getCityFromLocation();
      console.info('location', location)
      this.setState({locationData: location})
      console.info('location', location)
    } catch (e) {
      console.warn('e!!', e)
    }
  }

  renderMovie250Item = ({item, index}) => {
    return (
      <MovieItem250
        item={item}
        isShowNo={false}
      />
    );
  }

  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#eee'}}>
        <Toolbar
          title={'正在上映'}
        />

        <ScrollView style={{flex: 1}}>

          <View style={styles.locationItem}>
            <Text style={{fontSize:15,color:'#484848'}}>{'当前城市:' + this.props.city}</Text>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{
                // backgroundColor: '#00A',
                // color: '#00A',
                width: 28, height: 28
              }} source={ICON_FRESH}/>
              <Text>重新定位</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            // style={{flex: 1}}
            keyExtractor={this._keyExtractor}
            data={this.props.inTheaterMovies}
            extraData={this.props.inTheaterMovies}
            renderItem={this.renderMovie250Item}
          />
        </ScrollView>
      </View>
    );
  }

}

export default connect((state) => ({
  inTheaterMovies: state.movies.inTheaterMovies.movies,
  city: state.movies.inTheaterMovies.city,
}), {
  ReFreshInTheaterMovies
})(InTheater);


const styles = StyleSheet.create({
  locationItem: {
    marginTop: 8,
    marginHorizontal: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
  }
})
