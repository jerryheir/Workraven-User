import React from "react";
import { 
    ImageBackground, 
    FlatList, 
    TouchableOpacity, 
    Dimensions, 
    Image, 
    View, 
    Text, 
    NetInfo,
    Platform,
    StyleSheet
} from "react-native";
import { data } from "../config/data";
import NotificationListAtom from "../Atoms/NotificationListAtom";
import { color } from "../Styles/Color";
import SemiCircleAtom from "../Atoms/SemiCircleAtom"
import { Thumbnail, Icon } from "native-base";
import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from 'react-native-popup-menu';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchUserData, saveIdToken } from "../Actions/fetchActions";
import * as Keychain from 'react-native-keychain';
import { BASE_URL } from '../config/api';

const { width } = Dimensions.get('window');
const PAYMENT_VIEW = width - 72;
const EACH = PAYMENT_VIEW / 3;

class NewUserProfile extends React.Component {
    async componentDidMount(){
        this.navListener = this.props.navigation.addListener(
            'didFocus',
            async (payload) => {
                this.setState({ loading: true });
                
                /*try {
                    const credentials = await Keychain.getGenericPassword();
                    if (credentials) {
                      let email = credentials.username;
                      let object = JSON.parse(credentials.password);
                      let userId = object.userId;
                      let token = object.token;
                    fetch(`${BASE_URL}/v1/users/${userId}`, {
                        method: 'GET',
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-user-token': token
                        }
                    }).then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({ 
                            firstname: responseJson.data.firstname, 
                            lastname: responseJson.data.lastname, 
                            image: responseJson.data.image_url ? responseJson.data.image_url : null,
                            userId,
                            token,
                            email: email,
                            loading: false
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    }
                  } catch (error) {
                    console.log('Keychain couldn\'t be accessed!', error);
                  }*/

            }
        );
    }

    static getDerivedStateFromProps(props, state){
        if (props.userData.firstname !== '' && props.userIdToken){
            return {
                firstname: props.userData.firstname, 
                lastname: props.userData.lastname, 
                image: props.userData.image_url ? props.userData.image_url : null,
                userId: props.userIdToken.userId ? props.userIdToken.userId : '',
                token: props.userIdToken.token ? props.userIdToken.token : '',
                email: props.userData.email,
                loading: false
            }
        }
        return null;
    }

    componentWillUnmount(){
        this.navListener.remove();
    }

    state = {
        firstname: '',
        lastname: '',
        image: null,
        loading: true,
        email: '',
        userId: '',
        token: ''
    }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: color.white }}>
        <View style={{ backgroundColor: color.white, height: Platform.OS === 'ios' ? 250 : 220, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <SemiCircleAtom color={"#E6E6FA"} />
            <Menu style={{
                position: "absolute",
                right: 21,
                top: 42,
                width: 21,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <MenuTrigger style={{ width: 50, alignItems: 'center' }}>
                    <Icon 
                    name="md-more"  
                    style={{ 
                        fontSize: 32,
                        color: '#828282'
                    }}
                    />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{ width: 100, padding: 8, marginTop: 15 }}>
                    <MenuOption
                    onSelect={() => console.log('Help Clicked!!')} 
                    >
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 14, color: '#828282' }}>Help</Text>
                    </MenuOption>
                    <MenuOption
                    onSelect={() => console.log('Legal Clicked!!')} 
                    >
                    <Text style={{ fontFamily: 'Lato-Regular', fontSize: 14, color: '#828282' }}>Legal</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
            <View
            style={{ 
                width: 172, 
                height: 172, 
                borderRadius: 86, 
                backgroundColor: '#E6E6FA',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
                <Thumbnail 
                source={this.state.image === null ? 
                    require('../assests/images/imagePlaceholder.png') 
                    : { uri: this.state.image }}
                style={{ width: 168, height: 168, borderRadius: 84 }}
                />
            </View>
        </View>
        <View style={{ flex: 1 }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 21,
                justifyContent: 'space-between',
                height: 50,
                width: '100%',
                borderBottomColor: '#F2F2F2', borderBottomWidth: 1,
                borderTopColor: '#F2F2F2', borderTopWidth: 1
            }}>
                <Text style={{ 
                    fontSize: 21, 
                    fontFamily: 'Lato-Bold',
                    color: '#828282'
                }}>{this.state.firstname + ' ' + this.state.lastname}</Text>
                <Icon 
                name="edit" 
                type="FontAwesome"
                style={{
                    fontSize: 30,
                    color: '#828282'
                }}
                onPress={()=>this.props.navigation.navigate('NewEditProfile', { 
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    // address: this.state.address,
                    email: this.state.email,
                    image: this.state.image,
                    userId: this.state.userId,
                    token: this.state.token
                 })}
                />
            </View>
            <View style={{ height: 45, backgroundColor: color.white, paddingLeft: 21, justifyContent: 'center' }}>
                <Text style={{ color: color.darkGray, fontFamily: 'Lato-Regular', fontSize: 12 }}>PAYMENTS</Text>
            </View>
            <View style={{ width: width - 42, flexDirection: 'row', paddingHorizontal: 21 }}>
            <TouchableOpacity>
                <ImageBackground
                source={require('../assests/images/card_green.png')} 
                style={{ flex: 1, padding: 11, justifyContent: 'flex-end', height: 100, width: EACH, position: "relative", borderRadius: 3}}
                >
                    <View style={{  }}>
                        <Text style={{color: "#FFF", fontSize: 12, fontWeight: '700' }}>{'4242 4242...'}</Text>
                        <Text style={{color: "#FFF", fontSize: 11 }}>{'Jeremiah N.'}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 15, marginRight: 15 }}>
                <ImageBackground
                source={require('../assests/images/wallet.png')}
                style={{ flex: 1, padding: 11, justifyContent: 'flex-end', height: 101.5, width: EACH, position: "relative", borderRadius: 3}}
                >
                    <Text style={{color: "#FFF", fontSize: 12 }}>{'\u20A6'} {20000.00}</Text>
                </ImageBackground>
            </TouchableOpacity>
                <TouchableOpacity
                style={{ borderRadius: 3, height: 100, width: EACH, backgroundColor: '#c0c0c0' }}
                >
                    <Text style={{ fontSize: 12, fontFamily: 'Lato-Bold', padding: 11, color: color.white }}>Add Promo Code</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 45, backgroundColor: color.white, paddingLeft: 21, justifyContent: 'center' }}>
                <Text style={{ color: color.darkGray, fontFamily: 'Lato-Regular', fontSize: 12 }}>NOTIFICATIONS</Text>
            </View>
            <FlatList
            data={data}
            renderItem={({ item }) => (
            <NotificationListAtom
                order={item.order}
                time={item.time}
            />
            )}
            />
        </View>
      </View>
    )
  }
}

NewUserProfile.propsTypes = {
    fetchUserData: PropTypes.func.isRequired,
    saveIdToken: PropTypes.func.isRequired,
    firstname: PropTypes.string,
    name: PropTypes.string,
    tintColor: PropTypes.string
}

const mapStateToProps = state => ({
    userData: state.fetch.userData,
    userIdToken: state.fetch.userIdToken
})

export default connect(mapStateToProps , { fetchUserData, saveIdToken })(NewUserProfile);
