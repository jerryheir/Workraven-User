import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'


    // {/*<View style={[styles.semiCircle, { backgroundColor: this.props.color }]} />*/}
export default class SemiCircleAtom extends PureComponent {
  render() {
    return (
    <Image
    source={require('../assests/images/new_ellipse.png')}
    style={{
        position: 'absolute',
        height: 220,
        width: 220,
        top: -50,
        left: 0
    }}
    resizeMode="contain"
    />
    )
  }
}

const styles = StyleSheet.create({
    semiCircle: {
        height: 380,
        width: 380,
        borderRadius: 190,
        position: 'absolute',
        left: -180,
        top: -240,
        backgroundColor: "#E6E6FA",
    }
})