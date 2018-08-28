import React from "react";
import { StyleSheet, View } from "react-native";
import { color } from "../Styles/Color";
import { Input, Item, Label } from "native-base";

class InputAtom extends React.PureComponent {
    state = {
        top: 0
    }
    render(){
        return (
            <View style={[styles.view, this.props.style]}>
            <Item floatingLabel 
            style={styles.item}
            disabled={this.props.disabledItem}
            >
               <Label style={[styles.label, { top: this.state.top }]}>{this.props.label}</Label>
                <Input
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    keyboardType={this.props.keyboardType}
                    secureTextEntry={this.props.secureTextEntry}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={color.gray}
                    onSubmitEditing={this.props.onSubmitEditing}
                    autoCapitalize="none"
                    autoCorrect={false}
                    disabled={this.props.disabled}
                    style={styles.input}
                    maxLength={this.props.maxLength}
                    onFocus={()=> this.setState({ top: -9 })}
                />
            </Item>
            </View>
        )
    }
}

export default InputAtom;

const styles = StyleSheet.create({
    input: {
        height: 50,
        color: color.inputPurple,
        fontSize: 18,
        padding: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        borderColor: 'transparent'
    },
    label: {
        fontSize: 14,
        paddingLeft: 5,
        marginBottom: 0,
        color: "#696969",
        // top: -9
        top: 0
    },
    item: {
        //height: 32,
        backgroundColor: 'transparent',
        //borderBottomColor: 'transparent',
        marginBottom: 0,
        borderColor: 'transparent'
    },
    view: {
        height: 50,
        marginBottom: 26,
        backgroundColor: color.white,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 1.5,
        shadowOffset: { width: 0, height: 1.5 },
        paddingBottom: 0,
        borderColor: 'transparent'
    }
})