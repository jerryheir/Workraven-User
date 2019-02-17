import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { color } from '../Styles/Color';

export default class InAppChatAtom extends Component {
  render() {
    const { type, message, time, letter } = this.props;
    if (type === 'user'){
        return (
            <View style={{ 
                backgroundColor: 'transparent', 
                width: '100%',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingHorizontal: 21,
                marginBottom: 11
            }}>
                <View style={{ backgroundColor: '#708090', padding: 8, borderRadius: 5 }}>
                    <Text style={{ color: color.white, fontFamily: 'Lato-Regular', fontSize: 12, paddingBottom: 5 }}>{message}</Text>
                    <Text style={{ textAlign: 'right', color: color.white, fontFamily: 'Lato-Regular', fontSize: 12 }}>{time}</Text>
                </View>
            </View>
        )
    } else if (type === 'pro'){
        return (
            <View style={{ 
                backgroundColor: 'transparent', 
                maxWidth: Dimensions.get('window').width,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 11,
                paddingHorizontal: 21
            }}>
                <View style={{ 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: 30, 
                    width: 30, 
                    borderRadius: 15,
                    backgroundColor: '#708090',
                    marginRight: 8
                }}>
                    <Text style={{ 
                        color: color.white, 
                        fontFamily: 'Lato-Regular', 
                        fontSize: 14 
                    }}>
                    {letter}
                    </Text>
                </View>
                <View style={{ backgroundColor: color.primary, padding: 8, borderRadius: 5, maxWidth: Dimensions.get('window').width - 90 }}>
                    <Text style={{ color: color.white, fontFamily: 'Lato-Regular', fontSize: 12, paddingBottom: 5 }}>{message}</Text>
                    <Text style={{ textAlign: 'right', color: color.white, fontFamily: 'Lato-Regular', fontSize: 12 }}>{time}</Text>
                </View>
            </View>
        )
    }
  }
}
