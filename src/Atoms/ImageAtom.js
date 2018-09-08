import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert,
    YellowBox,
    Image,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity
  } from 'react-native';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';

import ImagePicker from "react-native-image-crop-picker";
import { color } from "../Styles/Color";
// React native 0.55.4 is currently migrating to a new React API.
// Some warnings are expected in this version.
YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader requires main queue setup',
    'Module RNFetchBlob requires main queue setup',
]);

const config = {
  apiKey: "AIzaSyDmNFWR9pDVNq__U0dp5G409U4xmJUwUxQ",
  authDomain: "image-upload-84f38.firebaseapp.com",
  databaseURL: "https://image-upload-84f38.firebaseio.com",
  projectId: "image-upload-84f38",
  storageBucket: "image-upload-84f38.appspot.com",
  messagingSenderId: "839714486165"
}
firebase.initializeApp(config);

export default class ImageAtom extends React.PureComponent {
  state = {
    loading: false,
    dp: null
  }

  showPicker = () => {
    this.setState({ loading: true });
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
    // const { uid } = this.state.user
    const uid = "12345"
    ImagePicker.openPicker({
      compressImageMaxWidth: 300, // '100%',
      compressImageMaxHeight: 300,
      compressImageQuality: Platform.OS === 'ios' ? 0.5 : 0.7,
      cropping: false,
      mediaType: 'photo'
    }).then(image => {
      const imagePath = image.path
      let uploadBlob = null
      const imageRef = firebase.storage().ref(uid).child('dp.jpg')
      let mime = 'image/jpg'
      fs.readFile(imagePath, 'base64')
        .then((data) => {
          // console.log(data);
          return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          // URL of the image uploaded on Firebase storage
          // Alert.alert(url);
          let userData = {}
          let obj = {}
          obj["loading"] = false
          obj["dp"] = url
          this.setState(obj);
          Alert.alert(url);
          console.log(url);
        })
        .catch((error) => {
          console.log(error);

        })
    })
    .catch((error) => {
      console.log(error, 'YAY');
        this.setState({ loading: false });
    })
  }

    render(){
      const dpr = this.state.dp ? (
        <View>
        <View style={styles.fab}>
        <TouchableOpacity onPress={()=>this.showPicker()} activeOpacity={0.5} style={{ padding: 10 }}>
            <Image source={require('../assests/camera.png')} style={{ height: 17, width: 16, overflow: 'visible' }}/>
        </TouchableOpacity>
        </View>
        <ImageBackground
        source={{ uri: this.state.dp }} 
        style={styles.imageBackground}
        >
            <View style={styles.viewPad}>
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Image style={{height: 14, width: 10, marginLeft: 20, paddingBottom: 8, overflow: 'visible'}} source={require('../assests/pointer2.png')}/>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, color: color.white }}>Edit Profile</Text>
                    <Text style={{ fontSize: 12, color: color.white }}>Change your profile details</Text>
                </View>
            </View>
        </ImageBackground> 
        </View>
      ) : (
        <View>
          <View style={styles.fab}>
          <TouchableOpacity onPress={()=>this.showPicker()} activeOpacity={0.7} style={{ padding: 10 }}>
              <Image source={require('../assests/camera.png')} style={{ height: 17, width: 16, overflow: 'visible' }}/>
          </TouchableOpacity>
          </View>
          <ImageBackground
          source={require('../assests/images/profile_top_banner.png')} 
          style={styles.imageBackground}
          >
              <View style={styles.viewPad}>
                  <View>
                      <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                          <Image style={{height: 14, width: 10, marginLeft: 20, paddingBottom: 8, overflow: 'visible'}} source={require('../assests/pointer2.png')}/>
                      </TouchableOpacity>
                      <Text style={{ fontSize: 24, color: color.white }}>Edit Profile</Text>
                      <Text style={{ fontSize: 12, color: color.white }}>Change your profile details</Text>
                  </View>
              </View>
          </ImageBackground>
          </View>
        );

      const dps = this.state.loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator animating={this.state.loading} /></View>) : (
        <View style={styles.container}>
            { dpr }
        </View>
      );

      return (
        <View style={styles.container}>
          { dps }
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      // flex: .5,
      height: 226,
      // justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    gallery: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      paddingTop: 100
    },
    imageBackground: {
      width: '100%',
      height: 226,
      paddingTop: 20,
      // backgroundColor: 'rgba(0, 0 , 0, .5)'
    },
    viewPad: {
        flex: 1,
        paddingLeft: 21,
        paddingRight: 21,
        padding: 16,
        // flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    fab: {
        position: "absolute",
        top: 200,
        right: 30,
        height: 52,
        width: 52,
        borderRadius: 27,
        backgroundColor: color.white,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 1.5,
        shadowOffset: { width: 0, height: 2 },
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center'
    }
  });
