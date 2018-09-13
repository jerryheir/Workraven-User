import React from "react";
import { ImageBackground, ScrollView, FlatList, TouchableOpacity, Dimensions, Image, View, Text, StyleSheet } from "react-native";
import { data } from "../config/data";
import NotificationListAtom from "../Atoms/NotificationListAtom";
import { color } from "../Styles/Color";
import { storeItem, retrieveItem } from '../Functions';

class UserProfile extends React.Component {
    async componentDidMount() {
        const userId = await retrieveItem('userId');
        const token = await retrieveItem('encoded');
        console.log(token);
        const pic = await retrieveItem('imageUrl');
        fetch(`https://progoapi.tk/v1/users/${userId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-user-token': token
          }
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({ firstname: responseJson.data.firstname, lastname: responseJson.data.lastname, pic: pic !== null ? pic : '' });
        })
        .catch((error) => {
          console.log(error);
        })
    }
    state = {
        firstname: '',
        lastname: '',
        pic: ''
    }

    returnData = (pic, firstname, lastname) => {
        if (pic !== null) {
            storeItem('imageUrl', pic);
        }
        this.setState({ pic: pic, firstname: firstname, lastname: lastname });
    }

    render(){
        return (
            <ScrollView>
                {this.state.pic !== '' ? (<ImageBackground
                source={{ uri: this.state.pic }} 
                style={styles.imageBackground}
                >
                    <View style={styles.viewPad}>
                        <View>
                            <Text style={{ fontSize: 24, color: 'white' }}>Profile</Text>
                            <Text style={{ fontSize: 12, color: 'white' }}>Profile details</Text>
                        </View>
                        <TouchableOpacity ><Image source={require('../assests/notification.png')} style={{ width: 19, height: 19, marginTop: 5 }} /></TouchableOpacity>
                    </View>
                </ImageBackground>) :
                (<ImageBackground
                source={require('../assests/images/profile_top_banner.png')} 
                style={styles.imageBackground}
                >
                    <View style={styles.viewPad}>
                        <View>
                            <Text style={{ fontSize: 24, color: 'white' }}>Profile</Text>
                            <Text style={{ fontSize: 12, color: 'white' }}>Profile details</Text>
                        </View>
                        <TouchableOpacity ><Image source={require('../assests/notification.png')} style={{ width: 19, height: 19, marginTop: 5 }} /></TouchableOpacity>
                    </View>
                </ImageBackground>)
                }
                <View style={[styles.viewPad, { backgroundColor: 'white', flex: 0, alignItems: 'center', height: 62, borderBottomColor: '#F2F2F2', borderBottomWidth: 1}]}>
                    <Text style={{fontSize: 24, fontWeight: '600'}}>{this.state.firstname + ' ' + this.state.lastname}</Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('EditProfile', { returnData: this.returnData })}>
                        <Image source={require('../assests/settings.png')} style={{ width: 19, height: 19 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: color.white}}>
                    <Text style={{ color: '#828282', fontSize: 12, paddingLeft: 23, padding: 20}}>PAYMENTS</Text>
                    <View style={{ flexDirection: 'row'}}>
                        <View style={{marginRight: 23, borderRadius: 3}}>
                            <ImageBackground
                            source={require('../assests/images/card_green.png')} 
                            style={{height: 100, width: 130, position: "relative", borderRadius: 3, paddingTop: 10, marginLeft: 23}}
                            >
                                <View style={{alignItems: 'flex-end', paddingTop: 50 }}>
                                    <Text style={{color: "#FFF", fontSize: 12, fontWeight: '400' }}>{'4242 4242...'}</Text>
                                    <Text style={{color: "#FFF", fontSize: 10, padding: 8 }}>{'Jeremiah Nwaeze'}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={{borderRadius: 3}}>
                            <ImageBackground
                            source={require('../assests/images/wallet.png')}
                            style={{height: 101, width: 130, position: "relative", borderRadius: 3, padding: 10}}
                            >
                                <Text style={{color: "#FFF", fontSize: 10, paddingTop: 50 }}>{'\u20A6'} {20000.00}</Text>
                            </ImageBackground>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: color.white}}>
                <Text style={{color: '#828282', fontSize: 12, paddingLeft: 23, padding: 20}}>NOTIFICATIONS</Text>
                        <FlatList
                        data={data}
                        renderItem={({ item }) => (
                        <NotificationListAtom
                            order={item.order}
                            time={item.time}
                        />
                        )}
                        />
                </View>
            </ScrollView>
        );
    }
}

export default UserProfile;

const styles = StyleSheet.create({
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
    }
})