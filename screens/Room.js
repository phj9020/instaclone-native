import React from 'react';
import {View, Text, FlatList} from 'react-native';

function Room({route}) {

    console.log(route);
    return (
        <View>
            <Text>Single Room with Message List</Text>
        </View>
    )
}

export default Room;
