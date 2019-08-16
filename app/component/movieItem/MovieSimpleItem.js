/**
 created by Lex. 2019/8/15
 **/

import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image, StyleSheet
} from 'react-native';
import PropTypes from "prop-types";

//组件

//数据

//资源
const ITEM_HEIGHT = 166;
const ITEM_IMAGE_HEIGHT = 150;
const ITEM_IMAGE_WIDTH = 106;


export default class MovieSimpleItem extends PureComponent {

  static propTypes = {
    item: PropTypes.object.isRequired,
    isShowGrade: PropTypes.bool.isRequired,
    // Grade: PropTypes.number,
  }

  constructor(props) {
    super(props);
  }

  render() {

    const {item} = this.props;

    const showOrgTitle = item.title == item.original_title;
    const peoples = item.directors?.concat(item?.casts);

    return (
      <View style={styles.movie_item}>
        <Image source={{uri: item.images?.small}} style={{width: ITEM_IMAGE_WIDTH, height: ITEM_IMAGE_HEIGHT}}
               resizeMode='contain'/>

        <View style={styles.movie_item_right}>
          <View>
            <Text style={styles.movie_title}>{item.title}</Text>
            {showOrgTitle ? null : <Text
              numberOfLines={1}
              style={styles.movie_org_title}>{'(' + item.original_title + ')'}</Text>
            }
          </View>

          <View
            style={{
              // paddingLeft: 5,
              flexDirection: 'row', alignItems: 'center'
            }}>
            {/*<Rating*/}
            {/*  readonly={true}*/}
            {/*  type='star'*/}
            {/*  ratingCount={5}*/}
            {/*  startingValue={transformRateToValue(rateValue)}*/}
            {/*  imageSize={13}*/}
            {/*  style={{width: 60}}*/}
            {/*/>*/}
            <View style={{flexDirection: 'row'}}>
              {this.props.isShowGrade ?
                <Text style={{flexDirection: 'row'}}>
                  <Text>{'评分：'}</Text>
                  <Text style={{fontSize: 13, color: '#000', fontWeight: 'bold'}}>{item?.rating?.average}</Text>
                </Text> :
                <Text>类型：</Text>
              }
              <Text style={{marginLeft: this.props.isShowGrade ? 10 : 0}} numberOfLines={1}>{
                item.genres?.map((Item, index, array) => (
                  <Text key={index} style={{
                    paddingHorizontal: 2,
                    color: '#614d62'
                  }}>{Item + (index === array.length - 1 ? '' : ' - ')}</Text>
                ))}
              </Text>
            </View>
          </View>

          <View>
            <Text style={{}}>{'首映：' + item.pubdates ?.[0]}</Text>
          </View>

          <Text numberOfLines={2} style={{flexDirection: 'row', alignItems: 'center', color: '#305058'}}>
            <Text style={{marginHorizontal: 3, fontSize: 13}}>导演及演员：</Text>
            {peoples?.map((item, index) => (
              <Text key={index}
                    onPress={() => {
                      console.info('Name', item.name)
                    }}
                    style={{marginHorizontal: 3, fontSize: 13}}>{item.name + '  '}</Text>
            ))}
          </Text>
        </View>

      </View>
    );
  }

}


const styles = StyleSheet.create({

  movie_title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  movie_org_title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#666'
  },
  textNumber: {
    backgroundColor: '#dea554',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8
  },

  movie_item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8
  },

  movie_item_right: {
    flex: 1,
    height: ITEM_IMAGE_HEIGHT,
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingHorizontal: 10
  }
})
