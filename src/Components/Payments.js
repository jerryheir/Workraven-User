import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import SemiCircleAtom from '../Atoms/SemiCircleAtom';
import NotificationIconAtom from '../Atoms/NotificationIconAtom';
import { Icon } from 'native-base';
import { color } from '../Styles/Color';
import ButtonAtom from '../Atoms/ButtonAtom';

export default class Payments extends Component {
  state = {
    data: [
      {
        key: '1',
        amount: 5000,
        description: 'Transportation Fee',
        date: '04-02-2019',
        type: 'owing'
      },
      {
        key: '2',
        amount: 1500,
        description: 'Service Charge',
        date: '02-02-2019',
        type: 'credit'
      },
      {
        key: '3',
        amount: 500,
        description: 'E-Commerce Charge',
        date: '28-01-2019',
        type: 'credit'
      }
    ]
  }

  fundWallet = () => {
    console.log('Fund Wallet Clicked')
  }

  renderItem = ({ item }) => {
    return (
      <View style={{ 
        flex: 1,
        flexDirection: 'row',
        width: Dimensions.get('window').width - 42,
        height: 55,
        alignItems: 'center',
        borderBottomWidth: .5,
        borderBottomColor: '#828282',
        alignSelf: 'center',
        paddingHorizontal: 8
      }}>
        <View style={{ flex: .5, }}>
          <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12 }}>{item.type === 'credit' ? 'Credit' : 'Debit'}</Text>
          <Text style={{ fontFamily: 'Lato-Thin', fontSize: 12 }}>{item.description}</Text>
        </View>
        <View style={{ flex: .5, }}>
          <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, textAlign: 'right' }}>N {item.amount}</Text>
          <Text style={{ fontFamily: 'Lato-Thin', fontSize: 12, textAlign: 'right' }}>{item.date}</Text>
        </View>
      </View>
    )
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
          }}>Payments</Text>
          <Text style={{
            fontSize: 12,
            fontFamily: "Lato-Light",
            paddingLeft: 21
          }}>Our wallet helps you track your current earnings...</Text>
        </View>
        <View style={{ 
            borderRadius: 4, 
            alignSelf: 'center', 
            width: Dimensions.get('window').width - 42, 
            backgroundColor: color.primary, 
            padding: 21, 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            marginVertical: 50,
            marginBottom: 0,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowOpacity: 1.5,
            shadowOffset: { width: 0, height: 1.5 },
            elevation: 3
        }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: "Lato-Regular", fontSize: 18, color: color.white }}>WALLET BALANCE</Text>
            </View>
            <Text style={{ color: color.white, fontFamily: "Lato-Thin", fontSize: 30 }}>N2,000</Text>
        </View>
        <Text 
        style={{ color: '#828282', textAlign: 'center', padding: 21 }}
        >
        TRANSACTION HISTORY
        </Text>
        <View style={{ 
          width: Dimensions.get('window').width - 42, 
          borderBottomColor: '#828282', 
          borderBottomWidth: 1,
          alignSelf: 'center'
        }} />
        <FlatList 
        data={this.state.data}
        renderItem={this.renderItem}
        />
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 21 }}>
          <ButtonAtom
          style={styles.buttonContainer}
          onPress={this.fundWallet}
          text={'FUND WALLET'}
          normal={true}
          disabled={true}
          />
          <Text style={{ textAlign: 'center', fontFamily: 'Lato-Regular', fontSize: 12 }}>REQUEST FOR WITHDRAW</Text>
        </View>
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
    marginBottom: 8
  }
});
