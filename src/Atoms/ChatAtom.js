import React, { Component } from 'react';
import { StyleSheet, Platform, View, Dimensions, TouchableOpacity, Text, Image } from 'react-native';
import { Input, Item, Thumbnail } from "native-base";
import { color } from '../Styles/Color';
import Share from 'react-native-share';

const { height, width } = Dimensions.get('screen');

let shareOptions = {
  title: "React Native",
  message: "Hola mundo",
  url: "http://facebook.github.io/react-native/",
  subject: "Share Link" //  for email
};

export default class ChatAtom extends Component {
  componentDidMount(){
    this.whatsapp = (<Thumbnail 
                source={require('../assests/images/whatsapp-logo.jpg')} 
                style={{ margin: 8, height: 40, width: 40, borderRadius: 20 }}
                />
              );
this.facebook = (<Thumbnail 
                source={require('../assests/images/facebook-logo.jpg')} 
                style={{ margin: 8, height: 40, width: 40, borderRadius: 20  }}
                />
              );
this.twitter = (<Thumbnail 
                source={require('../assests/images/twitter-logo.png')} 
                style={{ margin: 8, height: 40, width: 40, borderRadius: 20  }}
                />
              );
  }

  state = {
    disabled: false,
    color: '#BE64FF',
    value: '',
    maxWidth: null,
    height: 28
  }

  onPressShare = (name) => {
    Share.shareSingle(Object.assign(shareOptions, {
      "social": name
    }));
  }

  onClick = () => {
    this.setState({ disabled: true, color: '#C190C7' })
  }
  updateText = (value) => {
    this.setState({ value })
  }

  displayChat = () => {
    switch(true){
      case (this.props.type === 'raven') :
        return (
          <View style={{ 
            flexDirection: 'row',
          }}>
            <Image
            source={require('../assests/images/wrBird.png')}
            style={{ height: 25, width: 25, marginTop: 15, marginRight: 10, marginLeft: 15 }}
            />
            <View>
              <View style={{
                backgroundColor: '#FFF',
                padding: 10,
                margin: 8,
                maxWidth: 250,
                borderRadius: 10,
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOpacity: 1,
                shadowOffset: { width: 0, height: 1 },
                elevation: 2
              }}>
                  <Text style={{ fontSize: Platform.OS === 'ios' ? 12 : 10, fontFamily: 'Lato-Regular' }}>{this.props.body}</Text>
              </View>
              {this.props.additional !== '' && 
                <View style={{ 
                  backgroundColor: '#FFF', padding: 10, margin: 8, borderRadius: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.2)',
                  shadowOpacity: 1,
                  shadowOffset: { width: 0, height: 1 },
                  elevation: 2
                }}>
                  <Text style={{ fontFamily: 'Lato-Regular', fontSize: Platform.OS === 'ios' ? 12 : 10 }}>{this.props.additional}</Text>
                </View>
              }
            </View>
          </View>
        )
      case (this.props.type === 'reply' && Array.isArray(this.props.body)) :
        return (
          <View style={{ alignSelf: 'flex-end', marginBottom: 10 }}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', maxHeight: 140, maxWidth: 300, justifyContent: 'flex-end',alignItems: 'flex-end', marginRight: 10 }}>
            {this.props.body.map((value, key)=>{
              return <TouchableOpacity disabled={this.state.disabled} style={[styles.atom, { backgroundColor: this.state.color, height: value.length > 50 ? 42 : 28 }]} key={key} onPress={
                ()=>{
                this.props.onPress(value);
                this.onClick();
              }}><Text style={[styles.paragraph, { textAlign:  value.length > 50 ? 'left' : 'center' }]}>{value}</Text></TouchableOpacity>
            })}
            </View>
          </View>
        )
      case (this.props.type === 'reply' && this.props.body === 'text-input') :
        return (
            <Item style={{ alignSelf: 'flex-end', height: 36, borderColor: 'transparent', marginTop: 3, marginBottom: 10, marginRight: 14 }}>
              <Input 
              onChangeText={this.updateText}
              value={this.state.value}
              keyboardType={'default'}
              returnKeyType='send'
              placeholder={'   Type here'}
              placeholderTextColor={color.gray}
              onSubmitEditing={()=>{
                this.props.onPress(this.state.value);
                this.onClick();
              }}
              autoCapitalize="none"
              autoCorrect={false}
              style={{ 
                height: 36, 
                maxWidth: '70%', 
                fontSize: Platform.OS === 'ios' ? 12 : 11, 
                color: color.inputPurple,
                borderRadius: 18,
                fontFamily: 'Lato-Regular',
                borderWidth: 1, 
                borderColor: '#c0c0c0'
              }}
              // onFocus={()=> this.setState({ inputmarginBottom: 150 })}
              maxLength={70}
              />
            </Item>
        )
      case (this.props.type === 'reply' && this.props.body === 'share-reply') :
        return (
          <View style={{ alignSelf: 'flex-end', marginBottom: 10 }}>
            <View style={{flexDirection: 'row', maxHeight: 140, maxWidth: 300, justifyContent: 'flex-end',alignItems: 'flex-end', marginRight: 10 }}>
              <TouchableOpacity onPress={()=>{
                this.props.onPress();
                this.onPressShare("whatsapp");
                }}>
                {this.whatsapp}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                this.props.onPress();
                this.onPressShare("facebook");
                }}>
                {this.facebook}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                this.props.onPress();
                this.onPressShare("twitter");
                }}>
                {this.twitter}
              </TouchableOpacity>
            </View>
          </View>
        )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.displayChat()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent'
  },
  atom: {
    margin: 3,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    borderRadius: 10,
    height: 28,
    backgroundColor: '#BE64FF',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2
  },
  paragraph: {
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
    color: 'white',
    fontSize: Platform.OS === 'ios' ? 12 : 10
  }
});
