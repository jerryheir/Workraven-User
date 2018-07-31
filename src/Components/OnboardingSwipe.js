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
    console.log(state, context.state);
    var index = index++;
    if (index === 3) {
      console.log('Index is ' + index )
      this.skip()
    }
   }

  render() {
    return (
      <View style={styles.container}>
      <View style={{height: 30, backgroundColor: '#FFF', width: '100%'}}/>
        <Swiper //style={styles.wrapper}
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
            <View style={styles.textContainer}>
              <Text style={styles.firstText}>
          Aut dignissimos
              </Text>
              <Text style={styles.secondText}>
          Aut dignissimos quibusdam et laborum quibusdam.
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.cover}>
              <Image
                style={{ height: 325, width: 235.5 }}
                source={require('../assests/onboarding1.png')}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.firstText}>
          Aut dignissimos
              </Text>
              <Text style={styles.secondText}>
          Aut dignissimos quibusdam et laborum quibusdam.
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.cover}>
              <Image
                style={{ height: 325, width: 235.5 }}
                source={require('../assests/onboarding3.png')}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.firstText}>
          Aut dignissimos
              </Text>
              <Text style={styles.secondText}>
          Aut dignissimos quibusdam et laborum quibusdam.
              </Text>
            </View>
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
    fontSize: 14,
    marginTop: 20,
    lineHeight: 18,
    alignSelf: 'center',
    color: '#4F4F4F',
    fontWeight: 'bold',

  },
  secondText: {
    height: 31,
    width: 300,
    fontSize: 14,
    marginTop: 8,
    marginLeft: 50,
    lineHeight: 15,
    marginBottom: 30,
    alignSelf: 'center',
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

  }
});
