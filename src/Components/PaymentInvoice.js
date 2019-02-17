import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { color } from '../Styles/Color';
import SemiCircleAtom from '../Atoms/SemiCircleAtom';
import NotificationIconAtom from '../Atoms/NotificationIconAtom';
import ButtonAtom from '../Atoms/ButtonAtom';

const LIST = [
    {
        key: '1',
        service: 'Transportation Fee',
        amount: 500
    },
    {
        key: '2',
        service: 'Service Charge',
        amount: 1500
    }
];

export default class PaymentInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  continuePayment = () => {
      console.log('Continue Payment clicked')
  }

  addUpAll = (array) => {
      let number = 0;
      for (let i = 0; i < array.length; i++) {
          number += array[i].amount;
      }
      return number;
  }

  render() {
      let wb = 0;
      let sum = this.addUpAll(LIST);
    return (
      <View style={{ flex: 1, backgroundColor: color.white }}>
        <SemiCircleAtom />
        <TouchableOpacity 
        style={{ 
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
        <View style={{ width: 250, flex: .2 }}>
          <Text style={{
            fontSize: 24,
            fontFamily: 'Lato-Regular',
            paddingTop: 42,
            paddingLeft: 21,
            paddingBottom: 8
          }}>Payment Invoice</Text>
          <Text style={{
            fontSize: 12,
            fontFamily: "Lato-Light",
            paddingLeft: 21
          }}>Please go through your invoice to verify this particular transaction</Text>
        </View>
        <View style={{ flex: .65, justifyContent: 'space-between', padding: 21 }}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, padding: 11 }}>
                    <Text style={{ fontFamily: 'Lato-Bold', fontSize: 14 }}>CHARGE DETAILS</Text>
                    <Text style={{ fontFamily: 'Lato-Bold', fontSize: 14 }}>AMOUNT</Text>
                </View>
                {
                    LIST.map((value, key)=>{
                        return (
                            <View key={key} style={styles.item}>
                                <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12 }}>{value.service}</Text>
                                <Text style={{ fontFamily: 'Lato-Bold', fontSize: 12 }}>N {value.amount}</Text>
                            </View>
                        )
                    })
                }
            </View>
            <View>
                <View style={styles.item}>
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12 }}>Available Wallet Balance</Text>
                    <Text style={{ fontFamily: 'Lato-Bold', fontSize: 12 }}>N {wb}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12 }}>Amount to be debited</Text>
                    <Text style={{ fontFamily: 'Lato-Bold', fontSize: 12 }}>N {sum - wb}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={{ fontFamily: 'Lato-Bold', fontSize: 14 }}>TOTAL</Text>
                    <Text style={{ fontFamily: 'Lato-Bold', fontSize: 14 }}>N {sum}</Text>
                </View>
            </View>
        </View>
        <View style={{ flex: .15, justifyContent: 'center' }}>
            <ButtonAtom
            style={styles.buttonContainer}
            onPress={this.continuePayment}
            text={'PROCEED'}
            normal={true}
            />
        </View>
      </View>
    );
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
    },
    item: {
      height: 46,
      width: Dimensions.get('window').width - 42,
      alignSelf: 'center',
      borderColor: '#696969',
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 11,
    }
});
