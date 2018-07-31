import React from "react";
import SignUpWrapper from "../Components/SignUpWrapper";
import CreditCard from "../Components/CreditCard";

class PhoneVerificationScreen extends React.Component {
    render(){
        return (
                <SignUpWrapper
                headerText="Almost there"
                subHeaderText="Please take a minute to verify your phone number"
                navigation={this.props.navigation}
                >
                    <CreditCard navigation={this.props.navigation} />
                </SignUpWrapper>
        )
    }
}

export default PhoneVerificationScreen;