import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  ToastAndroid,
  Clipboard,
  TouchableOpacity,
} from 'react-native';
import NotificationIconAtom from '../Atoms/NotificationIconAtom';
import { connect } from "react-redux";
import { color } from '../Styles/Color';
import SemiCircleAtom from '../Atoms/SemiCircleAtom';
import Share from 'react-native-share';

const SCREEN_WIDTH = Dimensions.get('window').width;
const shareOptions = {
  title: "WorkRaven",
  message: "Hey there, I just got an artisan from WorkRaven",
  url: "http://karixchange.com/",
};
const shareTweet = {
  title: "WorkRaven",
  message: "Hey there, I just got an artisan from WorkRaven",
  url: "http://karixchange.com/",
  social: Share.Social.TWITTER
};
let shareInsta = {
  title: "WorkRaven",
  message: "Hey there, I just got an artisan from WorkRaven",
  url: "http://karixchange.com/",
  social: Share.Social.INSTAGRAM
};

let shareWhatsapp = {
  title: "WorkRaven",
  message: "Hey there, I just got an artisan from WorkRaven",
  url: "http://karixchange.com/",
  social: Share.Social.WHATSAPP
};

class Invite extends Component {
  constructor(props){
    super(props);
    this.timer = null
  }
  state = {
    copied: false
  }
  componentWillUnmount(){
    clearTimeout(this.timer);
  }

  onPressShare = (name) => {
    Share.shareSingle(Object.assign(shareOptions, {
      "social": name
    }));
  }
  render() {
    return (
      <View style={styles.container}>
       {
         this.state.copied && 
        <View style={{ 
          width: 150, 
          alignItems: 'center', 
          justifyContent: 'center', 
          alignSelf: 'center', 
          padding: 5,
          borderRadius: 8,
          position: 'absolute',
          top: 350,
          left: (Dimensions.get('window').width / 2) - 75,
          backgroundColor: 'rgba(0, 0, 0, 0.45)'
        }}>
          <Text style={{ fontFamily: 'Lato-Regular', color: 'white', fontSize: 10 }}>Copied to clipboard</Text>
        </View>
       }
          <TouchableOpacity style={{ 
          height: 32, 
          width: 32, 
          borderRadius: 16, 
          backgroundColor: color.white,
          position: 'absolute', 
          top: 32, 
          right: 21, 
          zIndex: 999,
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowOpacity: 1,
          shadowOffset: { width: 0, height: 1 },
          elevation: 3
        }}
        onPress={()=>this.props.navigation.navigate('Notification')}
        >
            <NotificationIconAtom />
        </TouchableOpacity>
        <SemiCircleAtom />
        <View style={{ width: 250 }}>
          <Text style={{
            fontSize: 24,
            fontFamily: 'Lato-Regular',
            paddingTop: 42,
            paddingLeft: 21,
            paddingBottom: 8
          }}>Invites</Text>
          <Text style={{
            fontSize: 12,
            fontFamily: "Lato-Light",
            paddingLeft: 21
          }}>Invite your friends and get N500 off your next job.</Text>
        </View>
          <Image
            style={{ 
              height: 250, 
              width: SCREEN_WIDTH - 42, 
              resizeMode: 'contain',
              alignSelf: 'center'
            }}
            source={require('../assests/images/invites.png')}
          />
          <Text style={styles.referralText}>Referral Code</Text>
          <View style={styles.referral}>
            <Text style={styles.code}>{this.props.userData.referral_code}</Text>
              <TouchableOpacity
              onPress={()=>{
                Clipboard.setString(this.props.userData.referral_code),
                ToastAndroid.show('Copied to Clipboard', ToastAndroid.SHORT)
                if (Platform.OS === 'ios'){
                  this.setState({ copied: true },
                    ()=> this.timer = setTimeout(()=>this.setState({ copied: false }), 1000))
                }
              }}
              >
                <Text style={styles.copy}>COPY</Text>
              </TouchableOpacity>
          </View>
        <View style={styles.socialCont}>
            <Text style={styles.iconText}>Share on:</Text>
            <View style={styles.imageContainer}>
          <TouchableOpacity 
          style={[styles.social, { marginLeft: 0 }]}
          onPress={()=>{
            Share.shareSingle(shareInsta);
          }}
          >
           <Image
            style={styles.socialIcon}
            source={require('../assests/images/instagram_logo.png')}
          />
           </TouchableOpacity>
           <TouchableOpacity 
           style={styles.social}
           onPress={()=>this.onPressShare("facebook")}
           >
           <Image
            style={styles.socialIcon}
            source={require('../assests/images/facebook_logo.png')}
          />
           </TouchableOpacity>
           <TouchableOpacity 
           style={styles.social}
           onPress={()=>{
              Share.shareSingle(shareTweet);
           }}
           >
           <Image
            style={styles.socialIcon}
            source={require('../assests/images/twitter_logo.png')}
          />
           </TouchableOpacity>
           <TouchableOpacity 
           style={styles.social}
           onPress={()=>{
              Share.shareSingle(shareWhatsapp);
           }}
           >
           <Image
            style={styles.socialIcon}
            source={require('../assests/images/whatsapp_logo.png')}
          />
           </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.fetch.userData
})

export default connect(mapStateToProps)(Invite);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#BE64FF',
    width: 330,
    height: 40,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 21,
    alignSelf: 'center',
  },
  referralText: {
    color: '#828282',
    fontSize: 9,
    marginLeft: 21,
    backgroundColor: '#ffffff',
    textAlign: 'left'
  },
  code: {
    color: '#BE64FF',
    fontSize: 12,
    fontFamily: 'Lato-Bold'
  },
  copy: {
    color: '#000000',
    fontSize: 12,
  },
  pointerContainer: {
    marginTop: 40,
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

  iconText: {
    color: '#828282',
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    marginTop: 21,
    marginLeft: 42,
    marginBottom: 21
  },
  socialIcon: {
    height: 20,
    width: 20,
    alignSelf: 'center'
  },
  imageContainer: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    justifyContent: 'center'
  },
  social: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#F5F5F5',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20
  },
  socialCont: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#E6E6FA',
    height: 140,
    width: SCREEN_WIDTH,
  },
});
