import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
// import Routes from './src/Navigation/Routes';
import CreditCardScreen from './src/Screens/CreditCardScreen';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*<Routes />*/}
        <CreditCardScreen />
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
