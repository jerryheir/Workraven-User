import React, { Component } from 'react';
import { PushNotificationIOS, View, Text, AlertIOS, Alert, TouchableOpacity, TextInput } from 'react-native';

export default class App extends React.Component {
  render(){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ fontFamily: 'Lato-Thin', fontSize: 36 }}>Hello from the other side with Lato</Text>
        <Text>Font Set Up Complete!!! Normal font</Text>
        <Text style={{ fontFamily: 'HindGuntur-Bold', fontSize: 36 }}>Integrity is better than fame with HindGuntur</Text>
      </View>
    );
  }
}
