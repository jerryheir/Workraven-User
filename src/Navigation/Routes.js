import React from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import Icon from "native-base";
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from "react-navigation";
import OnboardingSwipe from "../Components/OnboardingSwipe";
import WelcomeImage from "../Components/WelcomeImage";
import LoginScreen from "../Screens/LoginScreen";
import ForgotPasswordScreen from "../Screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../Screens/ResetPasswordScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import PhoneVerificationScreen from "../Screens/PhoneVerificationScreen";
import CreditCardScreen from "../Screens/CreditCardScreen";
import TermsScreen from "../Screens/TermsScreen";
import BookingScreen from "../Screens/BookingScreen";
import TabIcons from "../Atoms/TabIcons";
import stackNav from "./StackNav";
import Invite from "../Components/Invite";

const CustomTabNavigator = createBottomTabNavigator(
    {
        WorkRaven: {
            screen: BookingScreen
        },
        Profile: {
            screen: stackNav
        },
        Booking: {
            screen: BookingScreen
        },
        Invite: {
            screen: Invite
        }
    },
    {
        initialRouteName: 'Profile',
        tabBarComponent: (props) => {
            const {
                navigation: {state: {index, routes}},
                style,
                activeTintColor,
                inactiveTintColor,
                renderIcon,
                jumpTo
            } = props;
            console.log(routes[0].routeName);
            return (
                <View style={{
                    flexDirection: 'row',
                    maxHeight: 62,
                    width: '100%',
                    ...style
                }}>
                    {
                        routes.map((route, idx) => (
                            <View
                                key={route.key}
                                style={{
                                    flexDirection: 'column',
                                    height: 62,
                                    width: '25%',
                                    backgroundColor: "#FFF" 
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => jumpTo(route.key)}
                                >
                                    <TabIcons
                                        name={route.routeName}
                                        focused={index === idx ? true : false}
                                        tintColor={index === idx ? activeTintColor : inactiveTintColor}
                                    />
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            );
        },
        tabBarOptions: {
            activeTintColor: '#BE64FF',
            inactiveTintColor: '#828282',
           /* style: {
                backgroundColor: '#FFFFFF'
            },*/
            tabStyle: {},
            upperCaseLabel: false
        }
});

const OnBoardingStack = createStackNavigator(
    {
        OnBoardingSwipe: {
            screen: OnboardingSwipe
        }
    },
    {
        initialRouteName: 'OnBoardingSwipe',
        headerMode: "none"
    }
)

const SignUpStack = createStackNavigator(
    {
        SignUp: {
            screen: SignUpScreen
        },
        Phone: {
            screen: PhoneVerificationScreen
        },
        CreditCard: {
            screen: CreditCardScreen
        },
        Terms: {
            screen: TermsScreen
        }
    },
    {
        initialRouteName: 'SignUp',
        headerMode: "none"
    }
)

const AuthStack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        ForgotPassword: {
            screen: ForgotPasswordScreen
        },
        ResetPassword: {
            screen: ResetPasswordScreen
        }
    },
    {
        initialRouteName: 'Login',
        headerMode: "none"
    }
)

const OverAllStack = createSwitchNavigator(
    {
        FirstTime: OnBoardingStack,
        Auth: AuthStack,
        Sign: SignUpStack,
        Welcome: WelcomeImage,
        Tabs: CustomTabNavigator
    },
    {
        initialRouteName: 'FirstTime'
    }
);

export default OverAllStack;

