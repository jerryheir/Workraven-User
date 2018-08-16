import React from "react";
import { ImageBackground, ScrollView, TouchableOpacity, Dimensions, Image, View, Text, StyleSheet } from "react-native";
import { color } from "../Styles/Color";
import InputAtom from "../Atoms/InputAtom";
import ButtonAtom from "../Atoms/ButtonAtom";
import Toast from 'react-native-easy-toast'

// const { width, height } = Dimensions.get('window');
class EditProfile extends React.Component {
    state = {
        firstName: 'Jeremiah',
        lastName: 'Nwaeze',
        email: 'jerry@karixchange.com',
        password: 'password1forbrotherpeter2018',
        address: '27 Adetutu Street, Obalande, Ikoyi, Lagos'
    }
  
  handleSubmit = () => {
    this.props.navigation.goBack();
  }
    render(){
        return (
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={styles.fab}>
                    <TouchableOpacity activeOpacity={0.5} style={{ padding: 10 }}>
                        <Image source={require('../assests/camera.png')} style={{ height: 17, width: 16, overflow: 'visible' }}/>
                    </TouchableOpacity>
                </View>
                <ImageBackground
                source={require('../assests/images/profile_top_banner.png')} 
                style={styles.imageBackground}
                >
                    <View style={styles.viewPad}>
                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Image style={{height: 14, width: 10, marginLeft: 20, paddingBottom: 8, overflow: 'visible'}} source={require('../assests/pointer2.png')}/>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 24, color: color.white }}>Edit Profile</Text>
                            <Text style={{ fontSize: 12, color: color.white }}>Change your profile details</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', width: Dimensions.get('window').width - 64, justifyContent: 'space-between'}}>
                        <InputAtom
                        onChangeText={firstName => this.setState({ firstName })}
                        value={this.state.firstName}
                        label="First Name"
                        keyboardType="default"
                        style={{width: '40%'}}
                        />
                        <InputAtom
                        onChangeText={lastName => this.setState({ lastName })}
                        value={this.state.lastName}
                        label="Last Name"
                        keyboardType="default"
                        style={{width: '44%'}}
                        />
                    </View>
                        <InputAtom
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        label="Email"
                        keyboardType="email-address"
                        />
                        <InputAtom
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                        label="Password"
                        secureTextEntry={true}
                        />
                        <InputAtom
                        onChangeText={address => this.setState({ address })}
                        value={this.state.address}
                        label="Address"
                        keyboardType="default"
                        />
                        <Toast ref="toast"/>
                        <ButtonAtom
                        style={styles.buttonContainer}
                        onPress={this.handleSubmit}
                        text={'UPDATE'}
                        normal={true}
                        />
                </View>
            </ScrollView>
        );
    }
}
export default EditProfile;

const styles = StyleSheet.create({
    container: {
      paddingTop: 42,
      paddingBottom: 10,
      width: Dimensions.get('window').width - 64,
      alignSelf: 'center',
      backgroundColor: 'white'
    },
    buttonContainer: {
      backgroundColor: '#BE64FF',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      borderWidth: 1,
      borderColor: '#C190C7',
      borderRadius: 25,
      height: 50
    },
    imageBackground: {
        width: '100%',
        height: 226,
        paddingTop: 20
    },
    viewPad: {
        flex: 1,
        paddingLeft: 21,
        paddingRight: 21,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fab: {
        position: "absolute",
        top: 200,
        right: 30,
        height: 52,
        width: 52,
        borderRadius: 27,
        backgroundColor: color.white,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOpacity: 1.5,
        shadowOffset: { width: 0, height: 2 },
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
