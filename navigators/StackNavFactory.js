import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import Photo from '../screens/Photo';
import Feed from '../screens/Feed';
import Search from '../screens/Search';
import Notification from '../screens/Notification';
import Me from '../screens/Me';
import { Image } from 'react-native';
import Likes from '../screens/Likes';
import Comments from '../screens/Comments';


const Stack = createStackNavigator();


function StackNavFactory({screenName}) {
    return (
        <Stack.Navigator
            headerMode="screen"
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
            {screenName === "Feed" ? <Stack.Screen name={"Feed"} component={Feed} options={{
                headerTitle: () => <Image style={{maxHeight: 40}} resizeMode="contain" source={require("../assets/logo_white.png")} />
            }} /> : null}
            {screenName === "Search" ? <Stack.Screen name={"Search"} component={Search}/> : null}
            {screenName === "Notification" ? <Stack.Screen name={"Notification"} component={Notification}/> : null}
            {screenName === "Me" ? <Stack.Screen name={"Me"} component={Me}/> : null}
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="Photo" component={Photo} />
            <Stack.Screen name="Likes" component={Likes} />
            <Stack.Screen name="Comments" component={Comments} />
        </Stack.Navigator>
    )
}

export default StackNavFactory;
