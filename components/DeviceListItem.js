'use strict';

import React from 'react';
import ReactNative, { View, TouchableHighlight, Text } from 'react-native';

class DeviceListItem extends React.Component {
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

module.exports = DeviceListItem;
