import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Platform, KeyboardAvoidingView } from 'react-native';
import JobHeaderWrapper from "./JobHeaderWrapper";
import TimerAtom from '../Atoms/TimerAtom';
import { color } from '../Styles/Color';
import ButtonAtom from '../Atoms/ButtonAtom';
import PickerAtom from '../Atoms/PickerAtom';
import { Textarea, Item, Label, Input } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ITEMS = [
    "Work's not complete",
    "A different artisan showed up",
    "Others"
];

export default class Working extends Component {
    state = {
        completed: "false",
        reason: "",
        description: ""
    }

    onValueChangeFirst = (reason) => {
        this.setState({ reason });
    }

    continueReject = () => {
        console.log('Final Rejection!')
        this.props.navigation.navigate('Rating');
    }

    accept = () => {
        this.props.navigation.navigate('Rating');
    }

    reject = () => {
        this.setState({ completed: "rejected" });
    }

    display = () => {
        if (this.state.completed === "false") {
            return (
                <View style={styles.elevatedView}>
                    <TimerAtom 
                    seconds={5}
                    text={"Completed"}
                    onPress={()=>this.setState({ completed: "true" })}
                    />
                </View>
            )
        } else if (this.state.completed === "true") {
            return (
                <View style={styles.elevatedView}>
                    <TimerAtom 
                    seconds={0}
                    text={"Completed"}
                    />
                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginVertical: 10 }}>
                        <ButtonAtom 
                        style={styles.buttonContainer}
                        onPress={this.accept}
                        text={'ACCEPT JOB'}
                        normal={true}
                        /> 
                        <ButtonAtom 
                        style={[styles.buttonContainer, { backgroundColor: color.white, borderWidth: 1 }]}
                        onPress={this.reject}
                        textStyle={{ color: color.primary}}
                        text={'REJECT JOB'}
                        normal={true}
                        />
                    </View>
                </View>
            )
        } else if (this.state.completed === "rejected") {
            return (
            <View style={[styles.elevatedView, { elevation: 0, flex: 1 }]}>
                <View style={{ flex: .6 }}>
                    <PickerAtom
                    selectedValue={this.state.reason}
                    list={ITEMS}
                    placeholder="Choose Reasons..."
                    viewStyle={{ width: Dimensions.get('window').width - 65, marginBottom: 25 }}
                    onValueChange={this.onValueChangeFirst}
                    />
                    <Item style={{ height: 100 }} floatingLabel>
                        <Label style={{ fontSize: 13, top: Platform.OS === 'ios' ? 12 : 5, color: color.gray }}>Enter description</Label>
                        <Input
                        maxLength={100}
                        multiline={true}
                        rowSpan={2}
                        onChangeText={(value)=> this.setState({ description: value })}
                        value={this.state.description}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={[styles.input, { color: color.inputPurple }]}
                        />
                    </Item>
                </View>
                <View style={{ flex: .2, flexDirection: 'row-reverse', justifyContent: 'space-between', marginVertical: 10 }}>
                    <ButtonAtom 
                    style={styles.buttonContainer}
                    onPress={this.continueReject}
                    text={'CONTINUE'}
                    normal={true}
                    /> 
                    <ButtonAtom 
                    style={[styles.buttonContainer, { backgroundColor: color.white, borderWidth: 1 }]}
                    onPress={()=> this.setState({ completed: "true" })}
                    textStyle={{ color: color.primary}}
                    text={'BACK'}
                    normal={true}
                    />
                </View>
            </View>
            )
        }
    }
  render() {
    if (Platform.OS === 'ios'){
        return (
            <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
                <JobHeaderWrapper
                title={"Working"}
                indeterminate={true}
                navigation={this.props.navigation}
                removeClose={true}
                subtitle={this.state.completed === "true" ? "Artisan is done, please accept or reject his work" : this.state.completed === "rejected" ? "Please tell us why you are rejecting" : "Artisan is working..."}
                completed={this.state.completed}
                >
                    {
                        this.display()
                    }
                </JobHeaderWrapper>
            </KeyboardAvoidingView>
        )
    } else {
        return (
            <KeyboardAwareScrollView
            overScrollMode='never'
            keyboardShouldPersistTaps='always'
            keyboardDismissMode={Platform.OS === 'ios' ? 'on-drag' : 'interactive'}
            style={styles.container}
            >
                <JobHeaderWrapper
                title={"Working"}
                indeterminate={true}
                navigation={this.props.navigation}
                subtitle={this.state.completed === "true" ? "Artisan is done, please accept or reject his work" : this.state.completed === "rejected" ? "Please tell us why you are rejecting" : "Artisan is working..."}
                completed={this.state.completed}
                >
                    {
                        this.display()
                    }
                </JobHeaderWrapper>
            </KeyboardAwareScrollView>
        )
    }
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    elevatedView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Platform.OS === 'ios' ? 420 : 380,
        flex: 1,
        backgroundColor: '#FFF',
        width: Dimensions.get("window").width - 42,
        alignSelf: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 3,
        shadowOffset: { width: 5, height: 3 },
        elevation: 5,
        margin: 21,
        marginTop: 0,
        borderRadius: 3
    },
    buttonContainer: {
        backgroundColor: '#BE64FF',
        alignItems: 'center',
        width: '40%',
        justifyContent: 'center',
        marginTop: 18,
        marginHorizontal: 11,
        borderWidth: 1,
        borderColor: '#C190C7',
        borderRadius: 25,
        height: 50
    },
    input: {
        height: Platform.OS === 'ios' ? 100 : 100,
        borderColor: '#c0c0c0',
        maxWidth: Dimensions.get("window").width - 64,
        color: color.inputPurple,
        textAlign: 'left',
        fontSize: 15,
        padding: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 10,
        marginLeft: 0,
        paddingLeft: 0,
        fontFamily: 'Lato-Regular'
    },
})