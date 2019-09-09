/**
 created by Lex. 2019/8/14

 新片榜，请求新片榜需要位置参数（城市名），默认北京

 需要请求位置
 **/

import React, {PureComponent} from 'react';
import {
  FlatList,
} from 'react-native';

//组件
import Toolbar from "../../component/header/Toolbar";
import {connect} from 'react-redux';

//数据
import {changeLocationState} from "../../redux/public";
import {getNewMovies} from "../../utils/request/MovieR";

import LinearView from "../../component/linear/LinearView";
import MovieSimpleItem from "../../component/movieItem/MovieSimpleItem";


class NewMovie extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      newMoviesList: []
    }
  }

  async componentDidMount(): void {

    let movies = await getNewMovies();
    console.info('new_movies', movies);
    this.setState({newMoviesList: movies.subjects})

    //新片榜不需要定位
    // try {
    //   let location = await getCityFromLocation();
    //   console.info('location', location)
    // } catch (e) {
    //   console.warn('e!!', e)
    // }
  }


  renderTop250Item = ({item, index}) => {
    return (
      <MovieSimpleItem
        item={item}
        isShowGrade={true}
      />
    );
  }

  _keyExtractor = (item, index) => index.toString();

  render() {
    return (
      <LinearView
        colors={['#cce0eb', '#FEE', '#dfdbab']}
        style={{flex: 1}}>
        <Toolbar title={'新片榜'}/>

        <FlatList
          style={{flex: 1}}
          keyExtractor={this._keyExtractor}
          data={this.state.newMoviesList}
          extraData={this.state}
          renderItem={this.renderTop250Item}
        />

      </LinearView>
    );
  }
}


export default connect(state => ({
  isAllowLocation: state.publicInfo.isAllowLocation
}), {
  changeLocationState,
})(NewMovie);

