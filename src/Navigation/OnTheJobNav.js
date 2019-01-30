import React from "react";
import { createStackNavigator } from "react-navigation";
import Investigation from "../Components/Investigation";
import GiveQuote from '../Components/GiveQuote';
import RejectionReason from '../Components/RejectionReason';
import ECommerceSearch from '../Components/ECommerceSearch';
import ECommerceResults from '../Components/ECommerceResults';
import Waiting from '../Components/Waiting';
import Working from '../Components/Working';
import Ratings from '../Components/Ratings';
import ECommerceReview from '../Components/ECommerceReview';

const OnTheJobStack = createStackNavigator(
    {
        Investigation: {
            screen: Investigation
        },
        Quote: {
            screen: GiveQuote
        },
        Rejection: {
            screen: RejectionReason
        },
        ECommerceSearch: {
            screen: ECommerceSearch
        },
        ECommerceResult: {
            screen: ECommerceResults
        },
        ECommerceReview: {
            screen: ECommerceReview
        },
        Waiting: {
            screen: Waiting
        },
        Working: {
            screen: Working
        },
        Rating: {
            screen: Ratings
        }
    },
    {
        initialRouteName: 'Investigation',
        headerMode: "none"
    }
)

export default OnTheJobStack;