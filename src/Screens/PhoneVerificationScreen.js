import React from "react";
import SignUpWrapper from "../Components/SignUpWrapper";
import PhoneVerification from "../Components/PhoneVerification";

class PhoneVerificationScreen extends React.Component {
    render(){
        return (
                <SignUpWrapper
                headerText="Verification"
                subHeaderText="Please take a minute to verify your phone number"
                navigation={this.props.navigation}
                >
                    <PhoneVerification navigation={this.props.navigation} />
                </SignUpWrapper>
        )
    }
}

export default PhoneVerificationScreen;