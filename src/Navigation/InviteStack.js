import React from "react";
import { createStackNavigator} from 'react-navigation';
import Invite from "../Components/Invite";
import Notifications from "../Components/Notifications";

const InviteStack = createStackNavigator(
    {
        Invite: Invite,
        Notification: Notifications
    },
    {
        initialRouteName: "Invite",
        headerMode: "none"
    }
);

export default InviteStack;