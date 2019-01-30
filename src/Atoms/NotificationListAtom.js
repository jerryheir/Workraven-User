import React from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions, View } from "react-native";
import { color } from "../Styles/Color";
import { Icon } from "native-base";

class NotificationListAtom extends React.PureComponent {
    render(){
        return (
            <TouchableOpacity
            style={styles.row}
            // onPress={this.props.onPress}
            >
                <View style={styles.circle}><Text style={{ color: color.white, fontSize: 20, fontWeight: 'bold', }}>+</Text></View>
                <Text style={styles.text}>{this.props.order}</Text>
                <Text style={[styles.text, {fontSize: 9, fontStyle: 'italic'}]}>{this.props.time}</Text>
            </TouchableOpacity>
        )
    }
}

export default NotificationListAtom;

const styles = StyleSheet.create({
    row: {
        width: Dimensions.get('window').width - 42,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        padding: 8,
        height: 50,
        backgroundColor: color.white,
        borderRadius: 4,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOpacity: 2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
        marginBottom: 10,
    },
    circle: {
        height: 28,
        width: 28,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF8C8C',
    },
    text: {
        paddingLeft: 12,
        fontSize: 12,
        color: '#4F4F4F',
        fontFamily: 'Lato-Regular',
    }
})