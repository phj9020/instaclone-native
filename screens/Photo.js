import React from 'react';
import { TouchableOpacity,Text, View } from 'react-native';

function Photo({navigation}) {
    return (
        <View style={{backgroundColor: "black", flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={{color: "white"}}>i am photo</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("Profile")}>
                <Text style={{color: "white"}} >go to Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Photo;
