import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  Platform
} from 'react-native';
import Swiper from 'react-native-swiper';
import ButtonAtom from '../Atoms/ButtonAtom';
import TinyWhiteButton from '../Atoms/TinyWhiteButton';
import * as Keychain from 'react-native-keychain';

const width = Platform.OS === 'ios' ? 235 : 200;
const height = Platform.OS === 'ios' ? 325 : 275;

export default class OnboardingSwipe extends React.Component {
    state = {
         autoplay: true,
         disabled: true,
    }

   skip = () => {
    this.setState({
        autoplay: false,
        disabled: false
    })
   }
   goToLogin = () => {
     this.props.navigation.navigate('Auth');
   }
   onMomentumScrollEnd = (a, state, context) => {
    if (state.index === 2) {
      this.skip();
    }
   }

  render() {
    return (
      <View style={styles.container}>
      <View style={{height: 30, backgroundColor: '#FFF', width: '100%'}}/>
        <Swiper
         loop={false} autoplay={this.state.autoplay} activeDotColor='#7b05b2'
         onMomentumScrollEnd={this.onMomentumScrollEnd}
         >
          <View>
            <View style={styles.cover}>
              <Image
                style={{ height: height, width: width }}
                source={require('../assests/onboarding2.png')}
              />
            </View>
            <ImageBackground 
            source={require('../assests/images/rectangleOnboard.png')} 
            style={{ 
              alignSelf: 'center', 
              marginTop: 20, 
              padding: 10,
              paddingVertical: 20,

            }}
            resizeMode="contain"
            >
                <Text style={styles.firstText}>
                  Aut dignissimos
                </Text>
                <Text style={styles.secondText}>
                  Aut dignissimos quibusdam et laborum quibusdam.
                </Text>
            </ImageBackground>
          </View>
          <View>
            <View style={styles.cover}>
              <Image
                style={{ height: height, width: width }}
                source={require('../assests/onboarding1.png')}
              />
            </View>
            <ImageBackground 
            source={require('../assests/images/rectangleOnboard.png')} 
            style={{ 
              alignSelf: 'center', 
              marginTop: 20, 
              padding: 10,
              paddingVertical: 20,

            }}
            resizeMode="contain"
            >
                <Text style={styles.firstText}>
                  Aut dignissimos
                </Text>
                <Text style={styles.secondText}>
                  Aut dignissimos quibusdam et laborum quibusdam.
                </Text>
            </ImageBackground>
          </View>
          <View>
            <View style={styles.cover}>
              <Image
                style={{ height: height, width: width }}
                source={require('../assests/onboarding3.png')}
              />
            </View>
            <ImageBackground 
            source={require('../assests/images/rectangleOnboard.png')} 
            style={{ 
              alignSelf: 'center', 
              marginTop: 20, 
              padding: 10,
              paddingVertical: 20,

            }}
            resizeMode="contain"
            >
                <Text style={styles.firstText}>
                  Aut dignissimos
                </Text>
                <Text style={styles.secondText}>
                  Aut dignissimos quibusdam et laborum quibusdam.
                </Text>
            </ImageBackground>
          </View>
        </Swiper>
        <View>
          <TinyWhiteButton
          onPress={this.skip}
          text={'Skip'}
          />
          <ButtonAtom
          style={[ styles.disabled, { backgroundColor: this.state.disabled ? '#d4c1dd' : '#BE64FF' } ]}
          disabled={this.state.disabled}
          onPress={this.goToLogin}
          text={'Next'}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  cover: {
    alignSelf: 'center',
    marginTop: 10,
  },
  firstText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#4F4F4F',
    fontWeight: 'bold',
    fontFamily: 'Lato-Regular',
  },
  secondText: {
    fontSize: 14,
    paddingTop: 8,
    paddingLeft: 38,
    paddingRight: 38,
    textAlign: 'center',
    color: '#C190C7',
    fontFamily: 'Lato-Regular',
  },
  textContainer: {
    height: 85,
    width: 303,
    backgroundColor: '#FFF5FD',
    marginTop: 30,
    alignSelf: 'center'
  },
  disabled: {
    height: 70,
    width: '100%',
    backgroundColor: '#d4c1dd',
    justifyContent: 'center',
    alignItems: 'center'
   },
  footer: {
    height: 70,
    width: '100%',
    backgroundColor: '#BE64FF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  parallelogram: {
    width: 150,
    height: 100,
    marginTop: 20
  },
  parallelogramInner: {
    position: 'absolute',
    left: 65,
    top: 0,
    backgroundColor: '#FFF5FD',
    width: 240,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  parallelogramRight: {
    top: 0,
    right: -205,
    position: 'absolute'
  },
  parallelogramLeft: {
    top: 0,
    left: 15,
    position: 'absolute'
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFF5FD'
  },
  triangleDown: {
    transform: [
      {rotate: '180deg'}
    ]
  }
});
