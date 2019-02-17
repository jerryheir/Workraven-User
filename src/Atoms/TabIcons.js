import React from "react";
import { Image, ImageBackground, View, Text } from "react-native";
import { Icon } from "native-base";
import * as Keychain from 'react-native-keychain';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchUserData, saveIdToken } from "../Actions/fetchActions";

class TabIcons extends React.Component {
    constructor(props){
        super(props);
        this.watchId = null;
    }
    async componentDidMount() {
        try {
            Keychain.getGenericPassword().then((data)=>{
                if (data){
                    let credentials = data;
                    let { userId, token } = JSON.parse(credentials.password);
                    this.props.fetchUserData(userId, token);
                    this.props.saveIdToken({ userId: userId, token })
                }
            })
        } catch (error){
            console.log('Keychain couldn\'t be accessed!', error);
        }
    }

    static getDerivedStateFromProps(props, state){
        if (props.userData.firstname){
            return {
                username: props.userData.firstname
            }
        }
        return null;
    }

    state = {
        username: ''
    }

    display = () => {
        const { name, tintColor, focused, index, idx } = this.props;
        switch(true){
        case (name === "WorkRaven"):
            return (
                <View>
                    <ImageBackground
                    source={require('../assests/images/ellipse.png')}
                    style={{ height: 62, width: '100%', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <Image
                        source={require('../assests/images/wrBird.png')}
                        style={{ height: 30, width: 30, marginBottom: 5, marginRight: 15 }}
                        />
                    </ImageBackground>
                </View>
            )
        case (name === "Profile"):
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 62 }}>
                    <Icon name="ios-person" style={{ color: tintColor, alignSelf: 'center', textAlign: 'center', fontSize: 25}} />
                    <Text style={{ fontSize: 10, color: tintColor, fontFamily: 'Lato-Regular' }}>{this.state.username}</Text>
                </View>
            )
        case (name === "Booking"):
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 62 }}>
                    <Icon type="Ionicons" name="md-list-box" style={{ color: tintColor, alignSelf: 'center', textAlign: 'center', fontSize: 22 }} />
                    <Text style={{ fontSize: 10, color: tintColor, fontFamily: 'Lato-Regular' }}>{name}</Text>
                </View>
            )
        case (name === "Payments"):
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 62 }}>
                    <Icon name="ios-cash" style={{ color: tintColor, alignSelf: 'center', textAlign: 'center', fontSize: 22}} />
                    <Text style={{ fontSize: 10, color: tintColor, fontFamily: 'Lato-Regular' }} >{name}</Text>
                </View>
            )
        case (name === "Invite"):
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 62 }}>
                    <Icon name="md-share" style={{ color: tintColor, alignSelf: 'center', textAlign: 'center', fontSize: 18 }} />
                    <Text style={{ fontSize: 10, color: tintColor, fontFamily: 'Lato-Regular' }} >{name}</Text>
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

TabIcons.propsTypes = {
    fetchUserData: PropTypes.func.isRequired,
    saveIdToken: PropTypes.func.isRequired,
    name: PropTypes.string,
    tintColor: PropTypes.string
}

const mapStateToProps = state => ({
    userData: state.fetch.userData,
    save: state.fetch.userIdToken
})

export default connect(mapStateToProps , { fetchUserData, saveIdToken })(TabIcons);