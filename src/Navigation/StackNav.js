import React from "react";
import { createStackNavigator} from 'react-navigation';
import UserProfileScreen from "../Screens/UserProfileScreen";
import EditProfile from "../Components/EditProfile";

const profileStack = createStackNavigator(
    {
        First: UserProfileScreen,
        EditProfile: EditProfile
    },
    {
        initialRouteName: "First",
        headerMode: "none"
    }
);

export default profileStack;