import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import GridView from 'react-native-super-grid';
import GridBookingAtom from "../Atoms/GridBookingAtom";

export default class Booking extends Component {
  render() {
    const items = [
      { name: 'Jeremiah N.', color: "#D8E3BA", date: '14/02', amount: 'N 5,000', issue: 'Broken Pipe', uri: 'https://www.dhhd.com/' }, { name: 'Emmanuel', date: '14/02', color: "#D8E3BA", amount: 'N 5,000', issue: 'Broken Pipe', uri: 'https://www.dhhd.com/' },
      { name: 'Promise', date: '14/02', color: "#70D4FF", amount: 'N 5,000', issue: 'Broken Pipe', uri: 'https://www.dhhd.com/' }, { name: 'Tochi', date: '14/02', amount: 'N 5,000', color: "#F2F2F2" ,issue: 'Broken Pipe', uri: 'https://www.dhhd.com/' },
      { name: 'Nwaeze', date: '14/02', color: "#ECFF0F", amount: 'N 5,000', issue: 'Broken Pipe', uri: 'https://www.dhhd.com/'}, { name: 'Goodness O.', date: '14/02', color:"#ECFF0F", amount: 'N 5,000', issue: 'Broken Pipe', uri: 'https://www.dhhd.com/' },
      { name: 'Blessing', date: '14/02', color: "#70D4FF", amount: 'N 5,000', issue: 'Broken Pipe', uri: 'https://www.dhhd.com/' }, { name: 'Panda Panda', date: '14/02', color: "#D8E3BA", amount: 'N 5,000', issue: 'Broken Pipe', uri: 'https://www.dhhd.com/' },
    ];
    const itemWidth = Dimensions.get('window').width / 2 - 60;
    return (
        <ScrollView>
            <View style={styles.viewPad}>
                <View>
                    <Text style={{ fontSize: 24, color: 'black' }}>Bookings</Text>
                    <Text style={{ fontSize: 12, color: 'black' }}>All your past bookings</Text>
                </View>
                <TouchableOpacity><Image source={require('../assests/notification.png')} style={{ width: 19, height: 19 }} /></TouchableOpacity>
            </View>
            <GridView
                itemDimension={itemWidth}
                items={items}
                style={styles.gridView}
                renderItem={item => (<GridBookingAtom item={item} />)}
            />
        </ScrollView>
      
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
    marginLeft: 46,
    alignContent: 'center',
    alignSelf: 'center',
  },
  viewPad: {
    height: 120,
    width: '100%',
    paddingLeft: 21,
    paddingRight: 21,
    padding: 36,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
