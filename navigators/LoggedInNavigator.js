import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../screens/Feed';
import Search from '../screens/Search';
import Notification from '../screens/Notification';
import {View} from 'react-native';
import TabIcon from '../components/nav/TabIcon';
import Me from '../screens/Me';
import StackNavFactory from './StackNavFactory';

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
            <Tab.Screen name="Feed" options={{
                tabBarIcon: ({focused, color, size}) => <TabIcon iconName={"home"} color={color} focused={focused} />
            }}>
                {()=> <StackNavFactory screenName="Feed" />}
            </Tab.Screen>
            <Tab.Screen name="Search" options={{
                tabBarIcon: ({focused, color, size}) => <TabIcon iconName={"search"} color={color} focused={focused} />
            }}>
                {()=> <StackNavFactory screenName="Search" />}
            </Tab.Screen>
            <Tab.Screen name="Camera" component={View} options={{
                tabBarIcon: ({focused, color, size}) => <TabIcon iconName={"camera"} color={color} focused={focused} />
            }} />
            <Tab.Screen name="Notification" options={{
                tabBarIcon: ({focused, color, size}) =>  <TabIcon iconName={"heart"} color={color} focused={focused} />          
            }}>
                {()=> <StackNavFactory screenName="Notification" />}
            </Tab.Screen>
            <Tab.Screen name="Me" options={{
                tabBarIcon: ({focused, color, size}) => <TabIcon iconName={"person"} color={color} focused={focused} />
            }}>
                {()=> <StackNavFactory screenName="Me" />}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default LoggedInNavigator
