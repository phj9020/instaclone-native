import React from 'react';
import { View,Text, TouchableOpacity } from 'react-native';

function CreateAccount({navigation}) {
    return (
        <View>
            <Text>CreateAccount</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
                <View>
                    <Text>To Login</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CreateAccount;
