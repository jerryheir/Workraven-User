import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React from "react";
import { StyleSheet, View } from "react-native";
var mapStyle = require("../config/mapStyle.json");
var pinkMapStyle = require("../config/pinkMapStyle.json");

export default class MapComponent extends React.Component {
 render() {
   return (
     <View style ={styles.container}>
       <MapView
         provider={ PROVIDER_GOOGLE }
         style={this.props.pinkStyle ? { flex: 1 } : styles.map}
         initialRegion={{
          latitude: 37.798790,
          longitude: -122.442753,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
         }}
         customMapStyle={this.props.pinkStyle ? pinkMapStyle : mapStyle}
         zoomEnabled={false}
       >
       {this.props.children}
       </MapView>
     </View>
   );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    // flex: 1
    position: 'absolute',
    bottom: -30,
    top: 0,
    right: 0,
    left: 0
  }
});