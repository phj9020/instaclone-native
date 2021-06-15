import React from 'react';
import { TouchableOpacity,Text, View } from 'react-native';

function Search({navigation}) {
    return (
        <View style={{backgroundColor: "black", flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={{color: "white"}}>search</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("Photo")}>
                <Text style={{color: "white"}} >go to Photo</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Search