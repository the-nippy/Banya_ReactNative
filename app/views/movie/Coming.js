/**
 created by Lex. 2019/8/16
 **/

import React, {PureComponent} from 'react';
import {
  FlatList,
} from 'react-native';

//组件
import Toolbar from "../../component/header/Toolbar";
import {connect} from 'react-redux';
import MovieSimpleItem from "../../component/movieItem/MovieSimpleItem";
import LinearView from "../../component/linear/LinearView";
//数据

//资源

class ComingMovies extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LinearView
        colors={['#cce0eb', '#FEE', '#dfdbab']}
        style={{flex: 1}}>
        <Toolbar title={'即将上映'}/>

        <FlatList
          style={{flex:1}}
          extraData={this.props}
          keyExtractor={(item, index) => index.toString()}
          data={this.props.comingMovies}
          renderItem={({item, index}) => (<MovieSimpleItem item={item} isShowGrade={false}/>)}
        />

      </LinearView>
    );
  }
}


export default connect((state) => ({
  comingMovies: state.movies.comingMovies,
}), {})(ComingMovies);
