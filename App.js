import React, {Component} from 'react';
import { StyleSheet, View, YellowBox} from 'react-native';
import Routes from './src/Navigation/Routes';


YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader requires main queue setup',
  'Module RNFetchBlob requires main queue setup',
]);

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
    backgroundColor: '#FFF'
  }
});
