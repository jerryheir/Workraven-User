import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert,
    CameraRoll,
    YellowBox,
    Image,
    ImageBackground,
    ActivityIndicator,
    NativeModules,
    TouchableOpacity
  } from 'react-native';
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
// import CameraRollPicker from 'react-native-camera-roll-picker';
import ImagePicker from "react-native-image-crop-picker";
// React native 0.55.4 is currently migrating to a new React API.
// Some warnings are expected in this version.
YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader requires main queue setup',
    'Module RNFetchBlob requires main queue setup',
]);

// const ImagePicker = NativeModules.ImageCropPicker;

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
      width: 300, // '100%',
      height: 300,
      cropping: true,
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
      console.log(error);

    })
  }

    render(){
      const dpr = this.state.dp ? (<TouchableOpacity
        onPress={()=>this.showPicker()}>
        <Image 
        style={{ width: 100, height: 100, margin: 5 }}
        source={{ uri: this.state.dp }}
        />
        </TouchableOpacity>) : (
          <TouchableOpacity onPress={()=>this.showPicker()}>
            <Text>Change Picture</Text>
          </TouchableOpacity>
        );

      const dps = this.state.loading ? <ActivityIndicator animating={this.state.loading} /> : (
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            { dpr }
          </View>
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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    gallery: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      paddingTop: 100
    }
  });

  /*getSelectedImages = (selectedImages, currentImage) => {
      const image = currentImage.uri
      const Blob = RNFetchBlob.polyfill.Blob
      const fs = RNFetchBlob.fs
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
      window.Blob = Blob

      let uploadBlob = null
      const imageRef = firebase.storage().ref('posts').child("test.jpg")
      let mime = 'image/jpg'
      fs.readFile(image, 'base64')
        .then((data) => {
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
          Alert.alert(url);
          let userData = {}
          let obj = {}
          obj["loading"] = false
          obj["dp"] = url
          this.setState(obj)
        })
        .catch((error) => {
          console.log(error);

        })
    
  }*/
    /*render() {
      return (
        <View style={styles.gallery}>
          <CameraRollPicker
          selected={[]}
          maximum={1}
          callback={this.getSelectedImages}
          />
          <Text style={styles.welcome}>
            Image Gallery
          </Text>
        </View>
      );
    }*/