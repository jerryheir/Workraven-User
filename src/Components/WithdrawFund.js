import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native'
import { Label, Input, Item } from 'native-base';
import { color } from '../Styles/Color';
import SemiCircleAtom from '../Atoms/SemiCircleAtom';
import NotificationIconAtom from '../Atoms/NotificationIconAtom';
import InputAtom from '../Atoms/InputAtom';
import ButtonAtom from '../Atoms/ButtonAtom';

export default class WithdrawFund extends Component {
    state = {
        reason: '',
        amount: ''
    }
    
    makeRequest = () => {

    }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: color.white }}>
        <SemiCircleAtom />
        <TouchableOpacity style={{ 
          height: 32,
          width: 32,
          borderRadius: 16,
          backgroundColor: color.white,
          position: 'absolute',
          top: 32,
          right: 21,
          zIndex: 999,
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowOpacity: 1,
          shadowOffset: { width: 0, height: 1 },
          elevation: 3
        }}
        onPress={()=>this.props.navigation.navigate('Notification')}
        >
            <NotificationIconAtom />
        </TouchableOpacity>
        <SemiCircleAtom />
        <View style={{ width: 250 }}>
          <Text style={{
            fontSize: 24,
            fontFamily: 'Lato-Regular',
            paddingTop: 42,
            paddingLeft: 21,
            paddingBottom: 8
          }}>Withdraw Funds</Text>
          <Text style={{
            fontSize: 12,
            fontFamily: "Lato-Light",
            paddingLeft: 21
          }}>Make a request to access funds from the wallet</Text>
        </View>
        <View style={{ 
            height: 150, 
            justifyContent: 'space-between', 
            width: Dimensions.get('window').width - 42, 
            alignSelf: 'center',
            marginTop: 70
        }}>
            <InputAtom
            onChangeText={amount => this.setState({ amount })}
            value={this.state.amount}
            label={"Amount you want to withdraw"}
            itemStyle={{ height: 40 }}
            input={{ height: 40 }}
            maxLength={6}
            />
            <Item style={{ height: 100, marginBottom: 100 }} floatingLabel>
                <Label style={{ fontSize: 14, top: Platform.OS === 'ios' ? -5 : 5, color: '#696969' }}>
                Please state reason for  your request...
                </Label>
                <Input
                maxLength={100}
                multiline={true}
                rowSpan={2}
                onChangeText={(reason)=> this.setState({ reason })}
                value={this.state.reason}
                autoCapitalize="none"
                autoCorrect={false}
                style={[styles.input, { color: color.inputPurple }]}
                />
            </Item>
            <ButtonAtom
            style={styles.buttonContainer}
            onPress={this.makeRequest}
            text={'MAKE REQUEST'}
            normal={true}
            />
            <Text style={{
                textAlign: 'center', 
                padding: 8, 
                color: color.primary,
                fontSize: 12,
                fontFamily: 'Lato-Regular'
            }}>CANCEL</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    input: {
        height: Platform.OS === 'ios' ? 100 : 100,
        borderColor: '#c0c0c0',
        maxWidth: Dimensions.get("window").width - 64,
        color: color.inputPurple,
        textAlign: 'left',
        fontSize: 15,
        padding: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 10,
        marginLeft: 0,
        paddingLeft: 0,
        fontFamily: 'Lato-Regular'
    },
    buttonContainer: {
        backgroundColor: '#BE64FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#C190C7',
        borderRadius: 23,
        height: 46,
        width: Dimensions.get('window').width - 42,
        alignSelf: 'center',
        marginBottom: 8
    }
})
