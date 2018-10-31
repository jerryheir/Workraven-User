import React, { Component } from 'react';
// import {connect} from 'react-redux';
import {
  View,
  Alert,
  StyleSheet,
  Dimensions
} from 'react-native';
// import { signin } from '../actions/auth/auth.actions';
import Toast from 'react-native-easy-toast';
import ButtonAtom from '../Atoms/ButtonAtom';
import InputAtom from '../Atoms/InputAtom';

class ResetForm extends Component {
    state = {
      password: '',
      rePassword: ''
    }

handleSubmit = () => {
  // const userData = this.state;
  const { password, rePassword }= this.state;
  if (password !== rePassword) {
    return Alert.alert('Passwords do not match')
  }else if(password.length < 7) {
    Alert.alert('Password length should not be less than 7')
  } else if (password.length === 0 || rePassword.length === 0) {
    return Alert.alert('Password cannot be empty')
  } else {
    this.props.onPress()
  /*this.props.signin(userData)
  .then(()=> {
    // this.props.navigation.navigate('HomeDashboard')
  }).catch(error => {
      // Alert.alert(error.response.data.message, 'This user does not exist')
      Alert.alert('An error just occured. Please try again later')
    })*/
  }
}
  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View
      style={styles.container}>
        <InputAtom
          onChangeText={password => this.setState({ password })}
          value={this.state.email}
          label="Password"
          secureTextEntry={true}
        />
        <InputAtom
          onChangeText={rePassword => this.setState({ rePassword })}
          value={this.state.password}
          label="Reenter-Password"
          secureTextEntry={true}
        />
        <Toast ref="toast"/>
        <ButtonAtom
        style={styles.buttonContainer}
        onPress={this.handleSubmit}
        text={'UPDATE'}
        normal={true}
        />
      </View>
    );
  }
}

export default ResetForm;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    width: Dimensions.get('window').width - 64,
    alignSelf: 'center'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BE64FF',
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#C190C7',
    borderRadius: 25,
    height: 50,
    marginBottom: 60
  }
});
