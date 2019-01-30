import React from "react";
import { createStackNavigator } from 'react-navigation';
import ShareExperience from "../Components/ShareExperience";
import BookingChatScreen from "../Screens/BookingChatScreen";

const BookingNav = createStackNavigator(
    {
        Booking: BookingChatScreen,
        Share: ShareExperience,
    },
    {
        initialRouteName: "Booking",
        headerMode: "none"
    }
);

export default BookingNav;