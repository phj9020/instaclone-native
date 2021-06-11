import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import CreateAccount from '../screens/CreateAccount';

const Stack = createStackNavigator();

function LoggedOutNavigator() {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Welcome" options={{headerShown:false}} 
                component={Welcome}  />
                <Stack.Screen name="Login" component={Login}  />
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
            </Stack.Navigator>
    )
}

export default LoggedOutNavigator;
