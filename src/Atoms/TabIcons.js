import React from "react";
import { Image, ImageBackground, View, Text } from "react-native";
import { Icon } from "native-base";
import { color } from "../Styles/Color";

class TabIcons extends React.Component {
    display = () => {
        const {name, tintColor, focused} = this.props;
        if (name === "WorkRaven") {
            return (
                <View>
                    <ImageBackground
                    source={require('../assests/images/ellipse.png')}
                    style={{ height: 62, width: '100%', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Image
                        source={require('../assests/images/wrBird.png')}
                        style={{ height: 40, width: 40, marginBottom: 5, marginRight: 10 }}
                        />
                    </ImageBackground>
                </View>
            )
        } else if (name === "Profile") {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 62 }}>
                    <Icon name="ios-person" style={{ color: tintColor, alignSelf: 'center', textAlign: 'center', fontSize: 25}} />
                    <Text style={{fontSize: 10, color: tintColor }}>Jeremiah</Text>
                </View>
            )
        } else if (name === "Booking") {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 62 }}>
                    <Icon name="ios-person" style={{ color: tintColor, alignSelf: 'center', textAlign: 'center', fontSize: 25}} />
                    <Text style={{fontSize: 10, color: tintColor }}>{name}</Text>
                </View>
            )
        }
        else if (name === "Invite") {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 62 }}>
                    <Icon name="ios-person" style={{ color: tintColor, alignSelf: 'center', textAlign: 'center', fontSize: 25}} />
                    <Text style={{fontSize: 10, color: tintColor }} >{name}</Text>
                </View>
            )
        }
    }
    render(){
        return (
            <View>
                {this.display()}
            </View>
        )
    }
}

export default TabIcons;