import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { color } from '../Styles/Color';

export default class GridBookingAtom extends React.Component {
  render() {
    return (
          <View style={styles.gridView}>
            <View style={[styles.circle, {backgroundColor: this.props.item.color}]}><Text style={{fontSize: 13, fontStyle: 'italic', fontWeight: '400'}}>{this.props.item.date}</Text></View>
                <TouchableOpacity style={styles.elevated}>
                    <View style={{ flexDirection: 'row', height: 50, width: 80, alignSelf: 'center', alignItems: 'center' }}>
                        <Image style={styles.tagImage} source={require('../assests/images/pipe.png')} /><Image style={{ width: 40, height: 40, borderRadius: 21 }} source={{ uri: this.props.item.uri }} />
                    </View>
                    <Text style={styles.itemIssue}>{this.props.item.issue}</Text>
                    <Text style={styles.itemName}>{this.props.item.name}</Text>
                    <Text style={styles.itemAmount}>{this.props.item.amount}</Text>
                </TouchableOpacity>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    height: 170,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    marginLeft: 23
  },
  elevated: {
    backgroundColor: color.white,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOpacity: 2.5,
    shadowOffset: { width: 2, height: 3 },
    position: "absolute",
    padding: 15,
    top: 32,
    right: 15,
    height: 113,
    width: 110
  },
  circle: {
      height: 50,
      width: 50,
      borderRadius: 26,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
  },
  tagImage: {
      width: 20,
      height: 20,
      borderRadius: 11
  },
  itemIssue: {
      fontSize: 12,
      fontWeight: '500',
      color: "#6FCF97"
  },
  itemName: {
      color: "#4F4F4F",
      fontSize: 10
  },
  itemAmount: {
      fontSize: 10,
      color: "#828282"
  }
});
