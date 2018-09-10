import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { DotsLoader } from "react-native-indicator";
import { color } from "../Styles/Color";

class ButtonAtom extends React.PureComponent {
    state = {
        loading: true
    }
    clicked = () => {
        this.setState({ loading: false });
        setTimeout(() => {
            this.setState({ loading: true });
        }, 1500);
    }
    showLoader = () => {
        
    }
    render(){
        if (this.state.loading) {
            return (
                <TouchableOpacity
                style={this.props.style}
                disabled={this.props.disabled ? this.props.disabled : false}
                onPress={()=>{this.clicked()
                    this.props.onPress()
                }}
                >
                    <Text style={this.props.normal ? styles.buttonText : styles.footerText}>{this.props.text}</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={[this.props.style, { backgroundColor: '#FFF' }]}>
                    <DotsLoader color={color.primary}/>
                </View>
            )
        }
    }
}

export default ButtonAtom;

const styles = StyleSheet.create({
    footerText: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
        height: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 12
    }
})