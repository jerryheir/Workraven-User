import React from "react";
import { ImageBackground, ScrollView, FlatList, TouchableOpacity, Dimensions, Image, View, Text, StyleSheet } from "react-native";
import { data } from "../config/data";
import NotificationListAtom from "../Atoms/NotificationListAtom";
import { color } from "../Styles/Color";

// const { width, height } = Dimensions.get('window');
class UserProfile extends React.Component {
    render(){
        return (
            <ScrollView>
                <ImageBackground
                source={require('../assests/images/profile_top_banner.png')} 
                style={styles.imageBackground}
                >
                    <View style={styles.viewPad}>
                        <View>
                            <Text style={{ fontSize: 24, color: 'white' }}>Profile</Text>
                            <Text style={{ fontSize: 12, color: 'white' }}>Profile details</Text>
                        </View>
                        <TouchableOpacity><Image source={require('../assests/notification.png')} style={{ width: 19, height: 19 }} /></TouchableOpacity>
                    </View>
                </ImageBackground>
                <View style={[styles.viewPad, { flex: 0, alignItems: 'center', height: 62, borderBottomColor: '#F2F2F2', borderBottomWidth: 1}]}>
                    <Text style={{fontSize: 24, fontWeight: '600'}}>Jeremiah Nwaeze</Text>
                    <Image source={require('../assests/settings.png')} style={{ width: 19, height: 19 }} />
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