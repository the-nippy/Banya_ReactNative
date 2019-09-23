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
import {NavigationEvents} from 'react-navigation';
//数据

//资源

class Collect extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const views = [];
    this.props.collectMovies.forEach((value, key) => {
      console.info('[value]', value)
      views.unshift(
        <View>
          <Image source={{uri: value.images.medium}} style={{width: 100, height: 100}}/>
          <View>
            <Text>{value.title}</Text>
            <Text></Text>
          </View>
        </View>
      )
    })

    return (
      <View style={{flex: 1}}>
        <Toolbar
          title={'收藏'}
        />
        <Text>已收藏的电影列表</Text>
        {views}

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
  collectMovies: state.movies.collectMovies,
}), {})(Collect);
