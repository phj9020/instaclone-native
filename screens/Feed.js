import React from 'react';
import {Text, View, Button, TouchableOpacity, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isLoggedInVar, tokenVar} from '../apollo';


function Feed({navigation}) {

    const logOut = async() => {
        await AsyncStorage.removeItem("token");
        isLoggedInVar(false);
        tokenVar("");
    }
    return (
        <View style={{backgroundColor: "black", flex: 1, alignItems: "center", justifyContent: "center"}}>
            <StatusBar style="light" />
            <Text style={{color: "white"}}>this is FEED home</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("Photo")}>
                <Text style={{color: "white"}} >go to Photo</Text>
            </TouchableOpacity>
            <Button onPress={logOut} title="log out" />   
        </View>
    )
}

export default Feed;
