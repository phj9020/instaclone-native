import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNav from './TabsNav';
import UploadNav from './UploadNav';
import UploadForm from '../screens/UploadForm';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

function LoggedInNavigator() {

    return (
        <Stack.Navigator mode="modal">
            <Stack.Screen options={{headerShown: false}} name="Tabs" component={TabsNav}/>
            <Stack.Screen options={{headerShown: false}} name="Upload" component={UploadNav} />
            <Stack.Screen 
                options={{
                    title: "Upload Photo",
                    headerStyle: {
                        backgroundColor:"black"
                    },
                    headerTintColor: 'white',
                    headerBackTitleVisible: false,
                    headerBackImage: ({tintColor}) => <Ionicons name="close" color={tintColor} size={28} />, 
                }}
                name="UploadForm" 
                component={UploadForm} />
        </Stack.Navigator>
    )
}

export default LoggedInNavigator;
