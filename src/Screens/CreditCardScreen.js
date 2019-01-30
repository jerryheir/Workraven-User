import React from "react";
import SignUpWrapper from "../Components/SignUpWrapper";
import CreditCard from "../Components/CreditCard";

class CreditCardScreen extends React.Component {
    render(){
        return (
                <SignUpWrapper
                headerText="Almost there"
                subHeaderText="Please add a payment method with your credit card"
                navigation={this.props.navigation}
                >
                    <CreditCard navigation={this.props.navigation} />
                </SignUpWrapper>
        )
    }
}

export default CreditCardScreen;