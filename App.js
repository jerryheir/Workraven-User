import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Routes from "./src/Navigation/Routes"

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
    flex: 1
  }
});
