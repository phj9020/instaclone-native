import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNav from './TabsNav';
import UploadNav from './UploadNav';

const Stack = createStackNavigator();

function LoggedInNavigator() {

    return (
        <Stack.Navigator headerMode="none" mode="modal">
            <Stack.Screen name="Tabs" component={TabsNav}/>
            <Stack.Screen name="Upload" component={UploadNav} />
        </Stack.Navigator>
    )
}

export default LoggedInNavigator;
