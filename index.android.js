'use strict';

import React, { Component } from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  ToastAndroid,
  View
} from 'react-native';
import Firebase from "firebase";
const ListItem = require('./components/ListItem');

Firebase.initializeApp({
 apiKey: "AIzaSyA5rK5JDZFjY5SpIL5FwlXhx8Sty-k9FBs",
    authDomain: "fir-database-f6b5a.firebaseapp.com",
    databaseURL: "https://fir-database-f6b5a.firebaseio.com",
    storageBucket: "fir-database-f6b5a.appspot.com",
    messagingSenderId: "443316178527"
});

export default class ReactNativeIotDoorbell extends Component {

 constructor() {
    super();

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };

    this.devicesRef = Firebase.database().ref('doorbell_app/devices');
    this.imagesRef = Firebase.database().ref('doorbell_app/images');
 }

  listenForDoorbellRef() {
    this.devicesRef.on('value', (snapshot) => {
      console.log(`Doorbell state:${snapshot.val()}`)

      // get children as an array
      var items = [];
      snapshot.forEach((child) => {
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
          enableEmptySections={true} />
      </View>
    );
  }

  _renderItem(item) {

    const onPress = () => {
      console.log(`ListItem: ${item}`)
      ToastAndroid.show(`ListItem: ${item}`, ToastAndroid.SHORT);
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }

  componentDidMount() {
    this.listenForDoorbellRef();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('ReactNativeIotDoorbell', () => ReactNativeIotDoorbell);
