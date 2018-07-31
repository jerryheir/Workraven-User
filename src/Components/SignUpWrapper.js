import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { color } from '../Styles/Color';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class  SignUpWrapper extends Component {
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.secondContainer}>
                <View style={{ width: SCREEN_WIDTH - 64, alignSelf: 'center'}}>
                    <Text style={styles.headerText}>
                        {this.props.headerText}
                    </Text>
                    <Text style={styles.headerContent}>
                    {this.props.subHeaderText}
                    </Text>
                </View>
                <KeyboardAvoidingView
                keyboardVerticalOffset={50}
                behavior="padding"
                style={styles.formContainer}
                >
                    {this.props.children}
                </KeyboardAvoidingView>
                <View style={styles.footer}>
                    <Text
                    style={styles.footerText}
                    >
                    Already have an account? <Text onPress={()=>this.props.navigation.navigate('Auth')} style={{color: color.primary, fontSize: 12 }}>Login</Text></Text>
                </View>
            </View>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageMap: {
    height: 150,
    width: SCREEN_WIDTH,
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
    marginTop: 60,
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
   fontSize: 13,
   lineHeight: 18,
  },
  formContainer: {
   marginTop: 20,
  },
  footer: {
    width: Dimensions.get('window').width - 64,
    height: 64,
    borderTopWidth: 2,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    borderTopColor: '#F2F2F2',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 10,
    color: color.gray,
    fontWeight: '700',
    marginTop: 10,
  }
});
