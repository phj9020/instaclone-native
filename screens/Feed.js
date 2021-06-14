import React from 'react';
import {Text, View, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isLoggedInVar, tokenVar} from '../apollo';


function Feed() {

    const logOut = async() => {
        await AsyncStorage.removeItem("token");
        isLoggedInVar(false);
        tokenVar("");
    }
    return (
        <View style={{backgroundColor: "black", flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={{color: "white"}}>this is FEED home</Text>
            <Button onPress={logOut} title="log out" />   
        </View>
    )
}

export default Feed;
