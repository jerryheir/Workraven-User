import React, { Component } from 'react';
// import {connect} from 'react-redux';
import {
  TouchableOpacity,
  View,
  Text,
  Alert,
  StyleSheet,
  Dimensions,
  Platform,
  Image
} from 'react-native';
// import { signin } from '../actions/auth/auth.actions';
import Toast from 'react-native-easy-toast'
import ButtonAtom from '../Atoms/ButtonAtom';
import InputAtom from '../Atoms/InputAtom';
import { color } from '../Styles/Color';

class SignUpForm extends Component {
    state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      address: ''
    }

handleSubmit = () => {
  // const userData = this.state;
  const { email, password, firstname, lastname, address } = this.state;
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.length === 0 || password.length === 0 || firstname.length === 0 || lastname.length === 0 || address.length === 0) {
    return Alert.alert('All fields are required')
  } else if (reg.test(this.state.email) !== true || email.length < 8) {
    return Alert.alert('Please enter a correct email format')
  } else if(password.length < 7) {
    Alert.alert('Password length should not be less than 7')
  } else if (password.length === 0) {
    return Alert.alert('Password cannot be empty')
  } else {
    this.props.onPress(this.state);
  }
}
  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <View style={{ flexDirection: 'row', width: Dimensions.get('window').width - 64, justifyContent: 'space-between'}}>
        <InputAtom
          onChangeText={firstname => this.setState({ firstname })}
          value={this.state.firstname}
          label="First Name"
          keyboardType="default"
          style={{width: '40%'}}
        />
        <InputAtom
          onChangeText={lastname => this.setState({ lastname })}
          value={this.state.lastname}
          label="Last Name"
          keyboardType="default"
          style={{width: '44%'}}
        />
      </View>
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
        <InputAtom
          onChangeText={address => this.setState({ address })}
          value={this.state.address}
          label="Address"
          keyboardType="default"
        />
        <Toast ref="toast"/>
        <ButtonAtom
        style={styles.buttonContainer}
        onPress={this.handleSubmit}
        text={'SIGN UP'}
        normal={true}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 14 }}>
          <View>
            <Text style={{ fontSize: 12, textAlign: 'center', padding: 8, paddingBottom: 0, color: color.darkGray }}>OR</Text>
            <Text style={{ fontSize: 12, textAlign: 'center', color: color.darkGray  }}>Sign up with:</Text>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
              <TouchableOpacity style={styles.circle}>
                  <Image source={require('../assests/images/google_logo.png')} style={styles.image} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.circle}>
                  <Image source={require('../assests/images/facebook_logo.png')} style={styles.image} />
              </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default SignUpForm; // connect(null, {signin})(SignInForm);

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: Platform.OS === 'android' ? 10 : 0,
    width: Dimensions.get('window').width - 64,
    alignSelf: 'center'
  },
  circle: {
    height: 42,
    width: 42,
    borderRadius: 22,
    backgroundColor: color.lightGray,
    marginLeft: 6,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    backgroundColor: '#BE64FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C190C7',
    borderRadius: 25,
    height: 45
  },
  image: {
    height: 14,
    width: 14
  }
});
