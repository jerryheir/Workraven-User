import React from "react";
import ForgotPassword from "../Components/ForgotPassword";

class ForgotPasswordScreen extends React.Component {
    handleSubmit = () => {
        this.props.navigation.navigate('ResetPassword')
    }
    render(){
        return (
            <ForgotPassword navigation={this.props.navigation} onPress={this.handleSubmit} />
        )
    }
}

export default ForgotPasswordScreen;