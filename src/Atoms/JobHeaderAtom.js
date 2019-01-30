import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { color } from '../Styles/Color';
import * as Progress from 'react-native-progress';
import { Icon, Thumbnail } from 'native-base';

export default class JobHeaderAtom extends PureComponent {
  state = {
    show: true
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <Icon 
          name="md-close" 
          style={{ fontSize: 27, marginTop: 15, color: this.props.removeClose ? "transparent" : "orange" }} 
          disabled={this.props.removeClose ? true : false}
          />

          {
            (this.props.remove === false) &&
            <View style={styles.iconsView}>
              <Icon 
              type={'Entypo'}
              name="chat"
              style={{ fontSize: 21, color: '#828282' }}
              />
              <Icon 
              name="md-call"
              style={{ marginLeft: 18, fontSize: 21, color: '#828282' }}
              />
              <Thumbnail 
              source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTatLcdUILhYeqRGhrM2l5FJL3xEY_L3Z8PTfJDPeTIpGpJCLQ6xg" }} 
              style={{ height: 28, width: 28, borderRadius: 14, marginLeft: 18 }}
              />
              <Icon 
              name="md-notifications-outline" 
              style={{ marginLeft: 18, fontSize: 21, color: '#828282' }}
              />
            </View>
          }
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.title}>{this.props.title}</Text>
          {
            (this.props.completed === "true") && 
            <View style={{ 
              borderRadius: 4,
              backgroundColor: '#ECFF0F',
              height: 18, 
              paddingHorizontal: 10, 
              justifyContent: 'center',
              marginLeft: 12
              }}
            >
              <Text style={{ fontFamily: 'Lato-Regular', fontSize: 11 }}>Completed</Text>
            </View>
          }
          {
            (this.props.completed === "rejected") && 
            <View style={{ 
              borderRadius: 4,
              backgroundColor: '#ECFF0F',
              height: 18, 
              paddingHorizontal: 10, 
              justifyContent: 'center',
              marginLeft: 12
              }}
            >
              <Text style={{ fontFamily: 'Lato-Regular', fontSize: 11 }}>Rejected</Text>
            </View>
          }
        </View>
        <View style={{ borderBottomColor: "#C0C0C0", borderBottomWidth: 1.7 }} />
        <Progress.Bar 
        indeterminate={this.props.indeterminate} 
        height={2.5}
        width={null} 
        color={color.primary} 
        borderWidth={0}
        borderRadius={.5}
        progress={this.props.progress}
        style={{ position: 'absolute', top: 110.5, left: 21, bottom: 0, right: 21 }}
        />
        <Text style={styles.subtitle}>{this.props.subtitle}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      height: Platform.OS === 'ios' ? 148 : 148,
      width: '100%',
      backgroundColor: color.white,
      padding: 21
    },
    iconsView: {
      flexDirection: "row",
      marginTop: 15
    },
    topView: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    title: {
      fontSize: 24,
      fontFamily: 'HindGuntur-Light',
    },
    subtitle: {
      fontSize: 10,
      paddingTop: 8,
      fontFamily: "Lato-Regular",
      color: '#828282'
    }
})
