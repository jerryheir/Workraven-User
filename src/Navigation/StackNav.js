import React from "react";
import { createStackNavigator } from 'react-navigation';
import NewUserProfile from "../Components/NewUserProfile";
import NewEditProfile from "../Components/NewEditProfile";

const profileStack = createStackNavigator(
    {
        First: NewUserProfile,
        NewEditProfile: NewEditProfile 
    },
    {
        initialRouteName: "First",
        headerMode: "none"
    }
);

export default profileStack;