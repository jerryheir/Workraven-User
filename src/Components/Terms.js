import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text
} from 'react-native';
import { CheckBox, Icon } from "native-base";
import ButtonAtom from '../Atoms/ButtonAtom';
import InputAtom from '../Atoms/InputAtom';
import { color } from '../Styles/Color';
import { BASE_URL } from '../config/api';
// import jwt_decode from "jwt-decode";
import { storeItem, retrieveItem } from '../Functions';
// import * as Keychain from 'react-native-keychain';
// import { WR_SECRET_CODE } from '../config/api';
// const CryptoJS = require("crypto-js");

class Terms extends Component {
  constructor(props) {
    super(props);
    this.error = new Animated.ValueXY({ x: 0, y: -100 });
  }
  async componentDidMount(){
    /*try {
      // Retreive the credentials
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log('Credentials successfully loaded for user ' + credentials.username + ' with password' + credentials.password);
        this.setState({ email: credentials.username, password: credentials.password })
      } else {
        console.log('No credentials stored')
      }
    } catch (error) {
      console.log('Keychain couldn\'t be accessed!', error);
    }*/
    const userId = await this.props.navigation.getParam('userId', '');
    const token = await this.props.navigation.getParam('token', '');
    await this.setState({ userId, token });
    fetch(`${BASE_URL}/v1/users/${userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-user-token': token
      }
    }).then((response) => response.json())
    .then((responseJson) => {
        let arr = []
        const name = responseJson.data.firstname;
        for(let i = 0; i < name.length ; i++){
          arr.push(i);
        }
        this.setState({ 
          firstname: responseJson.data.firstname, 
          animatedName: responseJson.data.firstname.toUpperCase(), 
          arr 
        }, ()=>console.log(this.state));
    })
    .catch((error) => {
        console.log(error);
    })
  }
state = {
  checked: false,
  code: '',
  email: '',
  password: '',
  userId: '',
  token: '',
  error: '',
  arr: [],
  firstname: '',
  animatedName: '',
  disabled: false
}

displayError = () =>{
  Animated.timing(
    this.error,
    {
      toValue: ({ x: 0, y: -500 }),
      duration: 2500,
      delay: 1000
    }
  ).start(()=>{
    this.setState({ error: '' });
    this.error.setValue({ x: 0, y: -100 })
  })
}

acceptTerms = () => {
  this.setState({ error: 'Please accept our Terms and Conditions' }, 
    ()=>{
        this.displayError()
  })
}

handleSubmit = () => {
  const { userId, token, code, firstname } = this.state;
  if (code.length !== 0 && code.length < 5) {
    this.setState({ error: 'Incorrect Referral Code' }, 
    ()=>{
        this.displayError()
    })
  } else {
    let obj;
    if (code.length === 5) {
      obj = {
        firstname,
        terms: 1,
        is_referral_invite: code
      }
    } else {
      obj = {
        firstname,
        terms: 1
      }
    }
    console.log(obj)
  fetch(`${BASE_URL}/v1/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-user-token': token
    },
    body: JSON.stringify(obj),
  }) .then((response) =>{ 
    console.log(response.json())
    return response.json()
  })
  .then((responseJson) => {
    console.log(responseJson)
    if (responseJson.status === 'success') {
      this.setState({ disabled: false })
      this.props.navigation.navigate('Welcome', { arr: this.state.arr, firstname: this.state.animatedName });
    } else {
      this.setState({ error: responseJson.message }, 
      ()=>{
        this.displayError()
      })
    }
  })
  .catch((error) => {
    console.log(error);
    this.setState({ error: 'Check your network connection and try again' }, 
        ()=>{
          this.displayError()
    })
  })
}
}
  render() {
    const { checked } = this.state
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
        <InputAtom
          onChangeText={code => this.setState({ code })}
          value={this.state.code}
          label="Referral Code"
          keyboardType="default"
          maxLength={5}
        />
        <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
            <CheckBox style={{marginRight: 8}} checked={checked} color={color.primary} onPress={()=> this.setState({ checked: !checked })} />
            <Text style={{ paddingLeft: 8, color: color.primary, fontSize: 10}}>Agree to the Terms and Conditions <Text style={{ padding: 8, fontSize: 12 }}>*</Text></Text>
        </View>
        <ButtonAtom
        style={styles.buttonContainer}
        onPress={this.state.checked ? this.handleSubmit : this.acceptTerms}
        text={'COMPLETE'}
        disabled={this.state.disabled}
        normal={true}
        />
      </View>
    );
  }
}

export default Terms;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    width: Dimensions.get('window').width - 42,
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
    height: 50
  }
});
