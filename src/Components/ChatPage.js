import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, FlatList, ScrollView } from 'react-native';
import ChatAtom from '../Atoms/ChatAtom';
import { chatList } from '../config/data';
import MapComponent from './MapComponent';

const SCREEN_HEIGHT = Dimensions.get('screen').height;


export default class ChatPage extends Component {
  state = {
    item: [
      {
        key: '1',
        type: 'raven',
        body: 'Hello Sule, \nHaving a good day, are we?',
        additional: 'Who would you like to find?'
      },
      {
          key: '2',
          type: 'ravenandreply',
          body: 'Who would you like to find?',
          additional: ''
      },
      {
          key: '3',
          type: 'reply',
          body: [ "No one", "Carpenters", "Electricians", "Bricklayers", "Plumbers", "Home appliance repairers" ],
          additional: ''
      }
    ],
    newIndex: 3,
    loading: false,
    positionStyle: true
  }

  itemList = async (value) => {
    let newState = Object.assign({}, this.state);
    newState.item[this.state.newIndex - 1].body = [value];
    this.setState(newState);
    const newObjectFromChatList = chatList[this.state.newIndex];
    await this.setState({item: [...this.state.item, newObjectFromChatList], newIndex: this.state.newIndex + 1 });
    console.log(this.state.newIndex);
    const nextObjectFromChatList = await chatList[this.state.newIndex];
    await setTimeout(()=>this.setState({item: [...this.state.item, nextObjectFromChatList], newIndex: this.state.newIndex + 1 }), 1000);
    console.log(this.state.newIndex);
  }

  renderItem = (a) => {
    return (
      <ChatAtom 
      body={a.item.body} 
      type={a.item.type} 
      additional={a.item.additional}
      onPress={this.itemList} />
    );
  }

  scrollToEnd = () => {
    if (this.state.loading === true){
      this.scrollView.scrollToEnd({ animated: true });
    } else if (this.state.loading === false ) {
      this.setState({ loading: true })
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <MapComponent>
          <FlatList
          style={{ paddingTop: 10 }}
          ref={ref => (this.scrollView = ref)}
          scrollEnabled={true}
          onContentSizeChange={()=> this.scrollToEnd() }
          data={this.state.item}
          renderItem={(b)=>this.renderItem(b)}
          />
      </MapComponent>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});