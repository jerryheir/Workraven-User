import React from "react";
import { 
    Platform,
    ScrollView, 
    Dimensions, 
    View,
    ActivityIndicator,
    StyleSheet,
    Text,
    YellowBox,
    Animated,
    TouchableOpacity
 } from "react-native";
import { color } from "../Styles/Color";
import InputAtom from "../Atoms/InputAtom";
import ButtonAtom from "../Atoms/ButtonAtom";
import SemiCircleAtom from "../Atoms/SemiCircleAtom"
import { Thumbnail, Icon } from "native-base";
import * as firebase from 'firebase';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from "react-native-image-crop-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BASE_URL } from '../config/api';
import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
    MenuProvider
} from 'react-native-popup-menu';
const { width, height } = Dimensions.get('window');
const halfWidth = width / 2;

const config = {
    apiKey: "AIzaSyDmNFWR9pDVNq__U0dp5G409U4xmJUwUxQ",
    authDomain: "image-upload-84f38.firebaseapp.com",
    databaseURL: "https://image-upload-84f38.firebaseio.com",
    projectId: "image-upload-84f38",
    storageBucket: "image-upload-84f38.appspot.com",
    messagingSenderId: "839714486165"
  }
  firebase.initializeApp(config);
  // console.disableYellowBox = true
export default class NewEditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.error = new Animated.ValueXY({ x: 11, y: 50 });
    }
    async componentDidMount(){
        const firstname = await this.props.navigation.getParam('firstname', 'How');
        const lastname = await this.props.navigation.getParam('lastname', 'Did');
        // const address = await this.props.navigation.getParam('address', 'You get Here???');
        const email = await this.props.navigation.getParam('email', 'how did you get here???');
        const userId = await this.props.navigation.getParam('userId', '');
        const token = await this.props.navigation.getParam('token', '');
        const image = await this.props.navigation.getParam('image', null);

        this.setState({ firstname, lastname, email, userId, token, image, loading: false })
    }

    state = {
        firstname: '',
        lastname: '',
        image: null,
        loading: true,
        email: '',
        userId: '',
        token: '',
        error: '',
        disabled: false
    }

    displayError = () =>{
        Animated.timing(
          this.error,
          {
            toValue: ({ x: 11, y: -400 }),
            duration: 2500,
            delay: 1000
          }
        ).start(()=>{
          this.setState({ error: '', disabled: false });
          this.error.setValue({ x: 11, y: 50 })
        })
    }

    handleSubmit = async () => {
        this.setState({ disabled: true })
        const { firstname, lastname, image, userId, token } = this.state;
        if (firstname.length === 0 || lastname.length === 0 ) {
          this.setState({ error: 'All fields are required' }, 
          ()=>{
            this.displayError()
          })
        } else {
          fetch(`${BASE_URL}/v1/users/${userId}`, {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'x-user-token': token
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    image_url: image
                }),
              }) .then((response) => response.json())
              .then((responseJson) => {
                if (responseJson.status === 'success') {
                  this.props.navigation.goBack();
                  this.setState({ disabled: false })
                } else {
                  this.setState({ error: responseJson.message }, 
                  ()=>{
                    this.displayError()
                  })
                }
              })
              .catch((error) => {
                // console.log(error);
                this.setState({ error: 'Check your network connection and try again' }, 
                    ()=>{
                      this.displayError()
                })
              })
        }
    }

    showPicker = () => {
        this.setState({ loading: true });
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        let uploadBlob = '';
        let mime = 'image/jpg'
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
        const Fetch = RNFetchBlob.polyfill.Fetch
        // replace built-in fetch
        window.fetch = new Fetch({
            // enable this option so that the response data conversion handled automatically
            auto : true,
            // when receiving response data, the module will match its Content-Type header
            // with strings in this array. If it contains any one of string in this array, 
            // the response body will be considered as binary data and the data will be stored
            // in file system instead of in memory.
            // By default, it only store response data to file system when Content-Type 
            // contains string `application/octet`.
            binaryContentTypes : [
                'image/',
                'video/',
                'audio/',
                'foo/',
            ]
        }).build()

        const uid = 'v1_3i9' + this.state.userId + 'hp04'
        ImagePicker.openPicker({
          compressImageMaxWidth: 300, // '100%', try 500 some other time
          compressImageMaxHeight: 300,
          compressImageQuality: Platform.OS === 'ios' ? 0.5 : 0.7,
          cropping: false,
          mediaType: 'photo'
        }).then(image => {
          const imagePath = image.path
          uploadBlob = '';
          const imageRef = firebase.storage().ref(uid).child(`${uid}.jpg`)
          mime = 'image/jpg'
          fs.readFile(imagePath, 'base64')
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
              let obj = {}
              obj["loading"] = false
              obj["image"] = url
              this.setState(obj);
            })
            .catch((error) => {
              console.log(error);
              this.setState({ error: 'An error occured here' }, 
              ()=>{
                this.displayError()
            })
            })
        })
        .catch((error) => {
          this.setState({ loading: false, error: 'You cancelled selection' }, 
          ()=>{
            this.displayError()
          })
        })
      }

      displayImage = () => {
          if (this.state.image === null) {
              return (
                <Thumbnail 
                source={require('../assests/imagePlaceholder.png')}
                style={{ width: 168, height: 168, borderRadius: 84 }}
                />
              )
          } else {
              return (
                <Thumbnail 
                source={{ uri: this.state.image }}
                style={{ width: 168, height: 168, borderRadius: 84 }}
                />
              )
          }
      }

  render() {
      const photoView = (!this.state.loading) ? 
      (<View
        style={{ 
            width: 172, 
            height: 172, 
            borderRadius: 86, 
            backgroundColor: '#E6E6FA',
            alignItems: 'center',
            justifyContent: 'center'
        }}
        >
            {this.displayImage()}
            <TouchableOpacity 
            style={{ 
                position: 'absolute',
                right: 9.5,
                top: 120,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: color.white,
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOpacity: 1.5,
                shadowOffset: { width: 0, height: 1.5 },
                elevation: 3
            }}
            activeOpacity={.8}
            onPress={()=>this.showPicker()}
            >
                <Icon name="ios-camera" style={{ color: color.darkGray, fontSize: 32 }} />
            </TouchableOpacity>
        </View>) : (
           <View
           style={{ 
               width: 172, 
               height: 172, 
               borderRadius: 86, 
               backgroundColor: '#E6E6FA',
               alignItems: 'center',
               justifyContent: 'center'
           }}
           >
            <ActivityIndicator 
            size="large" 
            animating={this.state.loading} 
            color={color.white}
            />
           </View> 
        )
    return (
        <KeyboardAwareScrollView
        overScrollMode='never'
        keyboardShouldPersistTaps='always'
        keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'interactive'}
        style={{ backgroundColor: '#FFF' }}
        >
        <View style={{ flex: 1, backgroundColor: color.white }}>
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
        <View style={{ backgroundColor: color.white, height: Platform.OS === 'ios' ? 250 : 220, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <SemiCircleAtom color={"#E6E6FA"} />
            <Icon 
            name="ios-arrow-round-back" 
            style={{
                position: "absolute",
                left: 21,
                top: 42,
                fontSize: 32
            }}
            onPress={()=>this.props.navigation.goBack()}
            />
            <Menu 
            style={{
                position: "absolute",
                right: 21,
                top: 42,
                width: 20,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <MenuTrigger style={{ width: 50, alignItems: 'center' }}>
                    <Icon 
                    name="md-more"  
                    style={{ 
                        fontSize: 32,
                        color: '#828282'
                    }}
                    />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{ width: 100, padding: 8, marginTop: 15 }}>
                    <MenuOption
                    onSelect={() => console.log('Help Clicked!!')} 
                    >
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 14, color: '#828282' }}>Help</Text>
                    </MenuOption>
                    <MenuOption
                    onSelect={() => console.log('Legal Clicked!!')} 
                    >
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 14, color: '#828282' }}>Legal</Text>
                    </MenuOption>
                    <MenuOption
                    onSelect={() => this.props.navigation.navigate('Auth')} 
                    >
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 14, color: '#828282' }}>Log Out</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
            {
                photoView
            }
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 21,
                justifyContent: 'space-between',
                height: 50,
                width: '100%',
                borderBottomColor: '#F2F2F2', borderBottomWidth: 1,
                borderTopColor: '#F2F2F2', borderTopWidth: 1
            }}>
                <Text style={{ 
                    fontSize: 21, 
                    fontFamily: 'Lato-Bold',
                    color: '#828282'
                }}>Edit Profile</Text>
            </View>
            <View style={{ marginTop: 20, width: width - 42, alignSelf: 'center' }}>
                <View style={{ flexDirection: 'row', width: Dimensions.get('window').width - 42, justifyContent: 'space-between'}}>
                <InputAtom
                    onChangeText={firstname => this.setState({ firstname })}
                    value={this.state.firstname}
                    label="First Name"
                    keyboardType="default"
                    style={{ width: '46%', height: 50 }}
                    itemStyle={{ height: 50 }}
                    input={{ height: 40 }}
                    maxLength={20}
                />
                <InputAtom
                    onChangeText={lastname => this.setState({ lastname })}
                    value={this.state.lastname}
                    label="Last Name"
                    keyboardType="default"
                    style={{ width: '47%', height: 50 }}
                    itemStyle={{ height: 50 }}
                    input={{ height: 40 }}
                    maxLength={20}
                />
                </View>
                    {/*<InputAtom
                    onChangeText={address => this.setState({ address })}
                    value={this.state.address}
                    label="Address"
                    keyboardType="default"
                    maxLength={38}
                    />*/}
                    <InputAtom
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    label="Email"
                    keyboardType="email-address"
                    disabledItem={true}
                    disabled={true}
                    style={{ backgroundColor: '#F2F2F2' }}
                    />
                    <ButtonAtom
                    style={styles.buttonContainer}
                    onPress={this.handleSubmit}
                    text={'UPDATE'}
                    disabled={this.state.disabled}
                    normal={true}
                    />
            </View>
      </View>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingTop: 15,
      paddingBottom: 10,
      width: Dimensions.get('window').width - 42,
      alignSelf: 'center',
      backgroundColor: 'white',
      marginTop: 29
    },
    buttonContainer: {
      backgroundColor: '#BE64FF',
      alignItems: 'center',
      justifyContent: 'center',
      // marginTop: Platform.OS === 'android' ? 0 : 0,
      borderWidth: 1,
      borderColor: '#C190C7',
      borderRadius: 25,
      height: 45
    }
})
