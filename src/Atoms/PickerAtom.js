import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker, Icon } from 'native-base';
import { color } from '../Styles/Color';

 
class PickerAtom extends PureComponent {
  render() {
    const { list, selectedValue, onValueChange } = this.props;
    return (
      <View style={[styles.view, this.props.viewStyle]}>
        <Picker
        iosIcon={<Icon name="md-arrow-dropdown" style={{ color: color.darkGray }} />}
        placeholder={this.props.placeholder ? "  " + this.props.placeholder : "  Select Value"}
        placeholderStyle={{ color: "#696969", fontFamily: 'Lato-Regular', fontSize: 14 }}
        selectedValue={selectedValue}
        mode="dropdown"
        onValueChange={onValueChange}
        style={[{width: '100%'}, this.props.style]}
        textStyle={{
          textAlign: 'left',
          paddingLeft: 2,
          paddingRight: 0,
          color: color.inputPurple, // darkGray,
          fontSize: 18,
          fontFamily: 'Lato-Regular'
        }}
        >
          {
            list.map((element, key)=>(
              <Picker.Item value={element} label={element} key={key} />
            ))
          }
        </Picker>
      </View>
    );
  }
}

export default PickerAtom;

const styles = StyleSheet.create({
  view: {
    height: 50,
    backgroundColor: color.white,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 1.5,
    shadowOffset: { width: 0, height: 1.5 },
    elevation: 3
  }
})
