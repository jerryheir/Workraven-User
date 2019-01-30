import React from "react";
import { View, TouchableOpacity } from "react-native";
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from "react-navigation";
import BookingScreen from "../Screens/BookingScreen";
import TabIcons from "../Atoms/TabIcons";
import stackNav from "./StackNav";
import Invite from "../Components/Invite";
import OnTheJobStack from "./OnTheJobNav";

const CustomTabNavigator = createBottomTabNavigator(
    {
        WorkRaven: {
            screen: OnTheJobStack
        },
        Profile: {
            screen: stackNav
        },
        Booking: {
            screen: BookingScreen
        },
        Payments: {
            screen: Invite
        },
        Invite: {
            screen: Invite
        }
    },
    {
        initialRouteName: 'WorkRaven',
        tabBarComponent: (props) => {
            const {
                navigation: {state: {index, routes}},
                style,
                activeTintColor,
                inactiveTintColor,
                renderIcon,
                jumpTo
            } = props;
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
                                    width: '20%',
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
                                        index={index}
                                        idx={idx}
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
            inactiveTintColor: '#A9A9A9',
            tabStyle: {},
            upperCaseLabel: false
        }
});

const HelpStack = createStackNavigator(
    {
        Hello: {
            screen: Invite
        }
    },
    {
        initialRouteName: 'Hello',
        headerMode: "none"
    }
)

const OverAllStack = createSwitchNavigator(
    {
        Tabs: CustomTabNavigator,
        Help: HelpStack

    },
    {
        initialRouteName: 'Tabs'
    }
);

export default OverAllStack;