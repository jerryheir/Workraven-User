import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native'
import { Textarea, Icon, Item } from 'native-base';
import { color } from '../Styles/Color';
import FlipToggle from 'react-native-flip-toggle-button';
import ButtonAtom from '../Atoms/ButtonAtom';
import ECommerceWrapper from "./ECommerceWrapper";
import { CALL, WEB } from 'react-native-call';

const CALL_DATA = {
    number: '+2347062951438', // String value with the number to call
    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call, for default true.
}

class GiveQuoteContainer extends Component {
    state = {
        description: this.props.text,
        disabled: true,
        price: 'N1500',
        isActive: this.props.material ? true : false,
    }
    displayDescription = () => {
        if (this.props.type === "fixed"){
            return (
                <Text style={styles.otherText}>{this.props.text}</Text>
            )
        } else if (this.props.type === "others"){
            return (
                <Item style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between'
                }}>
                        <Textarea
                        maxLength={60}
                        onChangeText={(value)=> this.setState({ description: value })}
                        value={this.state.description}
                        returnKeyType='done'
                        placeholder={'Enter description'}
                        placeholderTextColor={color.gray}
                        autoCapitalize="none"
                        blurOnSubmit={true}
                        autoCorrect={false}
                        disabled={this.state.disabled}
                        style={styles.input}
                        />
                        <TouchableOpacity 
                        style={{ flexDirection: 'row', alignSelf: 'flex-start',}}
                        onPress={() => this.setState({ disabled: !this.state.disabled })}
                        >
                            <Text style={{ fontFamily: 'Lato-Regular', padding: 5, fontSize: 11, color: this.state.disabled ? "#c0c0c0" : color.primary }}>Edit</Text>
                            <Icon 
                            name="ios-create-outline" 
                            style={{ 
                                // alignSelf: 'flex-start',
                                fontSize: 24,
                                color: this.state.disabled ? "#c0c0c0" : color.primary
                            }}
                            onPress={() => this.setState({ disabled: !this.state.disabled })}
                            />
                        </TouchableOpacity>
                </Item>
            )
        }
    }
    accept = () => {
        if (this.state.isActive){
            this.props.navigation.navigate('ECommerceSearch');
        } else {
            this.props.navigation.navigate('Waiting', { price: this.state.price, issue: 'Bath Tub Repair' });
        }
    }
    reject = () => {
        this.props.navigation.navigate('Rejection');
    }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF'}}>
        <ECommerceWrapper 
        title={'Give a Quote'}
        subtitle={'Generator Repairs'}
        description={'Give your approval from the Artisans Investigation report'}
        >
            <View style={styles.mainView}>
                    <Text style={styles.mainText}>Description</Text>
                    {this.displayDescription()}
                    <Text style={styles.mainText}>Price</Text>
                    <Text style={styles.otherText}>N 2,000</Text>
                    {(this.props.material === true) ? (<Text style={[styles.mainText, { paddingBottom: Platform.OS=== 'ios' ? 18 : 9 }]}>Material is needed? Please confirm</Text>) : (<Text style={[styles.mainText, { paddingBottom: Platform.OS=== 'ios' ? 16 : 8 }]}>No material was requested for this job</Text>)}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FlipToggle
                    value={this.state.isActive}
                    buttonWidth={55}
                    buttonHeight={25}
                    buttonRadius={23}
                    sliderWidth={23}
                    sliderHeight={23}
                    sliderRadius={50}
                    buttonOnColor={color.primary}
                    buttonOffColor={'#828282'}
                    sliderOnColor={color.white}
                    sliderOffColor={color.white}
                    onToggle={(newState) => this.setState({ isActive: !this.state.isActive })}
                    onToggleLongPress={() => console.log('toggle long pressed!')}
                    style={{ marginTop: 120 }}
                    />
                    <Text style={{ fontFamily: 'Lato-Regular', paddingLeft: 8 }}>{this.state.isActive ? "Yes. Needed" : "Not Needed"}</Text>
                    </View>
                    <Text style={styles.mainText}>Duration</Text>
                    <Text style={styles.otherText}>{'6 hours'}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Platform.OS === 'ios' ? 30 : 0, marginVertical: Platform.OS === 'ios' ? 10 : 0 }}>
                        <ButtonAtom 
                        style={styles.buttonContainer}
                        onPress={this.accept}
                        text={'ACCEPT'}
                        normal={true}
                        /> 
                        <ButtonAtom 
                        style={[styles.buttonContainer, { backgroundColor: color.white, borderWidth: 1 }]}
                        onPress={this.reject}
                        textStyle={{ color: color.primary}}
                        text={'REJECT'}
                        normal={true}
                        />
                    </View>
                    <TouchableOpacity style={styles.call}>
                        <Icon name="ios-call-outline" 
                        style={{ color: color.primary, padding: 5 }}
                        onPress={()=> CALL( CALL_DATA ).catch( console.error )}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Lato-Light', fontSize: 10, textAlign: 'center', padding: 8 ,color: color.primary }}>CALL PRO?</Text>
            </View>
        </ECommerceWrapper>
      </View>
    )
  }
}


export default class GiveQuote extends Component {
    render(){
        return (
            <GiveQuoteContainer type={'others'} text={'House Wiring'} navigation={this.props.navigation} />
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 70,
        width: Dimensions.get('window').width - 100,
        color: color.inputPurple,
        fontSize: 14,
        padding: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginLeft: 0,
        paddingLeft: 0,
        fontFamily: 'Lato-Regular'
    },
    mainView: { 
        width: Dimensions.get("window").width - 42, 
        alignSelf: 'center', 
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 0 : 0,
    },
    buttonContainer: {
        backgroundColor: '#BE64FF',
        alignItems: 'center',
        width: '40%',
        justifyContent: 'center',
        marginTop: 0,
        borderWidth: 1,
        borderColor: '#C190C7',
        borderRadius: 23,
        height: 46
    },
    call: { 
        height: 45, 
        width: 45, 
        borderRadius: 22.5, 
        borderColor: color.primary, 
        borderWidth: 2,
        backgroundColor: color.white,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    mainText: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        paddingTop: Platform.OS === 'ios' ? 21 : 6,
        paddingBottom: Platform.OS === 'ios' ? 8 : 0,
        color: 'black'
    },
    otherText: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
        // color: 'black'
    }
})
