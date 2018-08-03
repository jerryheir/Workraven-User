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
      showInput: false,
      buttonText: 'ADD A PAYMENT METHOD'
    }

    onChange = (form) => console.log(form);

    handleSubmit = () => {
        const { cvc, cardNumber, date } = this.state;
        let numb = cvc.replace(".", '');
        let num = cardNumber.replace(".", '');
        if (cvc.length === 0 || cardNumber.length === 0 || date.length === 0) {
            return Alert.alert('Please enter all card details')
        } else if (isNaN(num) || isNaN(numb) ) {
            return Alert.alert('Please enter correct details')
        } else {
            this.props.navigation.navigate('Terms', { cardInfocvc: cvc, cardInfoCardNo: cardNumber });
        }
    }
    showView = () => {
        this.setState({ showInput: true, buttonText: 'CONTINUE' })
    }
    displayView = () => {
        return (
            <View style={{
                position: "absolute",
                height: 290,
                paddingTop: 8,
                borderRadius: 2,
                backgroundColor: color.white,
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowOpacity: 1.5,
                shadowOffset: { width: 0, height: 1.5 }}}
            >
                <CreditCardInput onChange={this.onChange} />
                    {/*<InputAtom
                    onChangeText={cardNumber => this.setState({ cardNumber })}
                    value={this.state.cardNumber}
                    label="Card Number"
                    keyboardType="numeric"
                    />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <InputAtom
                    onChangeText={date => this.setState({ date })}
                    value={this.state.date}
                    label="Expiry date"
                    placeholder="MM/YY"
                    keyboardType="numeric"
                    maxLength={5}
                    />
                    <InputAtom
                    onChangeText={cvc => this.setState({ cvc })}
                    value={this.state.cvc}
                    label="CVC"
                    keyboardType="numeric"
                    maxLength={3}
                    />
                    </View>*/}
            </View>
        )
    }

  render() {
    const { showInput } = this.state;
    return (
      <View style={styles.container}>
      <View style={{ height: '60%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
        <Image 
        source={require('../assests/images/card.png')} 
        style={styles.image} 
        />
      </View>
      {showInput === true && 
        this.displayView()
      }
        <ButtonAtom
        style={[styles.buttonContainer, { backgroundColor: showInput ? "#BE64FF" : "#C190C7" }]}
        onPress={showInput ? this.handleSubmit : this.showView}
        text={this.state.buttonText}
        normal={true}
        />
      </View>
    );
  }
}

export default CreditCard; // connect(null, {signin})(SignInForm);

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    width: Dimensions.get('window').width - 64,
    alignSelf: 'center'
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    borderWidth: 1,
    borderColor: '#C190C7',
    borderRadius: 25,
    height: 37
  },
  image: {
    height: 170,
    width: 170,
    alignSelf: 'center'
  }
});
