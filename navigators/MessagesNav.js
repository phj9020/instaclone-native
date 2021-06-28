import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Rooms from '../screens/Rooms';
import Room from '../screens/Room';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

function MessagesNav({route}) {

    let isDirectMessage = route?.params?.directMessage;

    return (
        <Stack.Navigator 
            screenOptions={{
                headerStyle: {
                    backgroundColor:"black"
                },
                headerTintColor: 'white',
                headerTitleAlign: "center",
                headerBackTitleVisible: false,
            }}
            >
            {isDirectMessage ? 
                <>
                    <Stack.Screen name="Room" options={{
                        title: `Chat With ${route?.params?.username}`
                    }} >
                        {() => 
                            <Room 
                                talkingToUserId={route?.params?.talkingToUserId} 
                                username={route?.params?.username} 
                                youAndIRoomNumber= {route?.params?.youAndIRoomNumber}
                            />
                        }
                    </Stack.Screen>
                    <Stack.Screen 
                    options={{
                        headerBackImage: ({tintColor}) => <Ionicons name="close" color={tintColor} size={28} />,
                    }} 
                    name="Rooms" 
                    component={Rooms} />
                </>
            : 
                <>
                    <Stack.Screen 
                        options={{
                            headerBackImage: ({tintColor}) => <Ionicons name="close" color={tintColor} size={28} />,
                        }} 
                        name="Rooms" 
                        component={Rooms} />
                    <Stack.Screen name="Room" component={Room} />
                </>
            }
        </Stack.Navigator>
    )
}

export default MessagesNav;
