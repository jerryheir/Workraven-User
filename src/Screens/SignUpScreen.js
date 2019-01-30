import React from "react";
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
                        this.props.navigation.navigate('CreditCard', { state });
                    }}/>
                </SignUpWrapper>
        )
    }
}

export default SignUpScreen;