import React, { Component } from 'react';
// import {connect} from 'react-redux';
import {
  View,
  Alert,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
// import { signin } from '../actions/auth/auth.actions';
import Toast from 'react-native-easy-toast'
import { CreditCardInput } from "react-native-credit-card-input";
import ButtonAtom from '../Atoms/ButtonAtom';
import InputAtom from '../Atoms/InputAtom';
import { color } from '../Styles/Color';

class CreditCard extends Component {
    state = {
      cvc: '',
      cardNumber: '',
      date: '',
      buttonText: 'ADD A PAYMENT METHOD'
    }

    onChange = (form) => console.log(form);

    handleSubmit = () => {
        const { cvc, cardNumber, date } = this.state;
        if (cvc.length === 0 || cardNumber.length === 0 || date.length === 0) {
            return Alert.alert('Please enter all card details')
        } else {
            this.props.navigation.navigate('Terms', { cardInfocvc: cvc, cardInfoCardNo: cardNumber });
        }
    }
    displayView = () => {
        return (
            <View style={{
                height: 200,
                paddingTop: 20,
                borderRadius: 2,
                backgroundColor: color.white
              }}
            >
                    <InputAtom
                    onChangeText={cardNumber => this.setState({ cardNumber })}
                    value={this.state.cardNumber}
                    label="Card Number"
                    keyboardType="numeric"
                    />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <InputAtom
                    onChangeText={date => this.setState({ date })}
                    value={this.state.date}
                    label="Expiry date"
                    keyboardType="numeric"
                    style={{ width: '43%'}}
                    maxLength={5}
                    />
                    <InputAtom
                    onChangeText={cvc => this.setState({ cvc })}
                    value={this.state.cvc}
                    label="CVC"
                    keyboardType="numeric"
                    style={{ width: '43%' }}
                    maxLength={3}
                    />
                    </View>
            </View>
        )
    }

  render() {
    return (
      <View style={styles.container}>
      <View style={{ height: '18%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
        <Image 
        source={require('../assests/images/card.png')} 
        style={styles.image} 
        />
      </View>
      {
        this.displayView()
      }
        <ButtonAtom
        style={[styles.buttonContainer, { backgroundColor: "#BE64FF" }]}
        onPress={this.handleSubmit}
        text={this.state.buttonText}
        normal={true}
        />
      </View>
    );
  }
}

export default CreditCard;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 47,
    width: Dimensions.get('window').width - 64,
    alignSelf: 'center'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#C190C7',
    borderRadius: 25,
    height: 50
  },
  image: {
    height: 130,
    width: 170,
    alignSelf: 'center'
  }
});
