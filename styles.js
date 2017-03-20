'use strict';

import ReactNative, {StyleSheet} from 'react-native';

const constants = {
  actionColor: '#24CE84'
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  listview: {
    flex: 1,
  },
})

module.exports = styles
module.exports.constants = constants;
