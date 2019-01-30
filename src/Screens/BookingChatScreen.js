import React, {Component, PureComponent} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import BookingChat from '../Components/BookingChat';
import TinyWhiteButton from '../Atoms/TinyWhiteButton';
import NotificationIconAtom from '../Atoms/NotificationIconAtom';
import { color } from '../Styles/Color';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showBookingFunc } from "../Actions/fetchActions";

class KeyboardAvoidingWrapper extends PureComponent {
  render(){
    if (Platform.OS === 'ios'){
      return (
        <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1, backgroundColor: 'transparent' }}>
        {this.props.children}
        </KeyboardAvoidingView>
      )
    } else {
      return (
        <KeyboardAwareScrollView
        // scrollEnabled={Platform.OS === 'ios' ? false : true}
        overScrollMode='never'
        keyboardShouldPersistTaps='always'
        keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'interactive'}
        style={{ backgroundColor: 'transparent' }}
        >
        {this.props.children}
        </KeyboardAwareScrollView>
      )
    }
  }
}

class BookingChatScreen extends Component {
  state = {
    button: 'instant'
  }
  render() {
    return (
      <KeyboardAvoidingWrapper>
        {
          this.props.bookingButton &&
          <View style={styles.buttonPack}>
            <TouchableOpacity 
            style={[styles.buttons,
              { 
                borderBottomLeftRadius: 13, 
                borderTopLeftRadius: 13, 
                borderRightColor: '#828282', 
                borderRightWidth: 1, 
                backgroundColor: this.state.button === 'instant' ? color.primary : '#FFF' 
                }]}
            onPress={()=>{
              this.props.showBookingFunc('instant'),
              this.setState({ button: 'instant' })
            }}
            >
              <Text style={[styles.buttonTexts, { color: this.state.button === 'instant' ? color.white : color.black }]}>Instant Booking</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style={[styles.buttons, 
              { 
                borderBottomRightRadius: 13, 
                borderTopRightRadius: 13, 
                backgroundColor: this.state.button === 'scheduled' ? color.primary : '#FFF'
              }]}
            onPress={()=>{
              this.props.showBookingFunc('scheduled'),
              this.setState({ button: 'scheduled' })
            }}
            >
              <Text style={[styles.buttonTexts, { color: this.state.button === 'scheduled' ? color.white : color.black }]}>Make a schedule</Text>
            </TouchableOpacity>
          </View>
        }
        <TouchableOpacity style={{ 
          height: 32, 
          width: 32, 
          borderRadius: 16, 
          backgroundColor: color.white,
          position: 'absolute', 
          top: 22, 
          right: 21, 
          zIndex: 999,
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowOpacity: 1,
          shadowOffset: { width: 0, height: 1 },
          elevation: 3
        }}>
            <NotificationIconAtom />
        </TouchableOpacity>
        <BookingChat navigation={this.props.navigation} />
      </KeyboardAvoidingWrapper>
    );
  }
}


BookingChatScreen.propsTypes = {
  showBookingFunc: PropTypes.func.isRequired,
  bookingButton: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  bookingButton: state.fetch.bookingButton
})

export default connect(mapStateToProps , { showBookingFunc })(BookingChatScreen);

const styles = StyleSheet.create({
  buttonPack: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.white,
    height: 26,
    width: 240,
    position: 'absolute',
    top: 23,
    zIndex: 999,
    borderColor: '#C190C7',
    borderRadius: 15,
    alignSelf: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3
  },
  buttons: {
    width: 120,
    height: 26,
    flex: 1,
    //borderColor: '#828282',
    // borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: color.white
  },
  buttonTexts: {
    color: color.black,
    textAlign: 'center',
    fontSize: 11,
    fontFamily: 'Lato-Regular',
  }
})
