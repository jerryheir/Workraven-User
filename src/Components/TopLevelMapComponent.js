import React, {Component} from 'react';
import { StyleSheet, View, YellowBox, AsyncStorage } from 'react-native';
import MapView from 'react-native-maps';
import MapComponent from './MapComponent';
import MarkerAtom from '../Atoms/MarkerAtom';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader requires main queue setup',
  'Module RNFetchBlob requires main queue setup',
  "Can't call",
  'Class RCTCxxModule',
]);

export default class TopLevelMapComponent extends Component {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});
