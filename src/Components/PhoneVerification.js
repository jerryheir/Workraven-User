import React, { Component } from 'react';
// import {connect} from 'react-redux';
import {
  View,
  Alert,
  StyleSheet,
  Dimensions,
  Image,
  KeyboardAvoidingView
} from 'react-native';
// import { signin } from '../actions/auth/auth.actions';
import Toast from 'react-native-easy-toast'
import ButtonAtom from '../Atoms/ButtonAtom';
import InputAtom from '../Atoms/InputAtom';

class PhoneVerification extends Component {
    state = {
      phone: '',
      otp: '',
      disabled: true,
      buttonText: 'SEND VERIFICATION NUMBER'
    }

handleSubmit = () => {
  const { navigation } = this.props;
  const state = navigation.getParam('state', '');
  console.log(state);
  const { phone } = this.state;
  let num = phone.replace(".", '');
  if(isNaN(num) || phone.length === 0 || phone.length < 10){
        Alert.alert('Enter correct number format');
  }
  else {
    fetch('http://progoapi.ml/v1/users/signup?type=user', {
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
            this.setState({ disabled: false, buttonText: 'VERIFY' });
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
  } else if (otp.length <= 5) {
    return Alert.alert('Please enter valid OTP');
  } else {
    fetch(`http://progoapi.ml/v1/users/${phone}/verify_otp`, {
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
            this.refs.toast.show('An error occurred!')
          } else {
            this.props.navigation.navigate('CreditCard', { email: state.email, password: state.password });
          }
        })
        .catch((error) => {
          console.log(error);
          this.refs.toast.show('Incorrect OTP entered');
        })
  }
}
  render() {
    const { disabled, otp } = this.state;
    return (
      <View style={styles.container}>
      <View style={{ height: 240, width: 240, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
        <Image 
        source={disabled || otp.length !== 7 ? require('../assests/phone.png') : require('../assests/phone2.png')} 
        style={styles.image} 
        />
      </View>
      <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      behavior="padding"
      >
        <InputAtom
          onChangeText={phone => this.setState({ phone })}
          value={this.state.phone}
          label="Phone Number"
          placeholder="000-0000-000"
          keyboardType="numeric"
          maxLength={11}
        />
        <InputAtom
          onChangeText={otp => this.setState({ otp })}
          value={this.state.otp}
          label="Verification Number"
          disabledItem={this.state.disabled}
          disabled={this.state.disabled}
          maxLength={7}
        />
      </KeyboardAvoidingView>
        <Toast ref="toast"/>
        <ButtonAtom
        style={styles.buttonContainer}
        onPress={this.state.disabled ? this.handleSubmit : this.sendOtp}
        text={this.state.buttonText}
        normal={true}
        />
      </View>
    );
  }
}

export default PhoneVerification; // connect(null, {signin})(SignInForm);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    width: Dimensions.get('window').width - 64,
    alignSelf: 'center'
  },
  buttonContainer: {
    backgroundColor: '#BE64FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#C190C7',
    borderRadius: 25,
    height: 50
  },
  image: {
    height: 127,
    width: 127,
    alignSelf: 'center'
  }
});
