import React from "react";
import { ImageBackground, TouchableWithoutFeedback, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
class WelcomeImage extends React.Component {
    render(){
        return (
            <TouchableWithoutFeedback onPress={()=> this.props.navigation.navigate('Tabs')}>
                <ImageBackground
                style={{ flex: 1, width: width, height: height }}
                source={require('../assests/images/registration_splash1.png')}
                />
            </TouchableWithoutFeedback>
        )
    }
}

export default WelcomeImage;
