import React, { Component } from 'react';
// import {connect} from 'react-redux';
import jwt_decode from "jwt-decode";
import {
  View,
  Alert,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  AsyncStorage
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

    storeItem = async (key, item) => {
      try {
        const jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
          return jsonOfItem;
      } catch (error) {
        console.log(error.message);
      }
    }

    handleSubmit = () => {
      const { email, password }= this.state;
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
        console.log(this.state.email, this.state.password)
        fetch('https://progoapi.ml/v1/users/login?type=user', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
          }),
        }) .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.status !== 'success') {
            this.refs.toast.show('Wrong Email or Password')
          } else {
            const { token } = responseJson.data;
            const decoded = jwt_decode(token);
            this.storeItem('token', decoded);
            const type = decoded.type.name;
            const userId = decoded.id;
            this.storeItem('userId', userId);
            this.props.navigation.navigate('Tabs', { userId, type })
          }
        })
        .catch((error) => {
          console.log(error);
          this.refs.toast.show('Wrong Email or Password');
        })
      }
    }
  render() {
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
