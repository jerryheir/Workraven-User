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

class Terms extends Component {
state = {
  checked: false
}

handleSubmit = () => {
  const { checked }= this.state;
  if (checked === false) {
    return Alert.alert('Please accept our Terms and Conditions')
  } else {
    this.props.navigation.navigate('Welcome');
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
