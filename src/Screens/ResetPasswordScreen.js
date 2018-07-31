import React from "react";
import LoginWrapper from "../Components/LoginWrapper";
import ResetForm from "../Components/ResetForm";

class ResetPasswordScreen extends React.Component {
    changePassword = () => {
        // can make POST request here and navigation
        console.log('Password has been changed')
    }
    render(){
        return (
                <LoginWrapper
                headerText="Change Password"
                subHeaderText="Type your new password below"
                signUp={()=> this.props.navigation.navigate('Sign')}
                buttonText="Signup"
                >
                    <ResetForm onPress={()=> this.props.navigation.navigate('Login')} />
                </LoginWrapper>
        )
    }
}

export default ResetPasswordScreen;