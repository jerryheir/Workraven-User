import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
import ButtonAtom from '../Atoms/ButtonAtom';
import InputAtom from '../Atoms/InputAtom';
import { color } from '../Styles/Color';
import { Icon } from 'native-base';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { LoginManager, LoginButton, AccessToken } from 'react-native-fbsdk';

GoogleSignin.configure({
  iosClientId: '55823499582-4skmcefsn58palm18udknpflsmh748sg.apps.googleusercontent.com'
})

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.error = new Animated.ValueXY({ x: 11, y: -100 });
  }
    state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      // address: '',
      error: '',
      disabled: false
    }

    callGoogle = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        GoogleSignin.signIn().then((userInfo)=>{
          this.setState({ userInfo });
          const { user: { givenName, familyName, email }} = userInfo;
          this.setState({ firstname: givenName, lastname: familyName, email })
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
      /*LoginManager.logOut()
      .then((u)=>{
        console.log(u)
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
      .done();*/
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

    displayError = () =>{
      Animated.timing(
        this.error,
        {
          toValue: ({ x: 11, y: -400 }),
          duration: 2500,
          delay: 2000
        }
      ).start(()=>{
        this.setState({ error: '', disabled: false });
        this.error.setValue({ x: 11, y: -100 })
      })
        return (
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
        )
    }

handleSubmit = () => {
  this.setState({ disabled: true })
  const { email, password, firstname, lastname } = this.state;
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.length === 0 || password.length === 0 || firstname.length === 0 || lastname.length === 0) {
    this.setState({ error: 'All fields are required'})
  } else if (reg.test(this.state.email) !== true || email.length < 8) {
    this.setState({ error: 'Please enter a correct email format'})
  } else if(password.length < 7) {
    this.setState({ error: 'Password length should not be less than 7' })
  } else if (password.length === 0) {
    this.setState({ error: 'Password cannot be empty' })
  } else {
    this.props.onPress(this.state);
    this.setState({ disabled: false })
  }
}
  render() {
    return (
      <View style={styles.container}>
      {
        (this.state.error !== '') &&
        this.displayError()
      }
      <View style={{ }}>
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
        <InputAtom
            onChangeText={email => this.setState({ email: email.trim() })}
            value={this.state.email}
            label="Email"
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
          {/*<InputAtom
            onChangeText={address => this.setState({ address })}
            value={this.state.address}
            label="Address"
            keyboardType="default"
            maxLength={50}
            style={{ width: '100%', height: 50 }}
            itemStyle={{ height: 50 }}
            input={{ height: 40 }}
          />*/}
        </View>
        <View style={{ justifyContent: 'center' }}>
          <ButtonAtom
          style={styles.buttonContainer}
          onPress={this.handleSubmit}
          disabled={this.state.disabled}
          text={'SIGN UP'}
          normal={true}
          />
          <View style={{
            flexDirection: 'row',
            width: Dimensions.get('window').width - 42,
            marginTop: Platform.OS === "ios" ? 21 : 15,
            justifyContent: 'center',
            width: '100%'
          }}>
            <TouchableOpacity style={[styles.social, { marginRight: 11 }]} onPress={this.callGoogle}>
              <Icon 
              name="logo-google" 
              style={{ 
                color: '#E74133', 
                fontSize: 18 
              }} />
              {/*<Text>Use Gmail</Text>*/}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.social, { marginLeft: 11 }]} onPress={this.callFacebook}>
            <Icon 
              name="logo-facebook" 
              style={{ 
                color: '#3D5A98', 
                fontSize: 20
              }} />
              {/*<Text>Use Facebook</Text>*/}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default SignUpForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: Platform.OS === 'android' ? 10 : 0,
    width: Dimensions.get('window').width - 42,
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
  social: { 
    backgroundColor: '#F2F2F2',
    width: 50,
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
