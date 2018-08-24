import MapView from 'react-native-maps';
import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class MapComponent extends React.Component {
 render() {
   // const { region } = this.props;
   // console.log(region);
   return (
     <View style ={styles.container}>
       <MapView
         style={styles.map}
         region={{
           latitude: 37.78825,
           longitude: -122.4324,
           latitudeDelta: 0.015,
           longitudeDelta: 0.0121,
         }}
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