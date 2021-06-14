import React from 'react';
import {Text, View, Button, TouchableOpacity, StatusBar} from 'react-native';
import {logUserOut} from '../apollo';
import {gql, useQuery} from '@apollo/client';
import {PHOTO_FRAGMENT, COMMENT_FRAGMENT} from '../fragments';

const FEED_QUERY = gql`
    query seeFeed($page: Int!) {
        seeFeed(page: $page) {
            ...PhotoFragment
            user {
                username
                avatar
            }
            caption
            createdAt
            isMine
            comments {
                ...CommentFragment
            }
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`

function Feed({navigation}) {

    const {data} = useQuery(FEED_QUERY, {
        variables: {
            page: 1,
        }
    });

    console.log(data);
    
    return (
        <View style={{backgroundColor: "black", flex: 1, alignItems: "center", justifyContent: "center"}}>
            <StatusBar style="light" />
            <Text style={{color: "white"}}>this is FEED home</Text>
            <Button onPress={logUserOut} title="log out" />   
        </View>
    )
}

export default Feed;
