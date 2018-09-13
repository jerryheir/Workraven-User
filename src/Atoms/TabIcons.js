import React from "react";
import { Image, ImageBackground, View, Text } from "react-native";
import { Icon } from "native-base";
import { retrieveItem } from "../Functions";
import { color } from "../Styles/Color";

class TabIcons extends React.Component {
    async componentDidMount() {
        const userId = await retrieveItem('userId');
        const token = await retrieveItem('encoded');
        fetch(`https://progoapi.tk/v1/users/${userId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-user-token': token
          }
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({ username: responseJson.data.firstname });
        })
        .catch((error) => {
          console.log(error);
        })
    }

    state = {
        username: 'Username',
    }

    display = () => {
        const { name, tintColor, focused } = this.props;
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
                    <Icon name="ios-person-outline" style={{ color: tintColor, alignSelf: 'center', textAlign: 'center', fontSize: 25}} />
                    <Text style={{fontSize: 10, color: tintColor }}>{this.state.username}</Text>
                </View>
            )
        } else if (name === "Booking") {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 62 }}>
                    <Icon name="ios-at" style={{ color: tintColor, alignSelf: 'center', textAlign: 'center', fontSize: 25}} />
                    <Text style={{fontSize: 10, color: tintColor }}>{name}</Text>
                </View>
            )
        }
        else if (name === "Invite") {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 62 }}>
                    <Icon name="md-share" style={{ color: tintColor, alignSelf: 'center', textAlign: 'center', fontSize: 22}} />
                    <Text style={{fontSize: 10, color: tintColor }} >{name}</Text>
                </View>
            )
        }
    }
    render(){
        retrieveItem('firstname').then((data)=>{
            if (data !== null ){
                this.setState({ username: data });
            } else {
                console.log('Firstname in storage is empty');
            }
        })
        .done();
        return (
            <View>
                {this.display()}
            </View>
        )
    }
}

export default TabIcons;