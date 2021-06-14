import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import Photo from '../screens/Photo';
import Feed from '../screens/Feed';
import Search from '../screens/Search';
import Notification from '../screens/Notification';
import Me from '../screens/Me';


const Stack = createStackNavigator();


function StackNavFactory({screenName}) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: "white",
                headerTitleAlign: "center",
                headerBackTitleVisible: false, 
                headerStyle: {
                    shadowColor: "rgba(255,255,255,0.3)",
                    backgroundColor: "black",
                }
            }}
        >
            {screenName === "Feed" ? <Stack.Screen name={"Feed"} component={Feed}/> : null}
            {screenName === "Search" ? <Stack.Screen name={"Search"} component={Search}/> : null}
            {screenName === "Notification" ? <Stack.Screen name={"Notification"} component={Notification}/> : null}
            {screenName === "Me" ? <Stack.Screen name={"Me"} component={Me}/> : null}
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="Photo" component={Photo} />
        </Stack.Navigator>
    )
}

export default StackNavFactory;
