import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Animated
} from 'react-native';
import { Icon } from "native-base";
import ButtonAtom from '../Atoms/ButtonAtom';
import InputAtom from '../Atoms/InputAtom';
import { BASE_URL } from '../config/api';
import * as Keychain from 'react-native-keychain';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.error = new Animated.ValueXY({ x: 0, y: -100 });
  }
    state = {
      email: '',
      password: '',
      error: '',
      disabled: false
    }

    displayError = () => {
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

    handleSubmit = () => {
      this.setState({ disabled: true })
      const { email, password }= this.state;
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email.length === 0 || password.length === 0) {
        this.setState({ error: 'Please fill all fields' }, 
        ()=>{
          this.displayError()
        })
      } else if (email.length < 8) {
        this.setState({ error: 'Please enter a correct email format' }, 
        ()=>{
          this.displayError()
        })
      } else if(password.length < 7) {
        this.setState({ error: 'Incorrect details. Please try again later.' }, 
        ()=>{
          this.displayError()
        })
      } else {
        fetch(`${BASE_URL}/v1/users/login?type=user`, {
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
            this.setState({ error: 'Unsuccessful. Please try again later' }, 
            ()=>{
              this.displayError()
            })
          } else {
            let username = this.state.email;
            const { token } = responseJson.data;
            const decoded = jwt_decode(token);
            const userId = decoded.id;
            let obj = {
              token: token,
              userId: userId
            }
            let password = JSON.stringify(obj);
            Keychain.setGenericPassword(username, password).then(()=>{
              this.props.navigation.navigate('Tabs');
            })
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ error: 'An error occurred. Please try again'}, 
          ()=>{
            this.displayError()
          })
        })
      }
    }
  render() {
    return (
      <View         
      style={styles.container}
      >
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
          <InputAtom
            onChangeText={email => this.setState({ email: email.trim() })}
            value={this.state.email}
            label="Email or Phone"
            keyboardType="email-address"
            itemStyle={{ height: 50 }}
            input={{ height: 40 }}
            maxLength={40}
          />
          <InputAtom
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            label="Password"
            secureTextEntry={true}
            icon={true}
            itemStyle={{ height: 50 }}
            input={{ height: 40 }}
            maxLength={20}
          />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <ButtonAtom
          style={styles.buttonContainer}
          onPress={this.handleSubmit}
          text={'LOGIN'}
          normal={true}
          disabled={this.state.disabled}
          />
        </View>
      </View>
    );
  }
}

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    width: Dimensions.get('window').width - 42,
    alignSelf: 'center'
  },
  buttonContainer: {
    backgroundColor: '#BE64FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C190C7',
    borderRadius: 23,
    height: 46
  }
});
