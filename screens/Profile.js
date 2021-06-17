import React, {useEffect} from 'react';
import {Text, View} from 'react-native';


function Profile({navigation, route}) {
    const {id, username} = route?.params;
    console.log(id, username);

    useEffect(() => {
        if(username) {
            navigation.setOptions({
                title: `${username}`,
            })
        }
    },[])
    return (
        <View style={{backgroundColor: "black", flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={{color: "white"}}>Someone's Profile</Text>
        </View>
    )
}

export default Profile
