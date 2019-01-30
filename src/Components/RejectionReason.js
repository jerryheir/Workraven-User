import React, { Component, PureComponent } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import ECommerceWrapper from "./ECommerceWrapper";
import ButtonAtom from '../Atoms/ButtonAtom';
import { color } from '../Styles/Color';
import { Icon } from 'native-base';

const REASONS = ["Request a new Professional", "The price was too expensive", "I will not be available"];

class Modal extends PureComponent {
    render(){
        return (
            <View style={styles.modalBackground}>
                <Icon 
                name="md-close" 
                style={{ color: color.white, position: 'absolute', left: 21, top: 21, fontSize: 24 }} 
                onPress={()=> this.props.onPress()}
                />
                <View style={{ alignSelf: 'center', padding: 21, backgroundColor: color.white, width: Dimensions.get("window").width - 42, borderRadius: 8 }}>
                    <Text style={{ textAlign: 'center', fontSize: 24, fontFamily: 'Lato-Bold'}}>Thanks for your feedback!</Text>
                    <Text style={{ padding: 10, textAlign: 'center', fontStyle: 'italic', fontSize: 18, fontFamily: 'Lato-ThinItalic', fontWeight: '300' }}>"{this.props.option}"</Text>
                    <ButtonAtom 
                    style={styles.buttonContainer}
                    onPress={()=>this.props.finish()}
                    text={'FINISH'}
                    normal={true}
                    />
                </View>
            </View>
        );
    }
}

export default class RejectionReason extends Component {
    state = {
        showModal: false,
        value: ''
    }
    finish = () => {
        this.props.navigation.navigate('Investigation');
    }
    closeModal = () => {
        this.setState({ showModal: false });
    }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ECommerceWrapper
        goBack={true}
        title={'Reason for rejection'}
        description={'Select a reason for rejection, we would love feedback'}
        onPress={()=>this.props.navigation.goBack()}
        >
            <View style={styles.mainView}>
                <View>
                    <Text style={{ fontFamily: 'Lato-Regular'}}>TEMPLATES</Text>
                </View>
                <View style={styles.line} />
                <ScrollView style={{ minHeight: 400 }}>
                {
                    REASONS.map((value, index)=>{
                        return (
                            <TouchableOpacity 
                            key={index}
                            onPress={()=> this.setState({ showModal: true, value: value })}
                            style={styles.item}
                            activeOpacity={.6}
                            >
                                <Text style={{ fontFamily: 'Lato-Light'}}>{value}</Text>
                                <Icon 
                                name="ios-arrow-forward-outline" 
                                style={{ color: "#c0c0c0", fontSize: 21, marginTop: 5 }}
                                />
                            </TouchableOpacity>
                        )
                    })
                }
                </ScrollView>
            </View>
        </ECommerceWrapper>
        {
            this.state.showModal && <Modal 
            option={this.state.value}
            onPress={this.closeModal}
            finish={this.finish}
            />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    mainView: { 
        width: Dimensions.get("window").width - 42, 
        alignSelf: 'center', 
        backgroundColor: color.white,
        marginTop: 20,
        paddingTop: 10
    },
    buttonContainer: {
        backgroundColor: '#BE64FF',
        alignItems: 'center',
        alignSelf: 'center',
        width: '40%',
        justifyContent: 'center',
        marginTop: 18,
        borderWidth: 1,
        borderColor: '#C190C7',
        borderRadius: 8,
        height: 40
    },
    item: { 
        width: '100%', 
        backgroundColor: color.white, 
        height: 45, 
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    line: {
        width: Dimensions.get("window").width - 42,
        alignSelf: 'center',
        borderTopColor: "#c0c0c0",
        borderTopWidth: 1,
        marginTop: 8,
    },
    modalBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})