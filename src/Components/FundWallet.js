import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import SemiCircleAtom from '../Atoms/SemiCircleAtom';
import InputAtom from '../Atoms/InputAtom';
import PickerAtom from '../Atoms/PickerAtom';
import ButtonAtom from '../Atoms/ButtonAtom';
import NotificationIconAtom from '../Atoms/NotificationIconAtom';
import { CheckBox } from 'native-base';
import { color } from '../Styles/Color';

const ITEMS = [ "**** **** 0597", "Use Promo code" ]

export default class FundWallet extends Component {
    componentDidMount() {
        
    }
    state = {
        reason: "**** **** 0597"
    }

    onValueChangeFirst = (reason) => {
        this.setState({ reason });
    }

    usePromoCode = () => {
        console.log('Using promo code')
    }

    fundWallet = () => {
        console.log('fund the wallet')
    }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
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
          }}>Fund Wallet</Text>
          <Text style={{
            fontSize: 12,
            fontFamily: "Lato-Light",
            paddingLeft: 21
          }}>Go ahead and fund your wallet</Text>
        </View>
        <View style={{ width: Dimensions.get('window').width - 42, alignSelf: 'center', marginTop: 100 }}>
           <InputAtom
            onChangeText={amount => this.setState({ amount })}
            value={this.state.amount}
            label={this.state.reason === "Use Promo code" ? "Enter Promo Code" : "Enter Amount"}
            keyboardType={"numeric"}
            itemStyle={{ height: 40 }}
            input={{ height: 40 }}
            maxLength={6}
          />
        <View style={{ 
            width: Dimensions.get('window').width - 42,
            alignSelf: 'center',
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            height: 50,
            paddingHorizontal: 11,
            marginHorizontal: 21,
            borderColor: '#F2F2F2',
            borderWidth: 1
        }}>
            <Text>{this.state.reason}</Text>
            <CheckBox 
            style={{ marginRight: 8 }} 
            checked={true} 
            color={color.primary} 
            />
        </View>
        <PickerAtom
        selectedValue={this.state.reason}
        list={ITEMS}
        placeholder="Use other options..."
        viewStyle={{ 
            width: Dimensions.get('window').width - 42, 
            marginBottom: 25, 
            alignSelf: 'center',
            paddingLeft: 11
        }}
        onValueChange={this.onValueChangeFirst}
        />
        </View>
        <ButtonAtom
          style={styles.buttonContainer}
          onPress={this.state.reason === "Use Promo code" ? this.usePromoCode : this.fundWallet}
          text={'ADD FUNDS'}
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
    )
  }
}

const styles = StyleSheet.create({
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
});
