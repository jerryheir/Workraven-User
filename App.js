import React, { Component } from 'react';
import { 
  PushNotificationIOS, 
  Platform, 
  AsyncStorage, 
  Image,
  View,
  ImageEditor,
  ImageStore,
  ScrollView,
  Text,
  AlertIOS, 
  YellowBox } from 'react-native';
import OverAllStack from './src/Navigation/Sprint3';
import Routes from './src/Navigation/Routes';
import {
  MenuProvider
} from 'react-native-popup-menu';
import { Provider } from "react-redux";
import { store } from "./src/Store";
import firebase from 'react-native-firebase';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { offset_width, offset_height, c_width, c_height } from './src/config/constants';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader requires main queue setup',
  'Module RNFetchBlob requires main queue setup',
  "Can't call",
  "Remote",
  'Class RCTCxxModule',
  ''
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
  userInfo: null,
  uri: require("./src/assests/images/test_man.png"),
  // uri: "https://i.dlpng.com/static/png/247599_preview.png",
  //uri: "https://purepng.com/public/uploads/large/purepng.com-women-facesfaceshumansfrontalhuman-identitywomen-1421526884785x6tfr.png",
  face_rectangle: [],
  image_size: [],
  width: 300,
  height: 300
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
  /*send = () => {
    fetch('http://106.51.58.118:5000/get_image_attr?face_det=1', {
      method: 'POST',
      headers: {
        user_id: 'fcf26198c91833c1e2b9',
        user_key: 'fd3b240f1b7a7d03a78e'
      },
      body: JSON.stringify({
        image_attr: this.state.base64
      })
    })
    .then((res)=>res.json())
    .then((response)=>{
        console.log(response);
        if (response.face_id_0){
          console.log(response.face_id_0);
        }
    })
    .catch((err)=>{
        console.log(err)
    })
  }*/

   crop = () => {
      let formData = new FormData();
      formData.append('image_attr', {
        uri: "./src/assests/images/test_man.png",
        type: 'image/jpg',
        name: 'test_man.jpg'});
      fetch('http://106.51.58.118:5000/get_image_attr?face_det=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          user_id: 'fcf26198c91833c1e2b9',
          user_key: 'fd3b240f1b7a7d03a78e'
        },
        body: formData
      })
      .then((res)=>res.json())
      .then((response)=>{
          console.log(response);
            console.log(response.image_size[0], response.image_size[1]);
            if (response.face_id_1){
              alert('Error: More than one face detected. Try again later')
            } else {
            let image_width = response.image_size[0];
            let image_height = response.image_size[1];
            let face_rect = response.face_id_0.face_rectangle;
            let cX = offset_width * image_width;
            let cY = offset_height * image_height;
            let cW = c_width * image_width;
            let cH = c_height * image_height;
            this.setState({ face_rectangle: response.face_id_0.face_rectangle, image_size: response.image_size });
          let cropData = {
            offset:{x: face_rect[0] - cX,y: face_rect[1] - cY},
            size:{width: face_rect[2] - cW, height: face_rect[3] - cH}
          };
           ImageEditor.cropImage(
             this.state.uri,
             cropData,
             (uri)=>{
               console.log(uri);
               // this.setState({ uri, width: face_rect[2] - cW, height: face_rect[3] - cH })
               this.setState({ uri, width: 300, height: 300 })
             },
             (err)=>{
               console.log(err)
             }
           )
          }
      })
      .catch((err)=>{
        alert('Error: Invalid image, please check the brightness and make sure your face is visible.')
          console.log(err)
      })
   }

  render(){
    return (
      <Provider store={store}>
        <MenuProvider style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FFF' }}>
          <Routes />
          {/*<ScrollView style={{ backgroundColor: 'white', alignSelf: 'center'}}>
            <Image 
            source={this.state.uri} 
            style={{ width: this.state.width, height: this.state.height, resizeMode: 'contain' }}
            />
            <Text 
            style={{ padding: 21, alignSelf: 'center' }}
            onPress={this.crop}
            >CROP</Text>
          </ScrollView>*/
          }
        </MenuProvider>
      </Provider>
    );
  }
}
