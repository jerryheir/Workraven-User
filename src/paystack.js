import React, { Component } from 'react';
import { PushNotificationIOS, View, Text, AlertIOS, Alert, TouchableOpacity, TextInput } from 'react-native';
import Analytics from '@aws-amplify/analytics';
// import PushNotification from '@aws-amplify/pushnotification';
import awsmobile from './aws-exports';
import Amplify/*, { Analytics }*/ from 'aws-amplify';
import RNPaystack from 'react-native-paystack';

const amplifyConfig = {
  Auth: {
    identityPoolId: 'us-east-1:18b73d66-6d34-4b4a-b67c-01d748b44a87',
    region: 'us-east-1'
  }
}
//Initialize Amplify
Amplify.configure(amplifyConfig);
RNPaystack.init({ publicKey: 'pk_test_e0b7d82594ffc1844c35f4b5b19cee9eb1a079b4' });

const analyticsConfig = {
  AWSPinpoint: {
        // Amazon Pinpoint App Client ID
        appId: 'b440e545049d41e780d6c5e6a74a7663',
        // Amazon service region
        region: 'us-east-1',
        mandatorySignIn: false,
  }
}

// PushNotification need to work with Analytics
Analytics.configure(awsmobile);
// PushNotification.configure(awsmobile);

export default class App extends React.Component {
  /*componentDidMount() {
    PushNotification.onNotification((notification) => {
      AlertIOS.alert('in app notification', notification);
      // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    });
  
    // gets the registration token
    PushNotification.onRegister((token) => {
      AlertIOS.alert('in app registration', token);
    });
  }*/
  state = {
    amount: 0,
    email: '',
    card: '',
    ccv: '',
    month: '',
    year: '',
    status: '',
    intialize: true,
    authorizationCode: '',
    accessCode: ''
  }
  /*onPress = () => {
    Analytics.updateEndpoint({
      Attributes: {
          interests: ['science', 'politics', 'travel'],
          //..
      },
      UserId: 'UserIdValue'
    });
  }*/
  onClick = () => {
    console.log(this.state);
      RNPaystack.chargeCardWithAccessCode({
        cardNumber: '4084084084084081',//this.state.card, 
        expiryMonth: '06', // this.state.month, 
        expiryYear: '20',// this.state.year, 
        cvc: '408', // this.state.ccv,
        accessCode: this.state.accessCode
      })
      .then(response => {
        console.log(response);
        console.log('successfully charged');
        AlertIOS.alert('User was charged 1 Naira'); // do stuff with the token
        fetch('https://api.paystack.co/transaction/verify/jh234uh438iwuei96', {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer sk_test_fecd0cd226bd1265bee5d526e03d6f280bf3d056'
              }
        }) .then((response) => response.json())
        .then((responseJson1) => {
          console.log(responseJson1);
          AlertIOS.alert('SUCCESSFUL!!! AuthCode:' + responseJson1.data.authorization.authorization_code);
          if (responseJson1.status === true && responseJson1.data.status === 'success'){
            this.setState({ authorizationCode: responseJson1.data.authorization.authorization_code, intialize: false });
          } else {
            console.log('SOMETHING WENT WRONG!');
          }
        })
        .catch((error) => {
          console.log(error + 'Inner Error');
        })
      })
      .catch(error => {
        console.log(error); // error is a javascript Error object
        console.log(error.message);
        console.log(error.code);
      })
      /*fetch('https://api.paystack.co/transaction/verify/jh234uh438iwuei7', {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer sk_test_fecd0cd226bd1265bee5d526e03d6f280bf3d056'
              }
      }) .then((response) => response.json())
      .then((responseJson1) => {
        console.log(responseJson1);
        AlertIOS.alert('SUCCESSFUL!!! AuthCode:' + responseJson1.data.authorization.authorization_code);
        if (responseJson1.status === true && responseJson1.data.status === 'success'){
          this.setState({ authorizationCode: responseJson1.data.authorization.authorization_code, intialize: false });
        } else {
          console.log('SOMETHING WENT WRONG!');
        }
      })
      .catch((error) => {
        console.log(error);
      })*/
  }
  authorization = () => {
    fetch('https://api.paystack.co/transaction/charge_authorization', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer sk_test_fecd0cd226bd1265bee5d526e03d6f280bf3d056',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            authorization_code: this.state.authorizationCode, 
            email: this.state.email, 
            amount: this.state.amount
          }),
        }) .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.status === true && responseJson.data.status === 'success') {
            AlertIOS.alert('successful!!! User was charged ' + this.state.amount)
          
          }
        })
        .catch((error) => {
          console.log(error);
        })
  }
  intialize = () => {
    fetch('https://api.paystack.co/transaction/initialize', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer sk_test_fecd0cd226bd1265bee5d526e03d6f280bf3d056',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reference: 'jh234uh438iwuei96',
            amount: 100,
            email: this.state.email
          }),
        }) .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.status === true){
            console.log('SUCCESSFUL!!!' + responseJson.data.access_code);
            AlertIOS.alert('SUCCESSFUL!!! AccessCode:' + responseJson.data.access_code);
            this.setState({ accessCode: responseJson.data.access_code, intialize: false });
              } else {
                console.log('SOMETHING WENT WRONG!1');
              }
            })
        .catch((error) => {
          console.log(error);
        })

    /*RNPaystack.chargeCard({
      cardNumber: this.state.card, 
      expiryMonth: this.state.month, 
      expiryYear: this.state.year, 
      cvc: this.state.ccv,
      email: this.state.email,
      amountInKobo: 100,
    })
    .then(response => {
      console.log(response); // do stuff with the token
    })
    .catch(error => {
      console.log(error.message);
    })*/
  }
  render(){
    return (
      <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center'}}>
        <Text onPress={this.onPress}>Hello Hello, Hello</Text>
        {
          this.state.status && 
          <View style={{ 
            position: 'absolute', 
            backgroundColor: '#FFF',
            height: 300, 
            width: 250, 
            borderColor: '#c0c0c0', 
            borderWidth: 1, 
            alignSelf: 'center', 
            top: 150 
          }}>
            <Text style={{ fontSize: 20, color: 'green' }}>{this.state.status}</Text>
          </View>
        }
        {
          this.state.intialize &&
          <TouchableOpacity style={{ alignSelf: 'center', padding: 10, backgroundColor: '#FFF' }} onPress={this.intialize}>
            <Text style={{ fontSize: 20, color: 'blue' }}>CLICK ME FIRST</Text>
          </TouchableOpacity>
        }
          <TextInput 
          style={{ margin: 15 }} 
          placeholder={'amount'} 
          onChangeText={(text)=> this.setState({ amount: text })}
          />
          <TextInput 
          style={{ margin: 15 }} 
          placeholder={'email'} 
          onChangeText={(text)=> this.setState({ email: text })}
          />
          <TextInput 
          style={{ margin: 15 }} 
          placeholder={'card'} 
          onChangeText={(text)=> this.setState({ card: text })}
          />
          <TextInput 
          style={{ margin: 15 }} 
          placeholder={'ccv/cvc'} 
          onChangeText={(text)=> this.setState({ ccv: text })}
          />
          <TextInput 
          style={{ margin: 15 }} 
          placeholder={'month of expiry. e.g: 04'} 
          onChangeText={(text)=> this.setState({ month: text })}
          />
          <TextInput 
          style={{ margin: 15 }} 
          placeholder={'year of expiry. e.g: 18'} 
          onChangeText={(text)=> this.setState({ year: text })}
          />
        <TouchableOpacity style={{ borderRadius: 8, margin: 5, alignSelf: 'center', padding: 15, backgroundColor: 'blue' }} onPress={this.onClick}>
          <Text style={{ fontSize: 20, color: '#FFF' }}>PAY 1 NAIRA</Text>
        </TouchableOpacity>
        {
          this.state.authorizationCode &&
          <TouchableOpacity style={{ borderRadius: 8, margin: 5, alignSelf: 'center', padding: 15, backgroundColor: 'blue' }} onPress={this.authorization}>
            <Text style={{ fontSize: 20, color: '#FFF' }}>CHARGE WITH AuthCode {this.state.amount}</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

/* import React, {Component} from 'react';
import { StyleSheet, View, YellowBox, AsyncStorage, PushNotificationIOS } from 'react-native';
import Routes from './src/Navigation/Routes';
import PubNubReact from 'pubnub-react';
const PushNotification = require('react-native-push-notification');

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader requires main queue setup',
  'Module RNFetchBlob requires main queue setup',
  "Can't call",
  "Remote",
  "Warning: Can't call setState"
]);

AsyncStorage.removeItem('firstname').then(()=>{
  console.log('Old name cleared');
});

export default class App extends Component {
  constructor(props){
    super(props);
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-da06179f-f3e8-4888-be0e-1dcf3118d7ea',
      subscribeKey: 'sub-c-410f86ea-e280-11e8-83e9-caaa0dac4787'
    })
    this.pubnub.init(this);
    PushNotification.configure({
      onRegister: function(token){
        console.log('TOKEN:', token);
        if (token.os == "ios"){
          this.pubnub.push.addChannels({
            channels: ['notifications'],
            device: token.token,
            pushGateway: 'apns'
          });
        } else if (token.os == "android"){
          this.pubnub.push.addChannels({
            channels: ['notifications'],
            device: token.token,
            pushGateway: 'gcm'
          });
        }
      },
      onNotification: function(notification){
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      senderID: "561431580673"
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Routes />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0c0c0' // #fff
  }
});

// [GMSServices provideAPIKey:@"AIzaSyA4Px93uD9nzyzcMvVtk0g3yR1oicwTzbE"];
*/