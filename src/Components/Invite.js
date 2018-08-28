import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Invite extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.secondContainer}>
        <View>
          <Image
            style={styles.imageMap}
            source={require('../assests/halfBlue.png')}
          />
          <View style={styles.iconHolder}>
          <TouchableOpacity
          style={styles.pointerContainer}
          onPress={() =>
            console.log('Button Clicked At Invites')}
          >
          <Image
            style={styles.pointer}
            source={require('../assests/pointer.png')}
          />
        </TouchableOpacity>
          </View>
          <View style={styles.header}>
            <Text style={styles.headerText1}>Invites</Text>
            <Text style={styles.headerText2}>Invite your friends and get N500 off your next job</Text>
          </View>
        </View>
        <View>
        <Image
            style={{ height: 576, width: 340.5, resizeMode: 'contain',
            marginTop: -170,   marginLeft: 40}}
            source={require('../assests/images/invites.png')}
          />
        </View>
          <View style={styles.referral}>
          <Text style={styles.referralText}>Referral Code</Text>
          <Text style={styles.code}>GJDH279J2L0</Text>
          <TouchableOpacity>
          <Text style={styles.copy}>COPY</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.socialCont}>
            <Text style={styles.iconText}>Share on:</Text>
            <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.social}>
           <Image
            style={styles.socialIcon}
            source={require('../assests/images/instagram_logo.png')}
          />
           </TouchableOpacity>
           <TouchableOpacity style={styles.social}>
           <Image
            style={styles.socialIcon}
            source={require('../assests/images/facebook_logo.png')}
          />
           </TouchableOpacity>
           <TouchableOpacity style={styles.social}>
           <Image
            style={styles.socialIcon}
            source={require('../assests/images/twitter_logo.png')}
          />
           </TouchableOpacity>
           <TouchableOpacity style={styles.social}>
           <Image
            style={styles.socialIcon}
            source={require('../assests/images/whatsapp_logo.png')}
          />
           </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageMap: {
    height: 180,
    width: 235,
    resizeMode: 'contain',
  },
  pointer: {
    width: 20,
    height: 15,
    resizeMode: 'contain'
  },
  iconHolder: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
  },
  referral: {
    backgroundColor: '#E6F3FC',
    borderWidth: 1,
    borderColor: '#BE64FF',
    width: 330,
    height: 40,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 400,
  },
  referralText: {
    color: '#828282',
    fontSize: 9,
    lineHeight: 14,
    marginTop: -10,
    marginLeft: 14,
    width: 70,
    height: 14,
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  code: {
    color: '#BE64FF',
    fontSize: 12,
    lineHeight: 14,
    fontWeight: 'bold',
    marginTop: 12,
    marginLeft: -65,
  },
  copy: {
    color: '#000000',
    lineHeight: 14,
    fontSize: 12,
    marginTop: 12,
    marginLeft: 165,
  },
  pointerContainer: {
    marginTop: 40,
    marginLeft: 23,
   },
   header: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    marginTop: 50,
    marginLeft: 23,
   },
   headerText1: {
     color: '#333333',
     fontSize: 30,
     fontWeight: 'normal',
     lineHeight: 45,
     height: 46,
     width: 140,
     marginTop: 15,
   },
   headerText2: {
    color: '#C190C7',
    fontSize: 14,
    lineHeight: 14,
    height: 30,
    width: 250,
  },
  secondContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  iconText: {
    color: '#828282',
    fontSize: 12,
    lineHeight: 12,
    marginTop: 30,
    marginLeft: 90,
    marginBottom: 25,
  },
  socialIcon: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginTop: 15,

  },
  imageContainer: {
  display: 'flex',
  flexDirection: 'row',
  marginLeft: 78,

  },
  social: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#F5F5F5',
    backgroundColor: '#FFFFFF',
    marginLeft: 5,
    marginTop: -10
  },
  socialCont: {
    backgroundColor: '#F5F9FC',
    height: 140,
    width: SCREEN_WIDTH,
    marginTop: -130
  },
});
