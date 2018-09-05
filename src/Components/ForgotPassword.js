import React from "react";
import { StyleSheet, View, Dimensions, KeyboardAvoidingView } from "react-native";
import LoginWrapper from "./LoginWrapper";
import InputAtom from "../Atoms/InputAtom";
import ButtonAtom from "../Atoms/ButtonAtom";

class ForgotPassword extends React.Component {
    state = {
        email: '',
        otp: '',
        showOTP: ''
    }

    showAndSend = () => {
        this.setState({ showOTP: "show"})
        // you can send POST request here
    }
    display = () => {
        if (this.state.showOTP === "") {
            return (
                <ButtonAtom
                style={[styles.buttonContainer, { marginBottom: 50 }]}
                onPress={this.showAndSend}
                text={'SEND'}
                normal={true}
                />
            )
        } else {
            return (
                <View>
                    <InputAtom
                    onChangeText={otp => this.setState({ otp })}
                    value={this.state.otp}
                    label="Enter OTP"
                    keyboardType="numeric"
                    returnKeyType="done"
                    />
                    <ButtonAtom
                    style={[styles.buttonContainer, { marginBottom: 0, marginTop: -3 }]}
                    onPress={this.props.onPress}
                    text={'VERIFY'}
                    normal={true}
                    />
                </View>
            )
        }
    }
    render(){
        return (
                <LoginWrapper
                headerText="Shoot!"
                subHeaderText="Enter your email below, and you will be given an OTP in order to be able to reset your password..."
                signUp={()=> {this.props.navigation.navigate('Sign')}}
                buttonText={'Signup'}
                >
                <KeyboardAvoidingView
                keyboardVerticalOffset={50}
                behavior="padding"
                style={{ width: Dimensions.get('window').width - 64, alignSelf: 'center', marginBottom: 80}}>
                    <InputAtom
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    label="Email"
                    keyboardType="email-address"
                    />
                    <View>
                        {this.display()}
                    </View>
                </KeyboardAvoidingView>
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
    }
  });
  