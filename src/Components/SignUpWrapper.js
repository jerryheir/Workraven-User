import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import { color } from '../Styles/Color';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SignUpWrapper extends Component {
  render() {
    return (
        <KeyboardAwareScrollView
        overScrollMode='never'
        keyboardShouldPersistTaps='always'
        keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'interactive'}
        style={{ backgroundColor: '#FFF' }}
        >
        <View style={styles.container}>
                <View style={{ width: SCREEN_WIDTH - 42, alignSelf: 'center', paddingTop: Platform.OS === "ios" ? 42 : 21 }}>
                    <Text style={styles.headerText}>
                        {this.props.headerText}
                    </Text>
                    <Text style={styles.headerContent}>
                        {this.props.subHeaderText}
                    </Text>
                </View>
                <View
                style={[styles.formContainer, this.props.formContainerStyle]}
                >
                    {this.props.children}
                </View>
                <View style={styles.footer}>
                    <Text
                    style={styles.footerText}
                    >
                    Already have an account? <Text onPress={()=>this.props.navigation.navigate('Auth')} style={{color: color.primary, fontSize: 14, fontFamily: 'Lato-Heavy', }}>Login</Text></Text>
                </View>
        </View>
        </KeyboardAwareScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    height: Platform.OS === "ios" ? Dimensions.get('window').height : Dimensions.get('window').height - 30,
  },
  imageMap: {
    height: 150,
    width: '100%',
  },
  pointerContainer: {
    marginTop: 10,
    marginLeft: 23,
   },
   pointer: {
     width: 20,
     height: 15,
     resizeMode: 'contain'
   },
  headerText: {
   height: 46,
   fontSize: 24,
   // fontWeight: 'bold',
   color: '#000000',
   marginTop: 15,
   marginLeft: 0,
   fontFamily: 'Lato-Regular',
  },
  headerContent: {
   // height: 36,
   width: 250,
   marginLeft: 0,
   color: '#828282',
   fontWeight: 'normal',
   fontSize: 13,
   lineHeight: 18,
   fontFamily: 'Lato-Regular',
  },
  formContainer: {
    flex: 1,
    marginTop: 20,
    paddingTop: 10
    // paddingBottom: 50
  },
  footer: {
    width: Dimensions.get('window').width - 42,
    height: 64,
    borderTopWidth: 2,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#F2F2F2'
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: color.gray,
    marginTop: 10,
    fontFamily: 'Lato-Regular',
  }
});
