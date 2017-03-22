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

const ImageListItem = require('./ImageListItem');
const styles = require('./../styles')

class ImagesListScreen extends React.Component {

  static navigationOptions = {
    // Nav options can be defined as a function of the navigation prop:
    title: ({ state }) => state.params.device_id,
  };

  constructor() {
    super();

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
 }

  listenForImagesRef() {
    const device_id = this.props.navigation.state.params.device_id;
    const imagesRef = Firebase.database().ref('doorbell_app/images/' + device_id);
    imagesRef.on('value', (snapshot) => {
      // get children as an array
      var items = [];
      snapshot.forEach((child) => {
        console.log(`ImagesList:${child.val().image_id}`)
        items.push(child.val().image);
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
      console.log(`ImageListItem: ${item}`)
    };

    return (
      <ImageListItem item={item} onPress={onPress} />
    );
  }

  componentDidMount() {
    this.listenForImagesRef();
  }
}

module.exports = ImagesListScreen;
