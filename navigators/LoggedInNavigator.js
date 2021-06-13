import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../screens/Feed';

const Tab = createBottomTabNavigator();

function LoggedInNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Feed" component={Feed} />
        </Tab.Navigator>
    )
}

export default LoggedInNavigator
