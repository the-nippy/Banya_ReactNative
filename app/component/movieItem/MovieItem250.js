/**
 created by Lex. 2019/8/15
 **/
import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image, StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Rating} from "react-native-ratings";
import {transformRateToValue} from "../../views/movie/util";
import {withNavigation} from 'react-navigation';

//组件

//数据
import PropTypes from 'prop-types';

//资源
const ITEM_HEIGHT = 150;
const ITEM_WIDTH = 106;


class MovieItem250 extends PureComponent {

  static propTypes = {
    item: PropTypes.object.isRequired,
    isShowNo: PropTypes.bool.isRequired,
    No: PropTypes.number,
  }

  constructor(props) {
    super(props);
  }

  render() {

    const {item, isShowNo, No} = this.props;

    const showOrgTitle = item.title == item.original_title;
    const rateValue = item?.rating?.average;

    const peoples = item.directors?.concat(item?.casts);

    return (
      <TouchableOpacity
        style={styles.movie_item}
        onPress={() => {
          this.props.navigation.navigate('MovieDetail', {item: item})
        }}
      >
        <Image source={{uri: item.images?.small}} style={{width: ITEM_WIDTH, height: ITEM_HEIGHT}}
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
            style={{paddingLeft: 5, flexDirection: 'row', alignItems: 'center'}}>
            <Rating
              readonly={true}
              type='star'
              ratingCount={5}
              startingValue={transformRateToValue(rateValue)}
              imageSize={13}
              style={{width: 60}}
            />
            <Text
              style={{marginLeft: 10, fontSize: 13, color: '#000', fontWeight: 'bold'}}>{item?.rating?.average}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginRight: 8}}>{item.year}</Text>
            {item.genres?.map((item, index) => (
              <View key={index}>
                <Text style={{marginHorizontal: 4, color: '#614d62'}}>{item}</Text>
              </View>)
            )}
          </View>

          <Text numberOfLines={2} style={{flexDirection: 'row', alignItems: 'center', color: '#305058'}}>
            {peoples?.map((item, index) => (
              <Text key={index}
                    onPress={() => {
                      console.info('Name', item.name)
                    }}
                    style={{marginHorizontal: 3, fontSize: 13}}>{item.name + '  '}</Text>
            ))}
          </Text>
        </View>

        {isShowNo ?
          <View style={{
            ...StyleSheet.absoluteFill,
            alignItems: 'flex-end',
          }}>
            <Text style={styles.textNumber}>{'No.' + (No ? No : '')}</Text>
          </View> : null
        }


      </TouchableOpacity>
    );
  }

}

export default withNavigation(MovieItem250);

const styles = StyleSheet.create({

  barContainer: {
    marginHorizontal: 20,
    marginVertical: 6,
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10
  },
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
    height: ITEM_HEIGHT,
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingHorizontal: 10
  }
})

