import React, { Component } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Dimensions,
  Text
} from 'react-native';
import { CheckBox } from "native-base";
import Toast from 'react-native-easy-toast'
import ButtonAtom from '../Atoms/ButtonAtom';
import InputAtom from '../Atoms/InputAtom';
import { color } from '../Styles/Color';
import jwt_decode from "jwt-decode";
import { storeItem, retrieveItem } from '../Functions';

class Terms extends Component {
state = {
  checked: false,
  code: ''
}

handleSubmit = async () => {
  const { checked }= this.state;
  if (checked === false) {
    return Alert.alert('Please accept our Terms and Conditions')
  } else {
    const goodEmail = await this.props.navigation.getParam('email', 'No email');
    const goodPass = await this.props.navigation.getParam('password', 'No Password');

    const email = (goodEmail == 'No email') ? await retrieveItem('email') : goodEmail;
    const password = (goodPass == 'No Password') ? await retrieveItem('password') : goodPass;
    console.log(email, password);
    storeItem('terms', true);
    this.props.navigation.navigate('Welcome');
    fetch('https://progoapi.tk/v1/users/login?type=user', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password
          }),
        }) .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          if (responseJson.status !== 'success') {
            this.refs.toast.show('Wrong Email or Password')
          } else {
            const { token } = responseJson.data;
            const decoded = jwt_decode(token);
            storeItem('token', decoded);
            storeItem('encoded', token);
            const type = decoded.type.name;
            const userId = decoded.id;
            storeItem('userId', userId);
          this.props.navigation.navigate('Tabs', { userId, type, param: "NEW_USER" });
         }
        })
        .catch((error) => {
          console.log(error);
          this.refs.toast.show('Wrong Email or Password');
        })
  }
}
  render() {
    const { checked } = this.state
    return (
      <View style={styles.container}>
        <InputAtom
          onChangeText={code => this.setState({ code })}
          value={this.state.code}
          label="Referral Code"
          keyboardType="default"
        />
        <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
            <CheckBox style={{marginRight: 8}} checked={checked} color={color.primary} onPress={()=> this.setState({ checked: !checked })} />
            <Text style={{ paddingLeft: 8, color: color.primary, fontSize: 10}}>Agree to the Terms and Conditions <Text style={{ padding: 8, fontSize: 12 }}>*</Text></Text>
        </View>
        <Toast ref="toast"/>
        <ButtonAtom
        style={styles.buttonContainer}
        onPress={this.handleSubmit}
        text={'COMPLETE'}
        normal={true}
        />
      </View>
    );
  }
}

export default Terms;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    width: Dimensions.get('window').width - 64,
    alignSelf: 'center'
  },
  buttonContainer: {
    backgroundColor: '#BE64FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#C190C7',
    borderRadius: 25,
    height: 50
  }
});
