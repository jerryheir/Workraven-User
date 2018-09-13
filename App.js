import React, {Component} from 'react';
import { StyleSheet, View, YellowBox, AsyncStorage } from 'react-native';
import Routes from './src/Navigation/Routes';


YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader requires main queue setup',
  'Module RNFetchBlob requires main queue setup',
  "Can't call",
]);

export default class App extends Component {
  render() {
    AsyncStorage.removeItem('firstname').then(()=>{
      console.log('Old name cleared');
    });
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
    backgroundColor: '#FFF'
  }
});
