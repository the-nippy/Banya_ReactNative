/**
 created by Lex. 2019/9/2

 播放预告片等视频
 **/


import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

//组件
import Video from 'react-native-video';
//数据

//资源

export default class extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const {videoUri} = this.props.navigation.state.params;
    console.info('videoUri', videoUri)

    return (
      <View style={{flex: 1}}>
        <Video
          source={{uri: videoUri}}   // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref
          }}                                      // Store reference
          // onBuffer={this.onBuffer}                // Callback when remote video is buffering
          // onError={this.videoError}               // Callback when video cannot be loaded
          style={styles.backgroundVideo}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
