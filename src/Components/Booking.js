import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import GridView from 'react-native-super-grid';
import GridBookingAtom from "../Atoms/GridBookingAtom";

export default class Booking extends Component {
  render() {
    const items = [
      { name: 'Jeremiah N.', date: '14/02', amount: 'N 5,000', issue: 'Broken Pipe', uri: 'https://i.stack.imgur.com/ILTQq.png' }, { name: 'Emmanuel', date: '14/02', amount: 'N 5,000', issue: 'Broken Pipe', uri: 'https://i.stack.imgur.com/ILTQq.png' },
      { name: 'Promise', date: '14/02', amount: 'N 5,000', issue: 'Broken Pipe', uri: 'https://i.stack.imgur.com/ILTQq.png' }, { name: 'Tochi', date: '14/02', amount: 'N 5,000', issue: 'Broken Pipe', uri: 'https://i.stack.imgur.com/ILTQq.png' },
      { name: 'Nwaeze', date: '14/02', amount: 'N 5,000', issue: 'Broken Pipe', uri: 'https://i.stack.imgur.com/ILTQq.png'}, { name: 'Goodness O.', date: '14/02', amount: 'N 5,000', issue: 'Broken Pipe', uri: 'https://i.stack.imgur.com/ILTQq.png' },
      { name: 'Blessing', date: '14/02', amount: 'N 5,000', issue: 'Broken Pipe', uri: 'https://i.stack.imgur.com/ILTQq.png' }, { name: 'Panda Panda', date: '14/02', amount: 'N 5,000', issue: 'Broken Pipe', uri: 'https://i.stack.imgur.com/ILTQq.png' },
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
