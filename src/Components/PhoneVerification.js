import React, { Component } from 'react';
// import {connect} from 'react-redux';
import {
  View,
  Alert,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
// import { signin } from '../actions/auth/auth.actions';
import Toast from 'react-native-easy-toast'
import ButtonAtom from '../Atoms/ButtonAtom';
import InputAtom from '../Atoms/InputAtom';
import { color } from '../Styles/Color';
import { storeItem } from "../Functions";
import TinyWhiteButton from '../Atoms/TinyWhiteButton';
import { Icon } from 'native-base';

class TinyWhite extends React.PureComponent {
  render(){
      return (
          <TouchableOpacity
          style={[styles.skip, this.props.style]}
          onPress={this.props.onPress}
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
    state = {
      phone: '',
      otp: '',
      disabled: true,
      buttonText: 'SEND OTP TO PHONE',
      button: false,
      color: color.primary
    }

    callSubmit = () => {
      console.log('Call button was clicked...');
    }

    handleSubmit1 = () => {
      Alert.alert('Backend yet to implement it');
    }

handleSubmit = () => {
  const { navigation } = this.props;
  const state = navigation.getParam('state', '');
  console.log(state);
  const { phone } = this.state;
  if(phone.length === 0 || phone.length < 10){
        Alert.alert('Enter correct number format');
  }
  else {
    fetch('https://progoapi.tk/v1/users/signup?type=user', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'firstname': state.firstname,
            'lastname': state.lastname,
            'email': state.email,
            'password': state.password,
            'address': state.address,
            'phone': this.state.phone
          }),
        }) .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.status === "success"){
            this.setState({ disabled: false, buttonText: 'VERIFY MY OTP', button: true, color: '#C190C7' });
          } else {
            Alert.alert(responseJson.message)
          }
        })
        .catch((error) => {
          console.log(error);
          this.refs.toast.show('Wrong Email or Password');
        })
  }
}
sendOtp = () => {
  const { otp, phone } = this.state;
  const { navigation } = this.props;
  const state = navigation.getParam('state', '');
  if (otp.length === 0) {
    return Alert.alert('Enter the OTP you received!');
  } else if (otp.length < 5) {
    return Alert.alert('Please enter valid OTP');
  } else {
    fetch(`https://progoapi.tk/v1/users/${phone}/verify_otp`, {
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
            this.refs.toast.show('An error occurred!');
          } else {
            storeItem('phone', `${phone}`);
            storeItem('email', state.email);
            storeItem('password', state.password);
            storeItem('terms', false);
            this.props.navigation.navigate('CreditCard', { email: state.email, password: state.password });
          }
        })
        .catch((error) => {
          console.log(error);
          this.refs.toast.show('Incorrect OTP entered or Phone number input');
        })
  }
}
  render() {
    const { disabled, otp } = this.state;
    return (
      <View style={styles.container}>
      <View style={{ height: 120, width: 120, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 25 }}>        
      <Image 
        source={disabled || otp.length !== 5 ? require('../assests/phone.png') : require('../assests/phone2.png')} 
        style={styles.image} 
        />
      </View>
      <View>
        <InputAtom
          onChangeText={phone => this.setState({ phone })}
          value={this.state.phone}
          label="Phone Number"
          placeholder=""
          keyboardType="numeric"
          maxLength={11}
        />
        <InputAtom
          onChangeText={otp => this.setState({ otp, button: false, color: color.primary })}
          value={this.state.otp}
          label="OTP Here"
          style={this.state.disabled ? { backgroundColor: "#C0C0C0" } : {backgroundColor: color.white }}
          disabledItem={this.state.disabled}
          disabled={this.state.disabled}
          keyboardType="numeric"
          maxLength={5}
        />
      </View>
        <Toast ref="toast"/>
        <ButtonAtom
          style={[disabled ? styles.buttonContainer : styles.buttonContainerNew, {backgroundColor: !disabled && otp.length !== 5 ? '#C190C7' : '#BE64FF'}]}
          onPress={this.state.disabled ? this.handleSubmit : this.sendOtp}
          text={this.state.buttonText}
          disabled={this.state.button}
          normal={true}
        />
        {this.state.disabled === false && <View style={{flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center'}}>
        <TinyWhiteButton 
          text={'RESEND OTP'}
          style={{height: 40, width: 120, marginRight: 24 }}
          onPress={this.handleSubmit1}
        />
        <TinyWhite
          text={'CALL'}
          style={{height: 40, width: 120, marginLeft: 24 }}
          onPress={this.callSubmit}
        />
      </View>}
      </View>
    );
  }
}

export default PhoneVerification;

const styles = StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === 'ios' ? 50 : 10, // ios ? 70 : 20
    width: Dimensions.get('window').width - 64,
    alignSelf: 'center',
    backgroundColor: '#FFF',
    flex: 1
  },
  containerNew: {
    paddingBottom: Platform.OS === 'ios' ? 5 : 0, // ios ? 70 : 20
    width: Dimensions.get('window').width - 64,
    alignSelf: 'center',
    backgroundColor: '#FFF',
    flex: 1
  },
  buttonContainer: {
    backgroundColor: '#BE64FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 10 : 20,
    marginBottom: Platform.OS === 'ios' ? 10 : 27, // ios ? 0 : 17
    borderWidth: 1,
    borderColor: '#C190C7',
    borderRadius: 25,
    height: 50
  },
  buttonContainerNew: {
    backgroundColor: '#BE64FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 10 : 10,
    marginBottom: Platform.OS === 'ios' ? 10 : 10, // ios ? 0 : 17
    borderWidth: 1,
    borderColor: '#C190C7',
    borderRadius: 25,
    height: 50
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: 'center'
  },
  text: {
    color: color.primary,
    alignSelf: 'center'
  },
  skip: {
      backgroundColor: '#FFFFFF',
      height: 40,
      width: 90,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: '#C190C7',
      alignSelf: 'center',
      marginBottom: 15,
      shadowColor: 'rgba(0, 0, 0, 0.2)',
      shadowOpacity: 1,
      shadowOffset: { width: 0, height: 1 },
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
  }
});
