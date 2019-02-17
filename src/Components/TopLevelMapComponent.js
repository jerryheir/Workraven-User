import React, {Component} from 'react';
import { StyleSheet, View, Platform, PermissionsAndroid, ToastAndroid } from 'react-native';
import MapView from 'react-native-maps';
import MapComponent from './MapComponent';
import MarkerAtom from '../Atoms/MarkerAtom';
import Geolocation from 'react-native-geolocation-service';
import { connect } from "react-redux";
import { currentLocation, saveLocationFromAsync } from "../Actions/fetchActions";

class TopLevelMapComponent extends Component {
  constructor(props){
    super(props);
    this.watchId = null;
  }

  async componentDidMount() {
    await this.getLocation()
  }

  state = {
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
  render() {
    return (
      <View style={styles.container}>
        <MapComponent>
        <MapView.Marker
          coordinate={{
            latitude: 6.502700,
            longitude: 3.378530
          }}
          >
            <MarkerAtom />
          </MapView.Marker>
          <MapView.Marker
          coordinate={{
            latitude: 6.499200,
            longitude: 3.378530
          }}
          >
            <MarkerAtom />
          </MapView.Marker>
          <MapView.Marker
          coordinate={{
            latitude: 6.501950,
            longitude: 3.383360
          }}
          >
            <MarkerAtom />
          </MapView.Marker>
        </MapComponent>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.fetch.userData,
  save: state.fetch.userIdToken
})

export default connect(mapStateToProps , { currentLocation, saveLocationFromAsync })(TopLevelMapComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});
