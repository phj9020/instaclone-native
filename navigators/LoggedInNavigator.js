import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNav from './TabsNav';
import Upload from '../screens/Upload';

const Stack = createStackNavigator();

function LoggedInNavigator() {

    return (
        <Stack.Navigator headerMode="none" mode="modal">
            <Stack.Screen name="Tabs" component={TabsNav}/>
            <Stack.Screen name="Upload" component={Upload} />
        </Stack.Navigator>
    )
}

export default LoggedInNavigator
