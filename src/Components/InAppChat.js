import React, { Component } from 'react';
import { Image, Text, View, Dimensions, TouchableOpacity, FlatList, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase';
import moment from "moment";
import { Icon } from 'native-base';
import InputAtom from '../Atoms/InputAtom';
import { color } from '../Styles/Color';
import InAppChatAtom from '../Atoms/InAppChatAtom';

export default class InAppChat extends Component {
  componentDidMount(){
    console.log('hello')
    firebase.database().ref().child(`bookings/instant`).orderByChild("bookingId").equalTo('892778').on("value",snapshot => {
      if(snapshot.exists()){
          let userData = Object.values(snapshot.val());
          console.log('heyyyyyy')
          console.log(userData);
          let chatArray = userData[0].chat.split("*");
          let type = chatArray[0]; let message = chatArray[1];
          let obj = {
            key: (this.state.index + 1).toString(),
            type,
            message,
            time: moment().format('LT')
          }
          this.setState({ data: [...this.state.data, obj ], index: this.state.index + 1 })
       } else {
         console.log('Noooonnnneeee')
       }
      })

  }
  state = {
    data: [],
    index: -1,
    chat: ''
  }

  sendMessage = () => {
    firebase.database().ref('bookings/instant/').orderByChild("bookingId").equalTo('892778').once('child_added', (snapshot) => {
        snapshot.ref.update({ chat: `user*${this.state.chat}` })
    }).then(()=>this.setState({ chat: '' }))
  }

  displayChat = ({ item }) => {
    return (
      <InAppChatAtom 
      key={item.key}
      type={item.type}
      message={item.message}
      time={item.time}
      letter={'B'}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image 
          source={require('../assests/images/chatBackground.png')} 
          style={{ 
            resizeMode: 'contain', 
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
          }}
        />
        <View style={{ 
          backgroundColor: '#708090', 
          height: 100, 
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          top: 0,
          padding: 21,
          paddingBottom: 11
        }}>
            <View style={{ justifyContent: 'space-between' }}>
                <Icon 
                name="md-close" 
                style={{ color: 'white', fontSize: 30 }}
                onPress={()=>{
                  this.props.navigation.goBack(),
                  firebase.database().ref().child(`bookings/instant`).onDisconnect().remove((error) => {
                    // Do some stuff
                    console.log(error)
                  })
                }}
                />
                <Text style={{ color: 'white', fontFamily: 'Lato-Bold', fontSize: 21 }}>Badmos Jerry</Text>
            </View>
            <View style={{ justifyContent: 'space-between' }}>
                <Icon 
                name="md-call" 
                style={{ color: 'white', fontSize: 24, alignSelf: 'flex-end' }}
                />
                <Text style={{ color: 'white', fontFamily: 'Lato-Regular' }}>Bath Tub Repair</Text>
            </View>
        </View>
        <FlatList 
            data={this.state.data}
            renderItem={this.displayChat}
            style={{ marginTop: 90, width: '100%', position: 'absolute', top: 20, bottom: 40 }}
        />
        <KeyboardAvoidingView behavior="position" style={{ flex: 1, width: Dimensions.get('window').width, height: 40, flexDirection: 'row', position: "absolute", bottom: 1, left: 0, right: 0 }}>
          <InputAtom
            onChangeText={chat => this.setState({ chat })}
            value={this.state.chat}
            returnKeyType={'send'}
            onSubmitEditing={this.sendMessage}
            placeholder="Type message..."
            style={{ height: 40, alignItems: 'center' }}
            itemStyle={{ height: 40, width: Dimensions.get('window').width - 60, }}
            input={{ height: 40, width: Dimensions.get('window').width - 60, fontSize: 12 }}
            maxLength={70}
          />
          <TouchableOpacity 
          style={{ 
            height: 40, 
            width: 60,
            backgroundColor: color.primary,
            paddingHorizontal: 8, 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
          onPress={this.sendMessage}
          >
            <Text style={{ color: color.white, fontFamily: 'Lato-Regular', fontSize: 14 }}>SEND</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    )
  }
}
