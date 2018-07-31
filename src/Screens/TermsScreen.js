import React from "react";
import SignUpWrapper from "../Components/SignUpWrapper";
import Terms from "../Components/Terms";
import { StyleSheet, Dimensions, ImageBackground, View } from "react-native";


class TermsScreen extends React.Component {
    render(){
        return (
            <ImageBackground 
            style={styles.container}
            source={require('../assests/images/map_background.png')}
            >
                <View
                style={styles.viewMap}
                />
                <SignUpWrapper
                headerText="Terms and Conditions"
                subHeaderText="Enter a referral code if any..."
                navigation={this.props.navigation}
                >
                    <Terms navigation={this.props.navigation}/>
                </SignUpWrapper>
            </ImageBackground>
        )
    }
}

export default TermsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewMap: {
        height: 244,
        width: Dimensions.get('window').width,
        backgroundColor: 'transparent'
    }
})