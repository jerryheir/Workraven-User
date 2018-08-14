import React from "react";
import LoginWrapper from "../Components/LoginWrapper";
import LoginForm from "../Components/LoginForm";

class LoginScreen extends React.Component {
    render(){
        return (
                <LoginWrapper
                headerText="Hello!"
                subHeaderText="Welcome. Enter your email and password to continue..."
                forgetPassword={()=> { this.props.navigation.navigate('ForgotPassword')}}
                signUp={()=> this.props.navigation.navigate('Sign')}
                buttonText="Signup"
                >
                    <LoginForm navigation={this.props.navigation} />
                </LoginWrapper>
        )
    }
}

export default LoginScreen;