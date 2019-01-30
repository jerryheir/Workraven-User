import React from "react";
import { Animated } from 'react-native';
import LoginWrapper from "../Components/LoginWrapper";
import ResetForm from "../Components/ResetForm";
import { BASE_URL } from "../config/api";

class ResetPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.error = new Animated.ValueXY({ x: 21, y: -100 });
    }

    state = {
        error: ''
    }

    displayError = () => {
        Animated.timing(
          this.error,
          {
            toValue: ({ x: 21, y: -400 }),
            duration: 2000,
            delay: 1500
          }
        ).start(()=>{
          this.setState({ error: '' });
          this.error.setValue({ x: 21, y: -100 })
        })
    }

    changePassword = (state) => {
        const otp = state.otp;
        const phone = state.phone;
        const password = state.password;
        fetch(`${BASE_URL}/v1/users/${phone}/reset_password`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'otp': otp,
            'password': password
          }),
        }) .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.status === "success"){
            this.props.navigation.navigate('Login');
          } else {
            Alert.alert(responseJson.message);
            this.setState({ error: responseJson.message }, 
            ()=>{
              this.displayError()
            })
          }
        })
        .catch((error) => {
          this.setState({ error: "An Error Occurred..." }, 
            ()=>{
              this.displayError()
          })
        })
    }
    render(){
        return (
            <LoginWrapper
            headerText="Change Password"
            subHeaderText="Type your new password below"
            signUp={()=> this.props.navigation.navigate('Sign')}
            buttonText="Signup"
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
                <ResetForm 
                onPress={(state)=> {
                    this.changePassword(state);
                }}
                />
            </LoginWrapper>
        )
    }
}

export default ResetPasswordScreen;