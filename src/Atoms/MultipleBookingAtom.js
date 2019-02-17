import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { color } from '../Styles/Color';
import { Icon } from "native-base";

export default class MultipleBookingAtom extends Component {
    displayDate = () => {
        if (this.props.date !== 'NOW'){
            return (
                <View>
                    <Text style={{ fontFamily: 'Lato-Thin', fontSize: 12 }}>Date:</Text>
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12 }}>{this.props.date}</Text>
                </View>
            )
        } else if (this.props.date === 'NOW'){
            return (
                <View>
                    <Text style={{ fontFamily: 'Lato-Thin', fontSize: 12 }}>Date:</Text>
                    <View style={{ 
                        backgroundColor: color.primary, 
                        padding: 3, 
                        borderRadius: 3,
                        paddingHorizontal: 8
                    }}>
                        <Text style={{ 
                            fontFamily: 'Lato-Bold', 
                            fontSize: 11, 
                            color: color.white
                        }}>
                        {this.props.date}
                        </Text>
                    </View>
                </View>
            )
        }
    }
  render() {
      if (this.props.type === 'instant'){
        return (
            <TouchableOpacity 
            style={{ 
                backgroundColor: color.white, 
                height: 90, 
                borderRadius: 4,
                width: Dimensions.get('window').width - 42, 
                alignSelf: 'center',
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOpacity: 1.5,
                shadowOffset: { width: 0, height: 1.5 },
                elevation: 2,
                justifyContent: 'space-between',
                marginBottom: 11,
                padding: 8
            }}
            onPress={this.props.onPress}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontFamily: 'Lato-Regular', fontSize: 14 }}>{this.props.name}</Text>
                        <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12 }}>{this.props.category}</Text>
                    </View>
                    <Icon name="md-close" style={{ fontSize: 21, color: color.primary }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontFamily: 'Lato-Thin', fontSize: 12 }}>Issues:</Text>
                        <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12 }}>{this.props.issue}</Text>
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'Lato-Thin', fontSize: 12 }}>Status:</Text>
                        <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12 }}>{this.props.status}</Text>
                    </View>
                    <Text style={{ fontFamily: 'Lato-Thin', fontSize: 12 }}>N {this.props.price}</Text>
                </View>
            </TouchableOpacity>
        )
      } else if (this.props.type === 'scheduled'){
        return (
            <TouchableOpacity
            style={{ 
                backgroundColor: color.white, 
                height: 90, 
                borderRadius: 4,
                width: Dimensions.get('window').width - 42, 
                alignSelf: 'center',
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOpacity: 1.5,
                shadowOffset: { width: 0, height: 1.5 },
                elevation: 2,
                justifyContent: 'space-between',
                marginBottom: 11,
                padding: 8
            }}
            onPress={this.props.onPress}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontFamily: 'Lato-Regular', fontSize: 14 }}>{this.props.name}</Text>
                        <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12 }}>{this.props.category}</Text>
                    </View>
                    <Icon name="md-close" style={{ fontSize: 21, color: color.primary }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontFamily: 'Lato-Thin', fontSize: 12 }}>Issues:</Text>
                        <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12 }}>{this.props.issue}</Text>
                    </View>
                    {this.displayDate()}
                    <Text style={{ fontFamily: 'Lato-Thin', fontSize: 12 }}>N {this.props.price}</Text>
                </View>
            </TouchableOpacity>
        )
      }
  }
}
