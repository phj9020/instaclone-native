import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {gql, useQuery} from '@apollo/client';

const SEE_ROOM_QUERY = gql`
    query seeRoom($id: Int!) {
        seeRoom(id: $id) {
            messages(offset: 0) {
                id
                payload
                user {
                    username
                    avatar
                }
                read
            }
        }
    }
`

function Room({navigation, route}) {
    console.log(route);

    const {data} = useQuery(SEE_ROOM_QUERY, {
        variables: {
            id: route?.params?.roomId
        }
    });

    console.log(data);

    useEffect(()=> {
        navigation.setOptions({
            title: `Chat with ${route?.params?.talkingTo?.username}`
        });
    },[]);

    return (
        <View>
            <Text>Single Room with Message List</Text>
        </View>
    )
}

export default Room;
