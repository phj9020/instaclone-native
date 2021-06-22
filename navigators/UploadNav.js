import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SelectPhoto from '../screens/SelectPhoto';
import TakePhoto from '../screens/TakePhoto';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function UploadNav() {
    return (
        <Tab.Navigator 
            tabBarPosition="bottom" 
            tabBarOptions={{
                style: { 
                    backgroundColor: "black",
                },
                activeTintColor: "white",
                indicatorStyle: {
                    backgroundColor: "white",
                    top: 0,
                },
            }} >
            <Tab.Screen name="Select Photo">
                {()=> 
                    <Stack.Navigator screenOptions={{
                        headerTintColor: "white",
                        headerStyle: {
                            backgroundColor:"black",
                            shadowOpacity: 0.3, 
                        },
                        headerTitleAlign: "center",
                        headerBackImage: ({tintColor}) => <Ionicons name="close" color={tintColor} size={28} />,
                        headerBackTitleVisible: false,
                    }}>
                        <Stack.Screen name="Select" options={{title: "Choose a Photo"}} component={SelectPhoto} />
                    </Stack.Navigator>}
            </Tab.Screen>
            <Tab.Screen name="Take Photo" component={TakePhoto} />
        </Tab.Navigator>
    )
};


export default UploadNav;
