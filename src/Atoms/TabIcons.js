import React from "react";
import { Image, PermissionsAndroid, ImageBackground, Platform, ToastAndroid, View, Text } from "react-native";
import { Icon } from "native-base";
// import { BASE_URL } from '../config/api';
import * as Keychain from 'react-native-keychain';
import Geolocation from 'react-native-geolocation-service';
// import { color } from "../Styles/Color";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchUserData, saveIdToken, currentLocation, saveLocationFromAsync } from "../Actions/fetchActions";
import { storeItem, retrieveItem } from "../Functions";

class TabIcons extends React.Component {
    constructor(props){
        super(props);
        this.watchId = null;
    }
    async componentDidMount() {
        try {
            Keychain.getGenericPassword().then((data)=>{
                console.log(data)
                if (data){
                    console.log('true')
                    let credentials = data;
                    // let email = credentials.username;
                    let { userId, token } = JSON.parse(credentials.password);
                    console.log(userId, token);
                    this.getLocation()
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
            console.log(props.userData.firstname)
            return {
                username: props.userData.firstname
            }
        }
        return null;
    }

    state = {
        username: '',
        loading: false,
        updatesEnabled: false,
        location: {}
    }

    hasLocationPermission = async () => {
        if (Platform.OS === 'ios' ||
            (Platform.OS === 'android' && Platform.Version < 23)) {
          return true;
        }
    
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
    
        if (hasPermission) return true;
    
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
    
        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;
    
        if (status === PermissionsAndroid.RESULTS.DENIED) {
          ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
        }

        return false;
    }

    getLocation = async () => {
        const hasLocationPermission = await this.hasLocationPermission();
    
        if (!hasLocationPermission) return;
    
        this.setState({ loading: true }, () => {
        if (Platform.OS === 'android'){
          Geolocation.getCurrentPosition(
            (position) => {
              this.setState({ location: position, loading: false });
              console.log(position);
              retrieveItem('currentLocate').then((data)=>{
                  if (!data || data === null){
                    this.props.currentLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
                  } else {
                    let location = JSON.parse(data);
                    if (location.latitude === position.coords.latitude && location.longitude === position.coords.longitude){
                        console.log('They are equal!');
                        this.props.saveLocationFromAsync(location);
                    } else {
                        this.props.currentLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
                    }
                  }
              })
              // this.props.currentLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            },
            (error) => {
              this.setState({ location: error, loading: false });
              console.log(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50 }
          );
        } else {
            this.setState({ updatesEnabled: true }, () => {
                this.watchId = Geolocation.watchPosition(
                  (position) => {
                    this.setState({ location: position });
                    console.log(position);
                  },
                  (error) => {
                    this.setState({ location: error });
                    console.log(error);
                  },
                  { enableHighAccuracy: true, distanceFilter: 0, interval: 5000, fastestInterval: 2000 }
                );
              });
        }
        });
    }
    /*
    getLocationUpdates = async () => {
        const hasLocationPermission = await this.hasLocationPermission();
    
        if (!hasLocationPermission) return;
    
        this.setState({ updatesEnabled: true }, () => {
          this.watchId = Geolocation.watchPosition(
            (position) => {
              this.setState({ location: position });
              console.log(position);
            },
            (error) => {
              this.setState({ location: error });
              console.log(error);
            },
            { enableHighAccuracy: true, distanceFilter: 0, interval: 5000, fastestInterval: 2000 }
          );
        });
      }*/
    
      removeLocationUpdates = () => {
          if (this.watchId !== null) {
              Geolocation.clearWatch(this.watchId);
              this.setState({ updatesEnabled: false })
          }
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
                    <Icon name="ios-list-box" style={{ color: tintColor, alignSelf: 'center', textAlign: 'center', fontSize: 22 }} />
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

export default connect(mapStateToProps , { fetchUserData, saveIdToken, currentLocation, saveLocationFromAsync })(TabIcons);