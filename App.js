import React, {Component} from 'react';
import { StyleSheet, View, YellowBox, AsyncStorage } from 'react-native';
import Routes from './src/Navigation/Routes';
// import MarkerAtom from "./src/Atoms/MarkerAtom";
// import TinyWhiteButton from "./src/Atoms/TinyWhiteButton";
// import MapComponent from './src/Components/MapComponent';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader requires main queue setup',
  'Module RNFetchBlob requires main queue setup',
  "Can't call",
  "Remote",
  "Warning: Can't call setState"
]);

AsyncStorage.removeItem('firstname').then(()=>{
  console.log('Old name cleared');
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Routes />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0c0c0' // #fff
  }
});

// [GMSServices provideAPIKey:@"AIzaSyA4Px93uD9nzyzcMvVtk0g3yR1oicwTzbE"];

