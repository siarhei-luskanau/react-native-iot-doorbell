'use strict';

import ReactNative, { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Firebase from "firebase";

const DevicesListScreen = require('./components/DevicesListScreen');
const ImagesListScreen = require('./components/ImagesListScreen');

Firebase.initializeApp({
 apiKey: "AIzaSyA5rK5JDZFjY5SpIL5FwlXhx8Sty-k9FBs",
    authDomain: "fir-database-f6b5a.firebaseapp.com",
    databaseURL: "https://fir-database-f6b5a.firebaseio.com",
    storageBucket: "fir-database-f6b5a.appspot.com",
    messagingSenderId: "443316178527"
});

const ReactNativeIotDoorbell = StackNavigator({
  DevicesList: {screen: DevicesListScreen},
  ImagesList: {screen: ImagesListScreen},
});

AppRegistry.registerComponent('ReactNativeIotDoorbell', () => ReactNativeIotDoorbell);
