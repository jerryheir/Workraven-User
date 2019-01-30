import React, { Component } from 'react';
import { View, Text, Platform, TouchableOpacity, StyleSheet, Image, Dimensions, Animated } from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
} from 'react-native-popup-menu';
import { Icon, CheckBox } from 'native-base';
import { color } from '../Styles/Color';
import CardFlip from 'react-native-card-flip';


const { Popover } = renderers

export default class ECommerceItemAtom extends Component {
    constructor (){
        super();
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value })=>{
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
    }

    state = {
        quantity: '1'
    }
    
    flip = () => {
        if (this.value >= 90){
            Animated.timing(this.animatedValue, {
                toValue: 0,
                duration: 800
                // friction: 8,
                // tension: 10
            }).start();
        } else {
            Animated.timing(this.animatedValue, {
                toValue: 180,
                duration: 800
                // friction: 8,
                // tension: 10
            }).start();
        }
    }


    displayIcon = () => {
        if (this.props.type === "results"){
            return (
                <Menu renderer={Popover} rendererProps={{ preferredPlacement: 'top' }}>
                <MenuTrigger>
                    <CheckBox 
                    style={{ marginRight: Platform.OS === 'ios' ? 8 : 14 }} 
                    checked={this.props.checked}
                    disabled={this.props.checked ? false : true}
                    onPress={() => {this.props.onClick(), this.setState({ quantity: '1' })}}
                    color={color.primary}/>
                </MenuTrigger>
                <MenuOptions style={[{ alignItems: 'center', padding: 5 }]}>
                <Text style={{ fontFamily: 'Lato-Bold' }}>Select Quantity</Text>
                    <View style={{flexDirection: 'row' }}>
                        <MenuOption
                            onSelect={() =>{ this.setState({ quantity: '1' }), this.props.onPress('1') }} 
                        >
                            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, padding: 5 }}>1X</Text>
                        </MenuOption>
                        <MenuOption
                            onSelect={() => {this.setState({ quantity: '2' }), this.props.onPress('2')}} 
                        >
                            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, padding: 5 }}>2X</Text>
                        </MenuOption>
                        <MenuOption
                            onSelect={() => {this.setState({ quantity: '3' }), this.props.onPress('3')}} 
                        >
                            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, padding: 5 }}>3X</Text>
                        </MenuOption>
                        <MenuOption
                            onSelect={() => {this.setState({ quantity: '4' }), this.props.onPress('4')}} 
                        >
                            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, padding: 5 }}>4X</Text>
                        </MenuOption>
                        <MenuOption
                            onSelect={() => {this.setState({ quantity: '5' }), this.props.onPress('5')}} 
                        >
                            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, padding: 5 }}>5X</Text>
                        </MenuOption>
                    </View>
                    <View style={{flexDirection: 'row' }}>
                        <MenuOption
                            onSelect={() => {this.setState({ quantity: '6' }), this.props.onPress('6')}} 
                        >
                            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, padding: 5 }}>6X</Text>
                        </MenuOption>
                        <MenuOption
                            onSelect={() => {this.setState({ quantity: '7' }), this.props.onPress('7')}} 
                        >
                            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, padding: 5 }}>7X</Text>
                        </MenuOption>
                        <MenuOption
                            onSelect={() => {this.setState({ quantity: '8' }), this.props.onPress('8')}} 
                        >
                            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, padding: 5 }}>8X</Text>
                        </MenuOption>
                        <MenuOption
                            onSelect={() => {this.setState({ quantity: '9' }), this.props.onPress('9')}} 
                        >
                            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, padding: 5 }}>9X</Text>
                        </MenuOption>
                        <MenuOption
                            onSelect={() => {this.setState({ quantity: '10' }), this.props.onPress('10')}} 
                        >
                            <Text style={{ fontFamily: 'Lato-Regular', fontSize: 12, padding: 5 }}>10X</Text>
                        </MenuOption>
                    </View>
                </MenuOptions>
              </Menu>
            )
        } else if (this.props.type === "review") {
            return (
                <Icon 
                style={{ color: color.primary, fontSize: 21 }} 
                name="ios-trash-outline"
                onPress={()=> this.props.onPress() }
                />
            )
        }
    }

  render() {
    const frontAnimatedStyle = {
        transform: [
            {
                rotateY: this.frontInterpolate
            }
        ]
    }
    const frontOpacityStyle = { opacity: this.frontOpacity }
    const backOpacityStyle = { opacity: this.backOpacity }
    const backAnimatedStyle = {
        transform: [
            {
                rotateY: this.backInterpolate
            }
        ]
    }

    if (Platform.OS === 'ios'){
    return (
        <TouchableOpacity 
        onPress={()=>{
            this.flip()
        }}
        activeOpacity={.7} 
        style={styles.item}>
            <Animated.View
            style={[{  backgroundColor: '#FFF', height: 130, width: '100%' }, { flex: 1, position: 'absolute', backfaceVisibility: 'hidden' }, frontAnimatedStyle ]}
            >
                <Image 
                style={{ height: 130, width: '100%' }}
                source={{ uri: this.props.image }}
                resizeMode="cover"
                />
                    <Icon name="repeat" 
                    type="Feather"
                    style={{ 
                        position: 'absolute',
                        top: 5, right: 5,
                        color: color.primary,
                        fontSize: 16,
                        margin: 0, padding: 0,
                        flex: 1
                    }} />
               <View style={{ 
                    flexDirection: 'row',
                    height: 35,
                    width: '100%',
                    backgroundColor: '#F2F2F2',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    position: 'absolute',
                    bottom: 0
                }}>
                    <Text style={styles.text1}>Price:</Text>
                    <Text style={styles.text1}>N {this.props.price}</Text>
                </View> 
            </Animated.View>
            <Animated.View style={[{ flex: 1, zIndex: 999, backgroundColor: '#FFF', backfaceVisibility: 'hidden' }, backAnimatedStyle ]}>
                <View style={[styles.innerView, { flex: 1, height: 60, width: '100%' }]}>
                    <Text style={styles.text}>{this.props.name}</Text>
                    {
                        this.displayIcon()
                    }
                </View>
                <View style={[styles.innerView, { flex: .8, height: 40 }]}>
                    <Text style={styles.textBold}>{this.props.quantity ? this.props.quantity : this.state.quantity}X</Text>
                    <Text style={styles.textBold}>{this.props.location}</Text>
                </View>
                <View style={{ 
                    flexDirection: 'row',
                    flex: 1.2,
                    height: 40,
                    backgroundColor: '#F2F2F2',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10
                }}>
                    <Text style={styles.text1}>Price:</Text>
                    <Text style={styles.text1}>N {parseInt(this.props.price) * parseInt(this.state.quantity)}</Text>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
    } else {
        return (
            <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
                <TouchableOpacity activeOpacity={1} style={[styles.card, styles.card1]} onPress={() => this.card.flip()} >
                    <Image 
                    style={{ height: 130, width: '100%' }}
                    source={{ uri: this.props.image }}
                    resizeMode="cover"
                    />
                        <Icon name="repeat" 
                        type="Feather"
                        style={{ 
                            position: 'absolute',
                            top: 5, right: 5,
                            color: color.primary,
                            fontSize: 16,
                            margin: 0, padding: 0,
                            flex: 1
                        }} />
                    <View style={{ 
                            flexDirection: 'row',
                            height: 35,
                            width: '100%',
                            backgroundColor: '#F2F2F2',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            position: 'absolute',
                            bottom: 0
                        }}>
                            <Text style={[styles.text1, { fontSize: 10 }]}>Price:</Text>
                            <Text style={[styles.text1, { fontSize: 10 }]}>N {this.props.price}</Text>
                        </View> 
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={[styles.card, styles.card2]} onPress={() => this.card.flip()} >
                    <View style={[styles.innerView, { flex: 1, height: 60, width: '100%', paddingRight: 5 }]}>
                        <Text style={[styles.text, {fontSize: 10 }]}>{this.props.name}</Text>
                        {
                            this.displayIcon()
                        }
                    </View>
                    <View style={[styles.innerView, { flex: .8, height: 40 }]}>
                        <Text style={styles.textBold}>{this.props.quantity ? this.props.quantity : this.state.quantity}X</Text>
                        <Text style={styles.textBold}>{this.props.location}</Text>
                    </View>
                    <View style={{ 
                        flexDirection: 'row',
                        flex: 1.2,
                        height: 40,
                        backgroundColor: '#F2F2F2',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 10
                    }}>
                        <Text style={[styles.text1, { fontSize: 10 }]}>Price:</Text>
                        <Text style={[styles.text1, { fontSize: 10 }]}>N {parseInt(this.props.price) * parseInt(this.state.quantity)}</Text>
                    </View>
                </TouchableOpacity>
            </CardFlip>
        )
    }
  }
}

const styles = StyleSheet.create({
    line: {
        width: Dimensions.get("window").width - 42,
        alignSelf: 'center',
        borderTopColor: "#c0c0c0",
        borderTopWidth: 1,
        marginTop: 8,
    },
    topView: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    item: {
        maxWidth: '45%',
        height: 130,
        backgroundColor: color.white,
        marginTop: 20, 
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 1.5,
        shadowOffset: { width: 0, height: 1.5 },
        elevation: 3
    },
    innerView: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
    },
    label: {
        fontFamily: 'Lato-Bold',
        fontSize: 16
    },
    labelValue: {
        fontFamily: 'Lato-Regular',
        fontSize: 14
    },
    buttonContainer: {
        backgroundColor: '#BE64FF',
        alignItems: 'center',
        alignSelf: 'center',
        width: Dimensions.get("window").width - 42,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#C190C7',
        borderRadius: 25,
        height: 50
    },
    delivery: {
        width: Dimensions.get("window").width,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 21  
    },
    textBold: { 
        fontFamily: 'Lato-Bold', 
        fontSize: 12
    },
    text: { 
        fontFamily: 'Lato-Regular', 
        fontSize: 12,
        width: 90,
        height: 50
    },
    text1: { 
        fontFamily: 'Lato-Regular', 
        fontSize: 12
    },
    menuOptions: {
        padding: 50,
      },
      menuTrigger: {
        padding: 5,
      },
      triggerText: {
        fontSize: 20,
      },
      contentText: {
        fontSize: 18,
      },
      cardContainer:{
        width: 140,
        height: 160,
        marginTop: 15,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 1.5,
        shadowOffset: { width: 0, height: 1.5 },
        elevation: 3
      },
      card:{
        width: 130,
        height: 130,
        backgroundColor: '#FFF',
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity:0.5,
      },
      card1: {
        backgroundColor: '#FFF',
      },
      card2: {
        backgroundColor: '#FFF',
      },
      label: {
        lineHeight: 70,
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'System',
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
})