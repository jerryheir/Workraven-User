import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'native-base';
import { color } from '../Styles/Color';

export default class NotificationIconAtom extends Component {
  render() {
    return (
      <View style={{ 
          backgroundColor: color.white, 
          height: 32, 
          width: 32, 
          borderRadius: 16, 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
        <Icon 
        type={"MaterialIcons"}
        name="notifications-none" 
        style={{ fontSize: 24, color: color.primary }}
        />
        <View style={{ position: 'absolute', bottom: 7, right: 5,backgroundColor: 'red', height: 9, width: 9, borderRadius: 4.5 }} />
      </View>
    )
  }
}
