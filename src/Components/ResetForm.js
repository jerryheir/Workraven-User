import React, { Component } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  Text
} from 'react-native';
import ButtonAtom from '../Atoms/ButtonAtom';
import InputAtom from '../Atoms/InputAtom';
import { Icon } from "native-base";

class ResetForm extends Component {
  constructor(props) {
    super(props);
    this.error = new Animated.ValueXY({ x: 21, y: -100 });
  }

  componentDidMount(){
    const otp = this.props.navigation.getParam('otp', '');
    const phone = this.props.navigation.getParam('phone', '');
    this.setState({ otp, phone });
  }

  state = {
    otp: '',
    phone: '',
    password: '',
    rePassword: '',
    error: '',
    disabled: false
  }

  displayError = () => {
    Animated.timing(
      this.error,
      {
        toValue: ({ x: 21, y: -400 }),
        duration: 2000,
        delay: 1500
      }
    ).start(()=>{
      this.setState({ error: '', disabled: false });
      this.error.setValue({ x: 21, y: -100 })
    })
  }

  handleSubmit = () => {
    this.setState({ disabled: true })
    const { password, rePassword } = this.state;
    if (password !== rePassword) {
      this.setState({ error: 'Passwords do not match' }, 
      ()=>{
        this.displayError()
      })
    } else if(password.length < 7) {
      this.setState({ error: 'Password length should not be less than 7' }, 
      ()=>{
        this.displayError()
      })
    } else {
      this.props.onPress(this.state)
    }
  }
  
  render() {
    return (
      <View
      style={styles.container}>
        {
            (this.state.error !== '') &&
            <Animated.View style={{ 
            backgroundColor: '#BE64FF', 
            alignItems: 'center',
            borderRadius: 3,
            flexDirection: 'row',
            position: 'absolute', 
            right: this.error.x, 
            top: this.error.y,
            zIndex: 999
            }}>
              <Text style={{ fontSize: 12, color: 'white', padding: 10 }}>{this.state.error}</Text>
              <Icon 
              name="md-close" 
              style={{ color: 'white', fontSize: 20, padding: 10 }} 
              onPress={()=>this.setState({ error: '', disabled: false })}
              />
            </Animated.View>
        }
        <InputAtom
          onChangeText={otp => this.setState({ otp })}
          value={this.state.otp}
          label="OTP"
          style={{ backgroundColor: "#C0C0C0" }}
          disabledItem={true}
          disabled={true}
          keyboardType="numeric"
          maxLength={5}
        />
        <InputAtom
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          label="Password"
          secureTextEntry={true}
          icon={true}
          maxLength={15}
        />
        <InputAtom
          onChangeText={rePassword => this.setState({ rePassword })}
          value={this.state.rePassword}
          label="Reenter-Password"
          secureTextEntry={true}
          icon={true}
          maxLength={15}
        />
        <ButtonAtom
          style={styles.buttonContainer}
          onPress={this.handleSubmit}
          disabled={this.state.disabled}
          text={'UPDATE'}
          normal={true}
        />
      </View>
    );
  }
}

export default ResetForm;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    width: Dimensions.get('window').width - 42,
    alignSelf: 'center'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BE64FF',
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#C190C7',
    borderRadius: 25,
    height: 50,
    marginBottom: 60
  }
});
