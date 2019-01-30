import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { DotsLoader } from "react-native-indicator";
import { color } from "../Styles/Color";

class ButtonAtom extends React.PureComponent {
    componentDidMount(){
        this.timer = null;
    }
    state = {
        loading: false,
        disabled: false
    }
    clicked = () => {
        this.setState({ loading: true, disabled: true });
        this.timer = setTimeout(() => {
            this.setState({ loading: false, disabled: false });
        }, 1500);
    }
    showLoader = () => {
        if (!this.state.loading) {
            return (
                <Text style={this.props.normal ? [styles.buttonText, this.props.textStyle] : [styles.footerText, this.props.textStyle]}>{this.props.text}</Text>
            )
        } else {
            return (
                <DotsLoader color={color.primary}/>
            )
        }
    }
    componentWillUnmount(){
        clearTimeout(this.timer);
    }
    render(){
        return (
            <TouchableOpacity
            style={!this.state.loading ? this.props.style : [this.props.style, { backgroundColor: '#FFF' }]}
            disabled={this.props.disabled ? this.props.disabled : this.state.disabled}
            onPress={()=>{this.clicked()
                this.props.onPress()
            }}
            >
                {this.showLoader()}
            </TouchableOpacity>
        )
    }
}

export default ButtonAtom;

const styles = StyleSheet.create({
    footerText: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Lato-Bold',
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'Lato-Bold',
    }
})