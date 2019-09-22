/**
 created by Lex. 2019/9/22
 **/

import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

//组件
import Toolbar from "../../component/header/Toolbar";
import {connect} from 'react-redux';
//数据

//资源

class Collect extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Toolbar
          title={'收藏'}
        />
      </View>
    );
  }

}

export default connect((state) => ({
  collectMovies: state.movies.collectMovies,
}), {})(Collect);
