import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  Platform,
  Text,
  TouchableOpacity
} from 'react-native';
import ButtonAtom from '../Atoms/ButtonAtom';
import InputAtom from '../Atoms/InputAtom';
import { color } from '../Styles/Color';
import { storeItem } from "../Functions";
import TinyWhiteButton from '../Atoms/TinyWhiteButton';
import { Icon } from 'native-base';
import * as Keychain from 'react-native-keychain';
import jwt_decode from "jwt-decode";
import { WR_SECRET_CODE, BASE_URL } from '../config/api';
const CryptoJS = require("crypto-js");

class TinyWhite extends React.PureComponent {
  state = {
    disabled: false
  }
  render(){
      return (
          <TouchableOpacity
          style={[styles.skip, this.props.style]}
          disabled={this.state.disabled}
          onPress={()=>{
            this.props.onPress()
            this.setState({ disabled: true })
          }}
          >
              <Icon name={Platform.OS === 'ios' ? "ios-call" : "md-call"} 
              style={{ color: color.primary, fontSize: 18, marginRight: 10 }}
              />
              <Text style={styles.text}>{this.props.text}</Text>
          </TouchableOpacity>
      )
  }
}

class PhoneVerification extends Component {
  constructor(props) {
    super(props);
    this.error = new Animated.ValueXY({ x: 0, y: -100 });
  }
    state = {
      phone: '+234',
      otp: '',
      disabled: true,
      buttonText: 'SEND OTP TO PHONE',
      button: false,
      color: color.primary,
      error: ''
    }

    phoneFormat = (phone) => {
      switch(true){
        case (phone === '+23408' && this.state.phone === '+2340'):
          this.setState({ phone: '+2348' })
          break;
        case (phone === '+23407' && this.state.phone === '+2340'):
          this.setState({ phone: '+2347' })
          break;
        case (phone === '+23409' && this.state.phone === '+2340'):
          this.setState({ phone: '+2349' })
          break;
        case (this.state.phone === '+23401' || this.state.phone === '+23402' || this.state.phone === '+23403' || this.state.phone === '+23404' || this.state.phone === '+23405' || this.state.phone === '+23406' || this.state.phone === '+23400'):
          this.setState({ phone: '+234' })
          break;
        case (this.state.phone.charAt(0) !== '+' || this.state.phone.charAt(1) !== '2' || this.state.phone.charAt(2) !== '3' || this.state.phone.charAt(3) !== '4'):
          this.setState({ phone: '+234' })
          break;
        default:
          this.setState({ phone })
          break;
      }
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
        this.setState({ error: '' });
        this.error.setValue({ x: 0, y: -100 })
      })
    }

callSubmit = () => {
  console.log('Call button was clicked...');
  fetch(`${BASE_URL}/v1/users/call_with_otp`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'phone': this.state.phone
    }),
  }) .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    if (responseJson.status === "success"){
      this.setState({ disabled: false, buttonText: 'VERIFY MY OTP', button: true, color: '#C190C7' });
    } else {
      this.setState({ error: responseJson.message }, 
      ()=>{
          this.displayError()
      })
    }
  })
  .catch((error) => {
    console.log(error);
    this.setState({ error: 'An Error occurred' }, 
    ()=>{
        this.displayError()
    })
  })
}

handleSubmit1 = () => {
  const { phone } = this.state;
  if(phone.length === 0 || phone.length < 14){
        this.setState({ error: 'Enter correct number format' }, 
          ()=>{
              this.displayError()
          })
  } else {
    fetch(`${BASE_URL}/v1/users/resend_otp`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'phone': this.state.phone
          }),
        }) .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.status === "success"){
            this.setState({ disabled: false, buttonText: 'VERIFY MY OTP', button: true, color: '#C190C7' });
          } else {
            this.setState({ error: responseJson.message }, 
            ()=>{
              this.displayError()
            })
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ error: 'An Error occured' }, 
          ()=>{
              this.displayError()
          })
        })
  }
}

handleSubmit = async () => {
  const { navigation } = this.props;
  const state = await navigation.getParam('state', '');
  const action = await navigation.getParam('action', '');
  let obj = action === 'skip' ? {
    'firstname': state.firstname,
    'lastname': state.lastname,
    'email': state.email,
    'password': state.password,
    'address': 'From Lagos Nigeria',
    'phone': this.state.phone
  } : {
    'firstname': state.firstname,
    'lastname': state.lastname,
    'email': state.email,
    'password': state.password,
    'address': 'From Lagos Nigeria',
    'auth_token': state.authorizationCode,
    'reference_code': state.reference_code,
    'phone': this.state.phone
  };
  console.log(obj);
  const { phone } = this.state;
  if(phone.length === 0 || phone.length < 14){
        this.setState({ error: 'Enter correct number format' }, 
          ()=>{
              this.displayError()
        })
  }
  else {
    fetch(`${BASE_URL}/v1/users/signup?type=user`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(obj),
        }) .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.status === "success"){
            this.setState({ disabled: false, buttonText: 'VERIFY MY OTP', button: true, color: '#C190C7' });
          } else {
            this.setState({ error: responseJson.message }, 
            ()=>{
                this.displayError()
            })
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ error: 'An Error occurred' }, 
          ()=>{
              this.displayError()
          })
        })
  }
}
sendOtp = async () => {
  const { otp, phone } = this.state;
  const { navigation } = this.props;
  const state = await navigation.getParam('state', '');
  const action = await navigation.getParam('action', '');
  if (otp.length === 0) {
    this.setState({ error: 'Enter the OTP you received!' }, 
    ()=>{
        this.displayError()
    })
  } else if (otp.length < 5) {
    this.setState({ error: 'Please enter valid OTP' }, 
    ()=>{
        this.displayError()
    })
  } else {
    fetch(`${BASE_URL}/v1/users/${phone}/verify_otp`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'otp': this.state.otp
          }),
        }) .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.status !== 'success') {
            this.setState({ error: 'Incorrect OTP entered or Phone number input' }, 
            ()=>{
                this.displayError()
            })
          } else {
            let stage = CryptoJS.AES.encrypt('1', WR_SECRET_CODE); // 1 is phone verification passed
            storeItem('stage', stage.toString())
            storeItem(this.state.email+'terms', false);
            const username = state.email;
            const password = state.password;
            fetch(`${BASE_URL}/v1/users/login?type=user`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: username,
                password: password
              }),
            }) .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson.status)
              if (responseJson.status === "success") {
                console.log('I ran. WTF')
                  const token = responseJson.data.token;
                  const decoded = jwt_decode(token);
                  // let mainToken = CryptoJS.AES.encrypt(token, WR_SECRET_CODE);
                  // let uId = CryptoJS.AES.encrypt(decoded.id, WR_SECRET_CODE);
                  // let stage = CryptoJS.AES.encrypt('2', WR_SECRET_CODE);
                  storeItem('terms', true);
                  // storeItem('token', mainToken.toString());
                  // storeItem('uId', uId.toString());
                  // storeItem('stage', stage.toString());
                  const userId = decoded.id;
                  let obj = {
                    token: token,
                    userId: userId
                  }
                  let password = JSON.stringify(obj);
                  Keychain.setGenericPassword(username, password);
                  storeItem('newUser', true);
                  navigation.navigate('Terms', { action: action, userId, token, param: "NEW_USER" });
             }
             else if (responseJson.status !== "success") {
                this.setState({ error: 'An error occurred... Try again later' }, 
                ()=>{
                    this.displayError()
                })
              } 
            })
            .catch((error) => {
              this.setState({ error: 'An error occurred... Try again later' }, 
              ()=>{
                  this.displayError()
              })
            })
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ error: 'An Error occurred' }, 
          ()=>{
              this.displayError()
          })
        })
  }
}
  render() {
    const { disabled, otp } = this.state;
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
      <View>
            <View style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 10 }}>        
              <Image 
              source={disabled || otp.length !== 5 ? require('../assests/phone.png') : require('../assests/phone2.png')} 
              style={styles.image} 
              />
            </View>
          <View>
            <InputAtom
              onChangeText={this.phoneFormat}
              value={this.state.phone}
              label="Phone Number"
              labelIcon={true}
              top={-3}
              keyboardType="numeric"
              maxLength={14}
              itemStyle={{ height: 50 }}
              input={{ height: 40 }}
            />
            <InputAtom
              onChangeText={otp => this.setState({ otp, button: false, color: color.primary })}
              value={this.state.otp}
              label="OTP Here"
              style={this.state.disabled ? { backgroundColor: "#C0C0C0" } : { backgroundColor: color.white }}
              disabledItem={this.state.disabled}
              disabled={this.state.disabled}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
      </View>
      <View style={{ }}>
        <ButtonAtom
          style={[disabled ? styles.buttonContainer : styles.buttonContainerNew, {backgroundColor: !disabled && otp.length !== 5 ? '#C190C7' : '#BE64FF'}]}
          onPress={this.state.disabled ? this.handleSubmit : this.sendOtp}
          text={this.state.buttonText}
          disabled={this.state.button}
          normal={true}
        />
        {!this.state.disabled && <View style={{flexDirection: 'row', width: Dimensions.get('window').width - 42, justifyContent: 'space-between', alignSelf: 'center', marginTop: 10 }}>
        <TinyWhiteButton 
          text={'RESEND OTP'}
          textStyle={{ fontSize: 12, fontFamily: 'Lato-Regular', }}
          style={{height: 30, width: Platform.OS === 'ios' ? 160 : 150, marginBottom: 0 }}
          onPress={this.handleSubmit1}
        />
        <TinyWhite
          text={'USE CALL'}
          style={{height: 30, width: Platform.OS === 'ios' ? 160 : 150 }}
          onPress={this.callSubmit}
        />
      </View>}
      </View>
      </View>
    );
  }
}

export default PhoneVerification;

const styles = StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
    width: Dimensions.get('window').width - 42,
    alignSelf: 'center',
    backgroundColor: '#FFF',
    flex: 1
  },
  buttonContainer: {
    backgroundColor: '#BE64FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : 0,
    marginBottom: Platform.OS === 'ios' ? 0 : 0, // ios ? 0 : 17
    borderWidth: 1,
    borderColor: '#C190C7',
    borderRadius: Platform.OS === 'ios' ? 23 : 21,
    height: Platform.OS === 'ios' ? 46 : 42
  },
  buttonContainerNew: {
    backgroundColor: '#BE64FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : 0,
    marginBottom: Platform.OS === 'ios' ? 0 : 0, // ios ? 0 : 17
    borderWidth: 1,
    borderColor: '#C190C7',
    borderRadius: Platform.OS === 'ios' ? 23 : 21,
    height: Platform.OS === 'ios' ?46 : 42
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: 'center'
  },
  text: {
    color: color.primary,
    alignSelf: 'center',
    fontSize: 12,
    fontFamily: 'Lato-Regular'
  },
  skip: {
      backgroundColor: '#FFFFFF',
      height: 40,
      width: 90,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: '#C190C7',
      alignSelf: 'center',
      shadowColor: 'rgba(0, 0, 0, 0.2)',
      shadowOpacity: 1,
      shadowOffset: { width: 0, height: 1 },
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
  }
});
