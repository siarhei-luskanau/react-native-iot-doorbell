'use strict';

import React, { Component } from 'react';
import ReactNative, {
  AppRegistry,
  Text,
  ListView,
  ToastAndroid,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Firebase from "firebase";

const ListItem = require('./components/ListItem');
const HomeScreen = require('./components/HomeScreen');
const ChatScreen = require('./components/ChatScreen');
const styles = require('./styles')

Firebase.initializeApp({
 apiKey: "AIzaSyA5rK5JDZFjY5SpIL5FwlXhx8Sty-k9FBs",
    authDomain: "fir-database-f6b5a.firebaseapp.com",
    databaseURL: "https://fir-database-f6b5a.firebaseio.com",
    storageBucket: "fir-database-f6b5a.appspot.com",
    messagingSenderId: "443316178527"
});

const ReactNativeIotDoorbell = StackNavigator({
  Home: {screen: HomeScreen},
  Chat: {screen: ChatScreen},
});

export default class ReactNativeIotDoorbell_1 extends Component {

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
          enableEmptySections={true}
          style={styles.listview}/>
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

AppRegistry.registerComponent('ReactNativeIotDoorbell', () => ReactNativeIotDoorbell);
