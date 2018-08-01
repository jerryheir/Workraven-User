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
      buttonText: 'Send Verification Number'
    }

handleSubmit = () => {
  const { phone } = this.state;
  if (phone.length === 0) {
    return Alert.alert('Please input your Number')
  } else {
    this.setState({ disabled: false, buttonText: 'Verify' })
  /*this.props.signin(userData)
  .then(()=> {
    // this.props.navigation.navigate('HomeDashboard')
  }).catch(error => {
      // Alert.alert(error.response.data.message, 'This user does not exist')
      this.refs.toast.show('Wrong Email or Password!')
    })*/
  }
}
sendOtp = () => {
  const { otp } = this.state;
  if (otp.length === 0) {
    return Alert.alert('Enter the OTP you received!')
  } else if (otp.length < 7) {
    return Alert.alert('Please enter correct OTP')
  } else {
    this.props.navigation.navigate('CreditCard');
  /*this.props.signin(userData)
  .then(()=> {
    // this.props.navigation.navigate('HomeDashboard')
  }).catch(error => {
      // Alert.alert(error.response.data.message, 'This user does not exist')
      this.refs.toast.show('Wrong Email or Password!')
    })*/
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
          maxLength={10}
        />
        <InputAtom
          onChangeText={otp => this.setState({ otp })}
          value={this.state.otp}
          label="Verification Number"
          secureTextEntry={true}
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
    height: 37
  },
  image: {
    height: 127,
    width: 127,
    alignSelf: 'center'
  }
});
