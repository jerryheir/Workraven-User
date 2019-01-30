import React, {Component} from 'react';
import { View } from 'react-native';
import ChatPage from '../Components/ChatPage';
import TopLevelMapComponent from './TopLevelMapComponent';

export default class BookingChat extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        <TopLevelMapComponent />
        <ChatPage navigation={this.props.navigation} />
      </View>
    );
  }
}
