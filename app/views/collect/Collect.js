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
  Alert,
} from 'react-native';

//组件
import Toolbar from "../../component/header/Toolbar";
import {connect} from 'react-redux';
import {NavigationEvents} from 'react-navigation';
import {WIDTH} from "../../utils/contants";
import LinearView from "../../component/linear/LinearView";
//数据
import PropTypes from 'prop-types';
import {operateCollectMovies} from "../../redux/movies";

//资源
const ITEM_WIDTH_HEIGHT = (WIDTH - 60) / 2;
const ITEM_HEIGHT = ITEM_WIDTH_HEIGHT + 30;
const ICON_SELECTED = require('../../constant/image/movie/select_on.png');
const ICON_NOT_SELECTED = require('../../constant/image/movie/select_off.png');

class Collect extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isSelectMode: false,
      //已选中的项目的id
      selectedItemIds: []
    }
  }

  render() {

    const views = [];
    this.props.collectMovies.forEach((value, key) => {
      // console.info('[value]', value)
      // views.unshift(this.getCollectMovieView(value, key))
      views.unshift(
        <CollectMovieView
          key={key}
          item={value}
          isSelectMode={this.state.isSelectMode}
          navigation={this.props.navigation}
          changeChildSelectedState={
            (isSelected, itemId) => {
              const selectedItemIds = this.state.selectedItemIds;
              console.info('isSelected', isSelected)
              if (isSelected) {
                selectedItemIds.push(itemId)
              } else {
                const index = selectedItemIds.indexOf(itemId);
                console.info('index', index)
                if (index !== -1) {
                  selectedItemIds.splice(index, 1);
                }
              }
              this.setState({selectedItemIds},
                // () => {
                //   console.info('this.state.selectedItemIds', this.state.selectedItemIds)
                // }
              )
            }
          }
          onItemLongPress={() => {
            if (!this.state.isSelectMode) {
              this.setState({isSelectMode: true})
            }
          }}
        />)
    })

    return (
      <View style={{flex: 1}}>
        <Toolbar
          title={'收藏'}
          rightButtons={[
            {
              text: this.state.isSelectMode ? '取消' : '多选',
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
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  Alert.alert('提示', '确认删除所选 '
                    + this.state.selectedItemIds.length +
                    ' 个电影吗? 删除后您可以在电影详情页重新收藏',
                    [{
                      text: '取消'
                    }, {
                      text: '确认',
                      onPress: () => {
                        this.props.operateCollectMovies({}, true, this.state.selectedItemIds);
                        this.setState({isSelectMode: false})
                      }
                    }]
                  )
                }}
                style={styles.bottom_button}>
                <Text
                  style={{fontSize: 16, color: '#FFF'}}>
                  {'删除所选收藏电影'}
                </Text>
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

class CollectMovieView extends PureComponent {

  static propTypes = {
    isSelectMode: PropTypes.bool.isRequired,
    item: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    }
  }

  render() {
    const {item, isSelectMode, onItemLongPress, changeChildSelectedState, navigation} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelectMode) {
            this.setState({isSelected: !this.state.isSelected},
              () => changeChildSelectedState(this.state.isSelected, item.id))
          } else {
            navigation.navigate('MovieDetail', {item: item});
          }
        }}
        onLongPress={() => {
          onItemLongPress();
          this.setState({isSelected: !this.state.isSelected},
            () => changeChildSelectedState(this.state.isSelected, item.id))
        }}
        style={styles.item_button}>
        <Image source={{uri: item.images.medium}}
               style={styles.item_image}/>
        <View style={styles.rest_text}>
          <Text numberOfLines={1}>{item.title}</Text>
        </View>

        {isSelectMode ?
          <View style={{...StyleSheet.absoluteFill, backgroundColor: '#AAA9', borderRadius: 8}}>
            <Image
              source={this.state.isSelected ? ICON_SELECTED : ICON_NOT_SELECTED}
              style={styles.select_button}/>
          </View>
          : null}
      </TouchableOpacity>
    );
  }

}

export default connect((state) => ({
  themeColor: state.publicInfo.themeColor,
  collectMovies: state.movies.collectMovies,
}), {
  operateCollectMovies
})(Collect);


const styles = StyleSheet.create({
  item_button: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#FFF',
    height: ITEM_WIDTH_HEIGHT,
    marginTop: 10,
  },
  item_image: {
    width: ITEM_WIDTH_HEIGHT,
    height: ITEM_WIDTH_HEIGHT - 30,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  rest_text: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  select_button: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 3,
    bottom: 3,
    tintColor: '#c84438'
  },
  bottom_button: {
    marginHorizontal: 25,
    width: WIDTH - 50,
    height: 40,
    backgroundColor: '#ae2d33',
    position: 'absolute',
    bottom: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
})