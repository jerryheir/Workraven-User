import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Platform } from 'react-native';
import JobHeaderWrapper from "./JobHeaderWrapper";
import TimerAtom from '../Atoms/TimerAtom';

export default class Waiting extends Component {
    async componentDidMount(){
        const issue = await this.props.navigation.getParam('issue', 'Error Occurred!');
        const price = await this.props.navigation.getParam('price', 0 );
        this.setState({ issue, price });
    }

    state = {
        issue: '',
        price: 0
    }
  render() {
    return (
        <View style={styles.container}>
        <JobHeaderWrapper
        title={"Waiting"}
        indeterminate={true}
        >   
            <View style={styles.elevatedView}>
            <Text style={{ fontFamily: "Lato-Light", fontSize: 12, textAlign: 'center' }}>Issue</Text>
            <Text style={{ fontFamily: "HindGuntur-Bold", fontSize: 18, textAlign: 'center', fontWeight: '300', paddingBottom: 10 }}>{this.state.issue}</Text>
            <Text style={{ fontFamily: "Lato-Light", fontSize: 12, textAlign: 'center' }}>Amount</Text>
            <Text style={{ fontFamily: "HindGuntur-Bold", fontSize: 18, textAlign: 'center', fontWeight: '300', paddingBottom: 10 }}>{this.state.price}</Text>
                <TimerAtom 
                seconds={5}
                text={"Completed"}
                onPress={()=> this.props.navigation.navigate('Working')}
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
        margin: 21,
        marginTop: 0,
        borderRadius: 3
    }
})