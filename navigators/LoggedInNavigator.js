import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../screens/Feed';
import Search from '../screens/Search';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';
import {Ionicons} from '@expo/vector-icons';
import {View} from 'react-native';
import TabIcon from '../components/nav/TabIcon';

const Tab = createBottomTabNavigator();

function LoggedInNavigator() {
    return (
        <Tab.Navigator tabBarOptions={{
            activeTintColor: "white",
            style: {
                backgroundColor: "black", 
                borderTopColor: "rgba(255, 255, 255, 0.3)",
            },
            showLabel: false,
        }}>
            <Tab.Screen name="Feed" component={Feed} options={{
                tabBarIcon: ({focused, color, size}) => <TabIcon iconName={"home"} color={color} focused={focused} />
            }} />
            <Tab.Screen name="Search" component={Search} options={{
                tabBarIcon: ({focused, color, size}) => <TabIcon iconName={"search"} color={color} focused={focused} />
            }} />
            <Tab.Screen name="Camera" component={View} options={{
                tabBarIcon: ({focused, color, size}) => <TabIcon iconName={"camera"} color={color} focused={focused} />
            }} />
            <Tab.Screen name="Notification" component={Notification} options={{
                tabBarIcon: ({focused, color, size}) =>  <TabIcon iconName={"heart"} color={color} focused={focused} />           }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({focused, color, size}) => <TabIcon iconName={"person"} color={color} focused={focused} />
            }} />
        </Tab.Navigator>
    )
}

export default LoggedInNavigator
