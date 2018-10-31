import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { color } from '../Styles/Color';

export default class  LoginWrapper extends Component {
  render() {
    return (
        <KeyboardAwareScrollView
        // scrollEnabled={Platform.OS === 'ios' ? false : true}
        overScrollMode='never'
        keyboardShouldPersistTaps='always'
        keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'interactive'}
        style={{ backgroundColor: '#FFF' }}
        >
        <View
        style={styles.container}
        >
        <View style={{ width: '100%'}}>
          <Image
            style={styles.imageMap}
            source={require('../assests/images/map_backgroundclear.png')}
          />
        </View>
        <View style={styles.secondContainer}>
        <View style={{ width: Dimensions.get('window').width - 64, alignSelf: 'center'}}>
          <Text style={styles.headerText}>
            {this.props.headerText}
          </Text>
          <Text style={styles.headerContent}>
          {this.props.subHeaderText}
          </Text>
        </View>
        <View
        style={styles.formContainer}>
            {this.props.children}
        </View>
        {this.props.forgetPassword && 
        <View style={styles.viewForText}><Text onPress={this.props.forgetPassword} style={styles.passText}>Forgot Password?</Text></View>
        }
        <View style={styles.footer}>
          <Text
          style={styles.footerText}
          >
          Don't have an account?</Text>
          <TouchableOpacity
          style={styles.footerButton}
          onPress={this.props.signUp}
          >
          <Text
          style={styles.footerButtonText}
          >{this.props.buttonText}</Text>
          </TouchableOpacity>
        </View>
        </View>
        </View>
        </KeyboardAwareScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  imageMap: {
    height: Platform.OS === 'ios' ? 145 : 150,
    width: '100%'
  },
  pointerContainer: {
    marginTop: 20,
    marginLeft: 23,
   },
   pointer: {
     width: 20,
     height: 15,
     resizeMode: 'contain'
   },
  secondContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  headerText: {
   height: 46,
   fontSize: 24,
   fontWeight: 'bold',
   color: '#000000',
   marginTop: 15,
   marginLeft: 0,
  },
  headerContent: {
   height: 36,
   width: 250,
   marginLeft: 0,
   color: '#828282',
   fontWeight: 'normal',
   fontSize: 13
  },
  formContainer: {
   marginTop: 20,
  },
  viewForText: {
    width: 180,
    alignSelf: 'center',
    paddingTop: 21,
    marginBottom: Platform.OS === 'ios' ? 15 : 0,
    paddingBottom: 21,
  },
  passText: {
    textAlign: 'center',
    color: '#C190C7',
    fontWeight: 'bold',
    fontSize: 12
  },
  footer: {
    width: Dimensions.get('window').width - 64,
    borderTopWidth: 2,
    alignSelf: 'center',
    borderTopColor: '#F2F2F2',
  },
  footerButton: {
    backgroundColor: '#FFFFFF',
    height: 26,
    width: 63,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#C190C7',
    alignSelf: 'center',
    marginBottom: 15,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 1 },
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 13,

  },
  footerText: {
    textAlign: 'center',
    fontSize: 10,
    color: color.gray,
    fontWeight: '700',
    marginTop: 10,
  },
  footerButtonText: {
    color: '#4F4F4F',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '700',
  }
});
