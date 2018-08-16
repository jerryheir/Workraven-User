import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import MapComponent from './src/Components/MapComponent';
//import Routes from './src/Navigation/Routes';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*<Routes />*/}
        <MapComponent />
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
