import React from "react";
import { StyleSheet, View, Platform, Image } from "react-native";
import { color } from "../Styles/Color";
import { Input, Item, Label, Icon } from "native-base";

class InputAtom extends React.PureComponent {
    state = {
        top: 0,
        secureTextEntry: true
    }

    iconFunc = () => {
        if (!this.state.emailType) {
            this.setState({ secureTextEntry: !this.state.secureTextEntry })
        } else {
            this.props.clearText();
        }
    }

    render(){
        if (Platform.OS === 'ios') {
        return (
            <View style={[styles.view, this.props.style]}>
            <Item floatingLabel 
            style={[styles.item, this.props.itemStyle]}
            disabled={this.props.disabledItem}
            >
               <Label style={[styles.label, { top: this.props.top ? this.props.top : this.state.top, fontSize: this.props.labelFontSize ? this.props.labelFontSize : 14 }]}>
               {!this.props.labelIcon ? this.props.label : null}
                {
                    this.props.labelIcon &&
                    <Image 
                    source={require('../assests/images/nigeria.png')} 
                    style={{ height: 22, width: 23 }}
                    />
                }
               </Label>
                <Input
                    onChangeText={this.props.onChangeText}
                    value={this.props.value}
                    keyboardType={this.props.keyboardType}
                    returnKeyType='next'
                    secureTextEntry={this.props.secureTextEntry ? this.state.secureTextEntry : false }
                    placeholder={this.props.placeholder}
                    placeholderTextColor={color.gray}
                    onSubmitEditing={this.props.onSubmitEditing}
                    autoCapitalize="none"
                    autoCorrect={false}
                    disabled={this.props.disabled}
                    style={[styles.input, this.props.input]}
                    maxLength={this.props.maxLength}
                    onFocus={()=> {
                        this.setState({ top: -9 });
                        this.props.onFocus;
                    }}
                />
                        {
                            this.props.icon && 
                            <Icon name={
                                (this.props.emailType && !this.props.secureTextEntry) ? 'md-close' : 
                                (this.props.secureTextEntry && !this.state.secureTextEntry) ? 'md-eye' : 
                                (this.props.secureTextEntry && this.state.secureTextEntry) ? 'md-eye-off' :
                                'md-remove'
                            }
                            style={{ position: 'absolute', zIndex: 999, right: 11, top: 12, color: color.primary, fontSize: 18 }}
                            onPress={this.iconFunc}
                            />
                        }
            </Item>
            </View>
        )
    } else if (Platform.OS === 'android') {
        return (
            <Item floatingLabel 
            style={[styles.itemView, this.props.style]}
            disabled={this.props.disabledItem}
            >
               <Label style={[{ fontFamily: 'Lato-Regular', fontSize: 12 ,paddingLeft: 10, marginBottom: 20, paddingBottom: 30,marginBottom: 0,color: "#696969"}, { top: 6 }]}>{this.props.label}</Label>
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
                    style={[styles.input, { fontSize: 14 }]}
                    maxLength={this.props.maxLength}
                    onFocus={this.props.onFocus}
                />
                {
                    this.props.icon && 
                    <Icon name={
                        (this.props.emailType && !this.props.secureTextEntry) ? 'md-close' : 
                        (this.props.secureTextEntry && !this.state.secureTextEntry) ? 'md-eye' : 
                        (this.props.secureTextEntry && this.state.secureTextEntry) ? 'md-eye-off' :
                        'md-remove'
                    }
                    style={{ position: 'absolute', zIndex: 999, right: 11, top: 12, color: color.primary, fontSize: 18 }}
                    onPress={this.iconFunc}
                    />
                }
            </Item>
        )
    }
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
        borderColor: 'transparent',
        fontFamily: 'Lato-Regular'
    },
    label: {
        fontSize: 14,
        paddingLeft: 5,
        marginBottom: 0,
        color: "#696969",
        top: 0,
        zIndex: 999,
        width: '100%',
        fontFamily: 'Lato-Regular'
    },
    item: {
        backgroundColor: 'transparent',
        marginBottom: 0,
        borderColor: 'transparent',
    },
    view: {
        height: 50,
        marginBottom: 26,
        backgroundColor: color.white,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 1.5,
        shadowOffset: { width: 0, height: 1.5 },
        paddingBottom: -10,
        borderColor: 'transparent',
        elevation: 3
    },
    itemView: {
        height: 50,
        marginBottom: 20,
        backgroundColor: color.white,
        paddingBottom: 0,
        borderColor: 'transparent',
        elevation: 3
    }
})