import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Platform } from 'react-native'
import JobHeaderWrapper from './JobHeaderWrapper';
import TimerAtom from '../Atoms/TimerAtom';

export default class Investigation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <JobHeaderWrapper
        indeterminate={true}
        navigation={this.props.navigation}
        title={"Investigation"}
        subtitle={"Investigation issue"}
        >
            
            <View style={styles.elevatedView}>
            <Text style={{ fontFamily: "HindGuntur-Bold", fontSize: 24 }}>Investigating</Text>
            <Text style={{ fontFamily: "Lato-Regular", fontSize: 10, fontWeight: '300', paddingBottom: 10 }}>Please Wait...</Text>
                <TimerAtom 
                seconds={5}
                text={"Completed"}
                onPress={()=>this.props.navigation.navigate('Quote')}
                />
            </View>
        </JobHeaderWrapper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    elevatedView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Platform.OS === 'ios' ? 420 : 380,
        backgroundColor: '#FFF',
        width: Dimensions.get("window").width - 42,
        alignSelf: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 3,
        shadowOffset: { width: 5, height: 3 },
        elevation: 5,
        marginHorizontal: 21,
        borderRadius: 3
    }
})
