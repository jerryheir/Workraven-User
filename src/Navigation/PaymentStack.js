import React from "react";
import { createStackNavigator} from 'react-navigation';
import Payments from "../Components/Payments";
import Notifications from "../Components/Notifications";

const PaymentStack = createStackNavigator(
    {
        Payment: Payments,
        Notification: Notifications
    },
    {
        initialRouteName: "Payment",
        headerMode: "none"
    }
);

export default PaymentStack;