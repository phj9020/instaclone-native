import React from 'react';
import {Text, View} from 'react-native';


function Profile({route}) {
    const {id, username} = route?.params;
    console.log(id, username);
    return (
        <View style={{backgroundColor: "black", flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={{color: "white"}}>Someone's Profile</Text>
        </View>
    )
}

export default Profile
