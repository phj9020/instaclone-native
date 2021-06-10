import React from 'react';
import { View,Text, TouchableOpacity } from 'react-native';

function Welcome({navigation}) {
    const toLogin = () => {
        navigation.navigate("CreateAccount");
    } 
    return (
        <View>
            <Text>Welcome</Text>
            <TouchableOpacity onPress={toLogin}>
                <View>
                    <Text>Create Account</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
                <View>
                    <Text>Login</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Welcome;
