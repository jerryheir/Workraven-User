import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, Image } from 'react-native';

const { height, width } = Dimensions.get('screen');

export default class ChatAtom extends Component {
  state = {
    disabled: false,
    color: '#BE64FF'
  }

  onClick = () => {
    this.setState({ disabled: true, color: '#C190C7' })
  }

  displayChat = () => {
      if (this.props.type === 'raven') {
        return (
          <View style={{ flexDirection: 'row', }}>
            <Image
            source={require('../assests/images/wrBird.png')}
            style={{ height: 40, width: 40, marginTop: 25, marginRight: 10, marginLeft: 10 }}
            />
            <View>
              <View style={{ backgroundColor: '#FFF', height: 100, padding: 16, margin: 10 }}>
                  <Text style={{fontWeight: 'bold'}}>{this.props.body}</Text>
              </View>
              {this.props.additional !== '' && 
                <View style={{ backgroundColor: '#FFF', height: 100, padding: 16, margin: 10 }}>
                  <Text style={{fontWeight: 'bold'}}>{this.props.additional}</Text>
                </View>
              }
            </View>
          </View>
        )
      } else if (this.props.type === 'reply') {
        return (
          <View style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', maxHeight: 120, maxWidth: 350, justifyContent: 'flex-end',alignItems: 'center' }}>
            {this.props.body.map((value, key)=>{
              return <TouchableOpacity disabled={this.state.disabled} style={[styles.atom, { backgroundColor: this.state.color }]} key={key} onPress={
                ()=>{
                this.props.onPress(value);
                this.onClick();
              }}><Text style={styles.paragraph}>{value}</Text></TouchableOpacity>
            })}
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
    justifyContent: 'center',
    borderRadius: 12,
    height: 28,
    backgroundColor: '#BE64FF' ,
  },
  paragraph: {
    padding: 8,
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontSize: 12
  }
});