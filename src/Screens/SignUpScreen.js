import React from "react";
import { Alert } from "react-native";
import SignUpWrapper from "../Components/SignUpWrapper";
import SignUpForm from "../Components/SignUpForm";

class SignUpScreen extends React.Component {
    render(){
        return (
                <SignUpWrapper
                headerText="Sign Up"
                subHeaderText="Create an account to start using WorkRaven"
                navigation={this.props.navigation}
                >
                    <SignUpForm onPress={(state)=> {
                        this.props.navigation.navigate('Phone', { state });
                    }}/>
                </SignUpWrapper>
        )
    }
}

export default SignUpScreen;