'use strict';

import React from 'react';
import ReactNative, {
  TouchableHighlight,
  Image,
  Text,
  View
} from 'react-native';

class ImageListItem extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View>
          <Image
            style={{width: 320, height: 240}}
            source={{uri: `data:image/jpeg;base64,${this.props.item}`}}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ImageListItem;
