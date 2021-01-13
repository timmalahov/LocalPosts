import Feed from '../screens/Feed'
import BlogPostDetails from '../screens/BlogPostDetails'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Profile from '../screens/Profile'
import Settings from '../screens/Settings'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Feed" component={ Feed }/>
        <Stack.Screen name="Details" component={ BlogPostDetails }/>
    </Stack.Navigator>
);

const Tabs = (props) => {
    const { isAuthentificated } = props
    return (
        <Tab.Navigator
            initialRouteName="Feed"
            tabBarOptions={ {
                activeTintColor: "#e91e63"
            } }
        >
            <Tab.Screen
                name="Feed"
                children={ HomeStack }
                options={ {
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={ color } size={ size }/>
                    )
                } }
            />
            <Tab.Screen
                name="Profile"
                component={ Profile }
                options={ {
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={ color } size={ size }/>
                    )
                } }
            />
            { isAuthentificated && (
                <Tab.Screen
                    name="Settings"
                    component={ Settings }
                    options={ {
                        tabBarLabel: "Settings",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="settings"
                                color={ color }
                                size={ size }
                            />
                        )
                    } }
                />
            ) }
        </Tab.Navigator>
    );
};

export default Tabs
