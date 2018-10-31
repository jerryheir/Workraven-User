import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { color } from "../Styles/Color";

class TinyWhiteButton extends React.PureComponent {
    render(){
        return (
            <TouchableOpacity
            style={[styles.skip, this.props.style]}
            onPress={this.props.onPress}
            >
                <Text style={[styles.text, this.props.textStyle]}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

export default TinyWhiteButton;

const styles = StyleSheet.create({
    text: {
        color: color.primary,
        alignSelf: 'center'
    },
    skip: {
        backgroundColor: '#FFFFFF',
        height: 28,
        width: 74,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#C190C7',
        alignSelf: 'center',
        marginBottom: 15,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 1 },
        justifyContent: 'center',
        alignItems: 'center'
    }
})