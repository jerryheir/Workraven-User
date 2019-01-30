import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import SemiCircleAtom from '../Atoms/SemiCircleAtom';
import { color } from '../Styles/Color';
import { Icon } from 'native-base';

export default class ECommerceWrapper extends Component {
  render() {
    return (
      <View style={{ backgroundColor: '#FFF' }}>
        <View>
            <SemiCircleAtom color={"#E6E6FA"} />
            <View style={styles.topView}>
                <View>
                    {
                        this.props.goBack && <Icon 
                        name="ios-arrow-round-back" 
                        style={{ 
                            paddingTop: 20,
                            paddingLeft: 21,
                            paddingBottom: 0,
                            fontSize: 35
                        }}
                        onPress={()=>this.props.onPress()}
                        />
                    }
                    <Text style={this.props.goBack ? styles.titleOn : styles.titleOff}>{this.props.title}</Text>
                    {this.props.subtitle && <Text style={styles.subtitle}>{this.props.subtitle}</Text>}
                </View>
                <Icon
                name="ios-notifications-outline" 
                style={this.props.goBack ? styles.date : [styles.date, { paddingTop: 42 }]}
                />
            </View>
            
            <View style={styles.line} />
            <View style={{ width: 200 }}>
                <Text style={styles.description}>{this.props.description}</Text>
            </View>
        </View>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
    line: {
        width: Dimensions.get("window").width - 42,
        alignSelf: 'center',
        borderTopColor: "#c0c0c0",
        borderTopWidth: 1,
        marginTop: 8,
    },
    topView: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    titleOff: {
        fontSize: 24,
        fontFamily: 'Lato-Regular',
        paddingTop: 42,
        paddingLeft: 21,
        color: 'black',
        paddingBottom: 0
    },
    titleOn: {
        fontSize: 24,
        fontFamily: 'Lato-Regular',
        paddingLeft: 21,
        color: 'black',
        paddingBottom: 0
    },
    description: {
        fontSize: 10,
        fontFamily: "Lato-Regular",
        paddingLeft: 21,
        paddingTop: 8,
        color: '#828282'
    },
    subtitle: {
        fontSize: 12,
        fontFamily: "Lato-Light",
        paddingLeft: 21,
    },
    date: {
        fontSize: 24,
        fontFamily: 'Lato-Regular',
        paddingTop: 32,
        paddingRight: 21,
        fontStyle: 'italic',
        color: color.primary
    }
})
