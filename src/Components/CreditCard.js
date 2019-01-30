import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  Image
} from 'react-native';
import ButtonAtom from '../Atoms/ButtonAtom';
import InputAtom from '../Atoms/InputAtom';
import { color } from '../Styles/Color';
// import { storeItem, retrieveItem } from '../Functions';
import * as Keychain from 'react-native-keychain';
import { Icon } from 'native-base';
import RNPaystack from 'react-native-paystack';
import { PAYSTACK_PUBLIC_KEY, PAYSTACK_SECRET_KEY } from '../config/api';
// import { WR_SECRET_CODE } from '../config/api';
// const CryptoJS = require("crypto-js");

RNPaystack.init({ publicKey: PAYSTACK_PUBLIC_KEY });

class CreditCard extends Component {
    constructor(props) {
      super(props);
      this.error = new Animated.ValueXY({ x: 0, y: -100 });
    }

    async componentDidMount(){
      const state = this.props.navigation.getParam('state', {});
      const email = state.email;
      const firstname = state.firstname;
      const lastname = state.lastname;
      const password = state.password;
      // const address = state.address;
      await this.setState({ email, firstname, lastname, password });
    }

    state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      // address: '',
      cvc: '',
      cardNumber: '',
      disabled: false,
      date: '',
      error: '',
      reference_code: '',
      authorizationCode: '',
      buttonText: 'ADD A PAYMENT METHOD'
    }

    displayError = () =>{
      Animated.timing(
        this.error,
        {
          toValue: ({ x: 0, y: -400 }),
          duration: 2500,
          delay: 1000
        }
      ).start(()=>{
        this.setState({ error: '', disabled: false });
        this.error.setValue({ x: 0, y: -100 })
      })
    }

    handleSubmit = async () => {
      console.log(this.state.date.substring(0, 2))
      console.log(this.state.date.substring(3, 5))
        this.setState({ disabled: true })
        const { cvc, cardNumber, date, email } = this.state;
        if (cvc.length === 0 || cardNumber.length === 0 || date.length === 0) {
            this.setState({ error: 'Please enter all card details' }, 
            ()=>{
                this.displayError()
            })
        } else if (date.length < 5){
            this.setState({ error: 'Enter date correct format' }, 
            ()=>{
                this.displayError()
            })
        } else if (cvc.length < 3 || cardNumber.length < 13){
            this.setState({ error: 'Enter correct format' }, 
            ()=>{
                this.displayError()
            })
        } else {
            RNPaystack.chargeCard({
              cardNumber: this.state.cardNumber, 
              expiryMonth: this.state.date.substring(0, 2), 
              expiryYear: this.state.date.substring(3, 5), 
              cvc: this.state.cvc,
              email: email,
              amountInKobo: 5000
            })
            .then(response => {
              console.log(response); // do stuff with the token
              const reference = response.reference;
              fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`
              }
              }) .then((response) => response.json())
              .then((responseJson1) => {
                console.log(responseJson1);
                if (responseJson1.status === true && responseJson1.data.status === 'success'){
                  this.setState({ authorizationCode: responseJson1.data.authorization.authorization_code, reference_code: reference },
                    ()=>{
                      // let authCode = CryptoJS.AES.encrypt(this.state.authorizationCode, WR_SECRET_CODE);
                      // let ref = CryptoJS.AES.encrypt(reference, WR_SECRET_CODE);
                      // storeItem('authCode', authCode.toString());
                      // storeItem('reference', ref.toString());
                      fetch('https://api.paystack.co/refund', {
                        method: 'POST',
                        headers: {
                          'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          transaction: reference,
                          amount: 5000
                        }),
                      }) .then((response) => response.json())
                      .then((responseJson) => {
                        console.log(responseJson);
                        if (responseJson.status === true) {
                          console.log('Refund is being processed');
                          this.setState({ disabled: false })
                          this.props.navigation.navigate('Phone', { action: 'card', state: this.state });
                        } else {
                          this.setState({ error: responseJson.message }, 
                          ()=>{
                              this.displayError()
                          })
                        }
                      })
                      .catch((error) => {
                        this.setState({ error: 'Refund was not successfully!' }, 
                        ()=>{
                            this.displayError()
                        })
                      })
                    });
                } else {
                  this.setState({ error: 'Something went wrong.' }, 
                  ()=>{
                      this.displayError()
                  })
                }
              })
              .catch((error) => {
                console.log(error + 'Inner Error');
                this.setState({ error: 'An Internal Error occurred.' }, 
                  ()=>{
                      this.displayError()
                })
              })
            })
            .catch(error => {
              console.log(error.message);
              this.setState({ error: error.message }, 
              ()=>{
                  this.displayError()
              })
            })
        }
    }

    formattedDate = (text) => {
      if (text.length === 2 && this.state.date.length === 1) {
        text += '/'
      }
      this.setState({ date: text })
    }
    displayView = () => {
        return (
            <View style={{
                height: 200,
                paddingTop: 20,
                borderRadius: 2,
                backgroundColor: color.white
              }}
            >
                    <InputAtom
                    onChangeText={cardNumber => this.setState({ cardNumber })}
                    value={this.state.cardNumber}
                    label="Card Number"
                    keyboardType="numeric"
                    maxLength={20}
                    />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <InputAtom
                    onChangeText={this.formattedDate}
                    value={this.state.date}
                    label="E.g: 04/19"
                    keyboardType="numeric"
                    style={{ width: '46%'}}
                    maxLength={5}
                    />
                    <InputAtom
                    onChangeText={cvc => this.setState({ cvc })}
                    value={this.state.cvc}
                    label="CVV"
                    keyboardType="numeric"
                    style={{ width: '46%' }}
                    maxLength={3}
                    />
                    </View>
                    <Text 
                    style={{ fontSize: 14, textAlign: 'center', color: color.darkGray }}
                    >
                    We will deduct N50.00, to verify your card, but you will be refunded the amount.
                    </Text>
            </View>
        )
    }

  render() {
    return (
      <View style={styles.container}>
            {
              (this.state.error !== '') &&
              <Animated.View style={{ 
                backgroundColor: '#BE64FF', 
                alignItems: 'center',
                borderRadius: 3,
                flexDirection: 'row',
                position: 'absolute',
                right: this.error.x,
                top: this.error.y,
                zIndex: 999
              }}>
                <Text style={{ fontSize: 12, color: 'white', padding: 10 }}>{this.state.error}</Text>
                <Icon 
                name="md-close" 
                style={{ color: 'white', fontSize: 20, padding: 10 }} 
                onPress={()=>this.setState({ error: '', disabled: false })}
                />
              </Animated.View>
            }
      <View style={{ height: '18%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
        <Image 
        source={require('../assests/images/card.png')} 
        style={styles.image} 
        />
      </View>
      {
        this.displayView()
      }
        <ButtonAtom
        style={[styles.buttonContainer, { backgroundColor: "#BE64FF" }]}
        onPress={this.handleSubmit}
        text={this.state.buttonText}
        normal={true}
        />
        <Text 
        style={{ color: color.primary, fontSize: 14, fontFamily: 'Lato-Regular', textAlign: 'center', padding: 20 }}
        onPress={()=>{
          this.props.navigation.navigate('Phone', { action: 'skip', state: this.state });
        }}
        >
        SKIP
        </Text>
      </View>
    );
  }
}

export default CreditCard;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 47,
    width: Dimensions.get('window').width - 42,
    alignSelf: 'center'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#C190C7',
    borderRadius: 25,
    height: 50
  },
  image: {
    height: 130,
    width: 170,
    alignSelf: 'center'
  }
});
