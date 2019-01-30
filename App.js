import React, { Component } from 'react';
import { PushNotificationIOS, Platform, AsyncStorage, View, Text, AlertIOS, Alert, TouchableOpacity, TextInput, YellowBox } from 'react-native';
import OverAllStack from './src/Navigation/Sprint3';
import Routes from './src/Navigation/Routes';
import {
  MenuProvider
} from 'react-native-popup-menu';
import { Provider } from "react-redux";
import { store } from "./src/Store";
// import TabIcons from './src/Atoms/TabIcons';
import firebase from 'react-native-firebase';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';
// import InTransit from './src/Components/InTransit';
import DatePickerAtom from './src/Atoms/DatePickerAtom';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader requires main queue setup',
  'Module RNFetchBlob requires main queue setup',
  "Can't call",
  "Remote",
  ''
  // "Warning: Can't call setState"
]);

/*GoogleSignin.configure({
  iosClientId: '55823499582-4skmcefsn58palm18udknpflsmh748sg.apps.googleusercontent.com'
})*/

// AsyncStorage.removeItem('currentLocate')

export default class App extends Component {

async componentDidMount() {
  this.checkPermission();
  this.createNotificationListeners(); //add this line
}

state = {
  userInfo: null
}

////////////////////// Add these methods //////////////////////
    //1
async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
}

  //3
async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken);
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken);
          // user has a device token
          await AsyncStorage.setItem('fcmToken', fcmToken);
      }
  }
}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}
  //Remove listeners allocated in createNotificationListeners()
componentWillUnmount() {
  this.notificationListener();
  this.notificationOpenedListener();
}

async createNotificationListeners() {
  /*
  * Triggered when a particular notification has been received in foreground
  * */

    // create channel
    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
    .setDescription('My apps test channel');
    await firebase.notifications().android.createChannel(channel);

  this.notificationListener = await firebase.notifications().onNotification((notification) => {
      console.log(notification);
      // const { title, body } = notification;
      // this.showAlert(title, body);
      if (Platform.OS === "android") {
        notification
        .android.setChannelId('test-channel')
        .android.setSmallIcon('wr_bird')
        .android.setPriority(firebase.notifications.Android.Priority.Max).setSound('default');
      }
        firebase.notifications().displayNotification(notification);
  });

  /*
  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  * */
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    console.log(notificationOpen);
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  });

  /*
  * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  * */
  /*const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  }*/

  const notificationOpen= await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
      const action = notificationOpen.action;
      const notification = notificationOpen.notification;
      var seen = [];
      alert(JSON.stringify(notification.data, function(key, val) {
          if (val != null && typeof val == "object") {
              if (seen.indexOf(val) >= 0) {
                  return;
              }
              seen.push(val);
          }
          return val;
      }));
  }

  /*
  * Triggered for data only payload in foreground
  * */
  this.messageListener = firebase.messaging().onMessage((message) => {
    //process data message
    //console.log(JSON.stringify(message));
    firebase.notifications().displayNotification(message);
  });
}

showAlert(title, body) {
  AlertIOS.alert(
    title, body,
    [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    // { cancelable: 'cancel' },
  );
}

callGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    GoogleSignin.signIn().then((userInfo)=>{
      this.setState({ userInfo });
      console.log(userInfo);
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
  /*GoogleSignin.signOut().then((u)=>{
    console.log(u)
  })
  .catch((err) => {
    console.log('WRONG SIGNIN', err);
  })
  .done();*/
}

callFacebook = async () => {
  LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends'])
  .then((result)=>{
    if (result.isCancelled) {
      return Promise.reject(new Error('The user cancelled the request'));
    }
    console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
    return AccessToken.getCurrentAccessToken();
  })
  .then((data)=>{
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    return firebase.auth().signInWithCredential(credential);
  })
  .then((currentUser)=>{
    const user = currentUser.toJSON();
    console.log(`Facebook Login with user: ${JSON.stringify(user)}`)
  })
  .catch((error)=>{
    console.log(`Facebook Login Fails with error: ${error}`)
  });
}

  render(){
    return (
      <Provider store={store}>
        <MenuProvider style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FFF' }}>
          <Routes />
        </MenuProvider>
      </Provider>
    );
  }
}
