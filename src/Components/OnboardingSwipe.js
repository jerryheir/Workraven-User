import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
import ButtonAtom from '../Atoms/ButtonAtom';
import TinyWhiteButton from '../Atoms/TinyWhiteButton';

const SCREEN_WIDTH = Dimensions.get('window').width;

class TriangleUp extends React.Component {
  render(){
    return (
      <View style={[styles.triangle, this.props.style]} />
    )
  }
}

class TriangleDown extends React.Component {
  render(){
    return (
      <TriangleUp style={[styles.triangleDown, this.props.style]}/>
    )
  }
}

class Parallelogram extends React.Component {
  render(){
    return (
      <View style={styles.parallelogram}>
        
        <View style={styles.parallelogramInner}>
          {this.props.children}
        </View>
        <TriangleDown style={styles.parallelogramLeft} />
        <TriangleUp style={styles.parallelogramRight} />
      </View>
    )
  }
}

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
      console.log('Index is ' + state.index)
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
                style={{ height: 325, width: 235.5 }}
                source={require('../assests/onboarding2.png')}
              />
            </View>
            <Parallelogram>
              <Text style={styles.firstText}>
          Aut dignissimos
              </Text>
              <Text style={styles.secondText}>
          Aut dignissimos quibusdam et laborum quibusdam.
              </Text>
            </Parallelogram>
          </View>
          <View>
            <View style={styles.cover}>
              <Image
                style={{ height: 325, width: 235.5 }}
                source={require('../assests/onboarding1.png')}
              />
            </View>
            <Parallelogram>
              <Text style={styles.firstText}>
          Aut dignissimos
              </Text>
              <Text style={styles.secondText}>
          Aut dignissimos quibusdam et laborum quibusdam.
              </Text>
              </Parallelogram>
          </View>
          <View>
            <View style={styles.cover}>
              <Image
                style={{ height: 325, width: 235.5 }}
                source={require('../assests/onboarding3.png')}
              />
            </View>
            <Parallelogram>
              <Text style={styles.firstText}>
          Aut dignissimos
              </Text>
              <Text style={styles.secondText}>
          Aut dignissimos quibusdam et laborum quibusdam.
              </Text>
              </Parallelogram>
          </View>
        </Swiper>
        <View>
          <TinyWhiteButton
          onPress={this.skip}
          text={'Skip'}
          />
          <ButtonAtom
          style={(this.state.disabled === true) ? styles.disabled : styles.footer}
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
    height: 18,
    paddingBottom: 16,
    fontSize: 14,
    lineHeight: 18,
    alignSelf: 'center',
    color: '#4F4F4F',
    fontWeight: 'bold',

  },
  secondText: {
    fontSize: 14,
    lineHeight: 15,
    paddingTop: 8,
    paddingLeft: 38,
    paddingRight: 38,
    textAlign: 'center',
    color: '#C190C7'
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
    width: SCREEN_WIDTH,
    backgroundColor: '#d4c1dd',
   },
  footer: {
    height: 70,
    width: SCREEN_WIDTH,
    backgroundColor: '#BE64FF',

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
