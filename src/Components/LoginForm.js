import React, { Component } from 'react';
// import {connect} from 'react-redux';
import {
  View,
  Alert,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
// import { signin } from '../actions/auth/auth.actions';
import Toast from 'react-native-easy-toast'
import ButtonAtom from '../Atoms/ButtonAtom';
import InputAtom from '../Atoms/InputAtom';

class LoginForm extends Component {
    state = {
      email: '',
      password: ''
    }

handleSubmit = () => {
  // const userData = this.state;
  const {email, password }= this.state;
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.length === 0 || password.length === 0) {
    return Alert.alert('Please fill all fields')
  } else if (reg.test(this.state.email) !== true || email.length < 8) {
    return Alert.alert('Please enter a correct email format')
  } else if(password.length < 7) {
    Alert.alert('Password length should not be less than 7')
  } else if (password.length === 0) {
    return Alert.alert('Password cannot be empty')
  } else {
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
    // const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView         
      keyboardVerticalOffset={50}
      behavior="padding"
      style={styles.container}
      >
        <InputAtom
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          label="Email"
          keyboardType="email-address"
        />
        <InputAtom
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          label="Password"
          secureTextEntry={true}
        />
        <Toast ref="toast"/>
        <ButtonAtom
        style={styles.buttonContainer}
        onPress={this.handleSubmit}
        text={'LOGIN'}
        normal={true}
        />
      </KeyboardAvoidingView>
    );
  }
}

export default LoginForm; // connect(null, {signin})(SignInForm);

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    width: Dimensions.get('window').width - 64,
    alignSelf: 'center'
  },
  buttonContainer: {
    backgroundColor: '#BE64FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#C190C7',
    borderRadius: 25,
    height: 37
  }
});
