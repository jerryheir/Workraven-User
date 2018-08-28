import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
// import MapComponent from './src/Components/MapComponent';
// import ImageAtom from './src/Atoms/ImageAtom';
// import ChatPage from './src/Components/ChatPage';
import Routes from './src/Navigation/Routes';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*<ImageAtom /><ChatPage />*/}
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
