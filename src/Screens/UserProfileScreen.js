import React from "react";
import { View } from "react-native";
import UserProfile from "../Components/UserProfile";

class UserProfileScreen extends React.Component {
    render(){
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <UserProfile navigation={this.props.navigation} />
            </View>
        )
    }
}

export default UserProfileScreen;