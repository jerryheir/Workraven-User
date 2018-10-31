import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Icon } from "native-base";

class MarkerAtom extends React.Component {
    render(){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                <View style={{ height: 57, width: 29, borderRadius: 14, padding: 5, backgroundColor: "#FFF" }}>
                    <Image 
                    source={require('../assests/josh.jpeg')}
                    style={{ 
                        width: 20, 
                        height: 22, 
                        borderRadius: 10, 
                        position: 'absolute',
                        left: 4.7,
                        top: 5,
                        zIndex: 8
                    }}
                    />
                    <View 
                    style={{ 
                        backgroundColor: "#BE64FF",
                        height: 19,
                        width: 19,
                        borderRadius: 9,
                        marginTop: 17,
                        marginBottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    >
                        <Text
                        style={{ color: "#FFF", fontWeight: "bold", fontSize: 8 }}
                        >
                        4k
                        </Text>
                    </View>
                    <Icon name="ios-arrow-down" style={{ marginTop: 0, color: "#A9A9A9", fontSize: 17, textAlign: 'center' }} />
                </View>
            </View>
        )
    }
}

export default MarkerAtom;