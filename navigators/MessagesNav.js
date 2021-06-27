import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Rooms from '../screens/Rooms';
import Room from '../screens/Room';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

function MessagesNav() {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerStyle: {
                    backgroundColor:"black"
                },
                headerTintColor: 'white',
                headerTitleAlign: "center",
                headerBackTitleVisible: false,
                headerBackImage: ({tintColor}) => <Ionicons name="close" color={tintColor} size={28} />,
            }}
        >
            <Stack.Screen name="Rooms" component={Rooms} />
            <Stack.Screen name="Room" component={Room} />
        </Stack.Navigator>
    )
}

export default MessagesNav;
