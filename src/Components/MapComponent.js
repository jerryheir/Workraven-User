import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React from "react";
import { StyleSheet, View, Text } from "react-native";
var mapStyle = require("../config/mapStyle.json");

export default class MapComponent extends React.Component {
 render() {
   // const { region } = this.props;
   // console.log(region);
   return (
     <View style ={styles.container}>
       <MapView
         // provider={'google'}
         style={styles.map}
         region={{
           latitude: 37.78825,
           longitude: -122.4324,
           latitudeDelta: 0.015,
           longitudeDelta: 0.0121,
         }}
         customMapStyle={mapStyle}
       >
       {this.props.children}
       </MapView>
     </View>
   );
 }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      // justifyContent: 'flex-end',
      // alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
});