'use strict';

import React from 'react';
import ReactNative, {
  Text,
  Button,
  ListView,
  ToastAndroid,
  View
} from 'react-native';
import Firebase from "firebase";

const DeviceListItem = require('./DeviceListItem');
const styles = require('./../styles')

class DevicesListScreen extends React.Component {

  static navigationOptions = {
    title: 'DevicesList',
  };

  constructor() {
    super();

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
 }

  listenForDoorbellRef() {
    const devicesRef = Firebase.database().ref('doorbell_app/devices');
    devicesRef.on('value', (snapshot) => {
      // get children as an array
      var items = [];
      snapshot.forEach((child) => {
        console.log(`DevicesList:${child.val().device_id}`)
        items.push(child.val().device_id);
      });

      this.setState({dataSource: this.state.dataSource.cloneWithRows(items)});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>
      </View>
    );
  }

  _renderItem(item) {

    const { navigate } = this.props.navigation;
    const onPress = () => {
      console.log(`DeviceListItem: ${item}`)
      navigate('ImagesList', { device_id: item })
    };

    return (
      <DeviceListItem item={item} onPress={onPress} />
    );
  }

  componentDidMount() {
    this.listenForDoorbellRef();
  }
}

module.exports = DevicesListScreen;
