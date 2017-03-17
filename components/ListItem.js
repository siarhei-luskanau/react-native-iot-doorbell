'use strict';

import React, {Component} from 'react';
import ReactNative, { View, TouchableHighlight, Text } from 'react-native';

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View>
          <Text>{this.props.item}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;
