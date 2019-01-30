import React from "react";
import { StyleSheet, View, Dimensions, Platform, Animated, Text, TouchableOpacity } from "react-native";
import LoginWrapper from "./LoginWrapper";
import InputAtom from "../Atoms/InputAtom";
import ButtonAtom from "../Atoms/ButtonAtom";
import { color } from "../Styles/Color";
import { Icon } from "native-base";
import TinyWhiteButton from "../Atoms/TinyWhiteButton";
import { BASE_URL } from '../config/api';

class TinyWhite extends React.PureComponent {
    render(){
        return (
            <TouchableOpacity
            style={[styles.skip, this.props.style]}
            onPress={this.props.onPress}
            >
                <Icon name={Platform.OS === 'ios' ? "ios-call" : "md-call"} 
                style={{ color: color.primary, fontSize: 18, marginRight: 10 }}
                />
                <Text style={styles.text}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
  }

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.error = new Animated.ValueXY({ x: 21, y: -100 });
    }
    state = {
        phone: '',
        otp: '',
        phoneSuccess: '',
        disabled: true,
        buttonText: 'SEND OTP TO PHONE',
        button: false,
        error: '',
        errorDisabled: false,
        color: color.primary
    }

    displayError = () =>{
        Animated.timing(
          this.error,
          {
            toValue: ({ x: 21, y: -400 }),
            duration: 2000,
            delay: 1500
          }
        ).start(()=>{
          this.setState({ error: '', errorDisabled: false });
          this.error.setValue({ x: 21, y: -100 })
        })
    }

    handleSubmit = () => {
        this.setState({ errorDisabled: true })
        const { phone } = this.state;
        if(phone.length === 0 || phone.length < 10){
              this.setState({ error: 'Enter correct number format' }, 
              ()=>{
                this.displayError()
              })
        }
        else {
          fetch(`${BASE_URL}/v1/users/resend_otp`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  'phone': phone
                }),
              }) .then((response) => response.json())
              .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.status === "success"){
                  this.setState({ phoneSuccess: phone, disabled: false, buttonText: 'CONTINUE', button: true, color: '#C190C7' });
                } else {
                  this.setState({ error: responseJson.message }, 
                    ()=>{
                    this.displayError()
                  })
                }
              })
              .catch((error) => {
                console.log(error);
                this.setState({ error: 'Some Error occured...' }, 
                ()=>{
                  this.displayError()
                })
              })
        }
    }

    sendOtp = () => {
        this.setState({ errorDisabled: true })
        const { otp } = this.state;
        const { navigation } = this.props;
        if (otp.length === 0) {
          this.setState({ error: 'Enter the OTP you received!' }, 
          ()=>{
            this.displayError()
          })
        } else if (otp.length < 5) {
          this.setState({ error: 'Please enter valid OTP' }, 
          ()=>{
            this.displayError()
          })
        } else {
          navigation.navigate("ResetPassword", { otp: this.state.otp, phone: this.state.phoneSuccess })
        }
      }

    render(){
        const { disabled, otp } = this.state;
        return (
            <LoginWrapper
            headerText="Shoot!"
            subHeaderText="Enter the phone number you signed up, and you will be given an OTP in order to be able to reset your password..."
            signUp={()=> {this.props.navigation.navigate('Sign')}}
            buttonText={'Signup'}
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
                <View
                style={{ height: '90%', flex: 1, width: Dimensions.get('window').width - 42, alignSelf: 'center', marginBottom: 80}}
                >
                    <InputAtom
                    onChangeText={phone => this.setState({ phone })}
                    value={this.state.phone}
                    label="Phone Number"
                    placeholder=""
                    maxLength={11}
                    />
                    <InputAtom
                    onChangeText={otp => this.setState({ otp, button: false, color: color.primary })}
                    value={this.state.otp}
                    label="OTP Here"
                    style={this.state.disabled ? { backgroundColor: "#C0C0C0" } : {backgroundColor: color.white }}
                    disabledItem={this.state.disabled}
                    disabled={this.state.disabled}
                    keyboardType="numeric"
                    maxLength={5}
                    />
                </View>
                <View
                style={{ marginBottom: 60, width: Dimensions.get('window').width - 42, alignSelf: 'center' }}
                >
                    <ButtonAtom
                    style={[disabled ? styles.buttonContainer : styles.buttonContainerNew, {backgroundColor: !disabled && otp.length !== 5 ? '#C190C7' : '#BE64FF'}]}
                    onPress={this.state.disabled ? this.handleSubmit : this.sendOtp}
                    text={this.state.buttonText}
                    disabled={this.state.error !== '' ? this.state.errorDisabled : this.state.button}
                    normal={true}
                    />
                    {!this.state.disabled && 
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center'}}>
                            <TinyWhiteButton
                            text={'RESEND OTP'}
                            style={{ height: 40, width: 120, marginRight: 24 }}
                            onPress={this.handleSubmit}
                            />
                            <TinyWhite
                            text={'USE CALL'}
                            style={{ height: 40, width: 120, marginLeft: 24 }}
                            onPress={this.callSubmit}
                            />
                        </View>
                    }
                </View>
            </LoginWrapper>
        )
    }
}

export default ForgotPassword;

const styles = StyleSheet.create({
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#BE64FF',
      marginTop: 18,
      borderWidth: 1,
      borderColor: '#C190C7',
      borderRadius: 25,
      height: 50
    },
    text: {
        color: color.primary,
        alignSelf: 'center'
    },
    skip: {
        backgroundColor: '#FFFFFF',
        height: 40,
        width: 90,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#C190C7',
        alignSelf: 'center',
        marginBottom: 15,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 1 },
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
  });
  