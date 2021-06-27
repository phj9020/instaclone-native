import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import { FlatList, TouchableOpacity } from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {PHOTO_FRAGMENT, COMMENT_FRAGMENT} from '../fragments';
import ScreenLayout from '../components/ScreenLayout';
import Photo from '../components/Photo';
import { Ionicons } from '@expo/vector-icons'; 

const FEED_QUERY = gql`
    query seeFeed($offset: Int!) {
        seeFeed(offset: $offset) {
            ...PhotoFragment
            user {
                id
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

const MessageIcon = styled(Ionicons)`
    color: white;
    margin-right: 15px;
`

function Feed({navigation}) {
    // create state for refresh 
    const [refresh, setRefresh] = useState(false);
    const {data, loading, refetch, fetchMore} = useQuery(FEED_QUERY, {
        variables: {
            offset: 0,
        }
    });
    console.log(data?.seeFeed?.length);
    // function for onRefresh prop
    const refreshToRefetch = async()=> {
        setRefresh(true);
        await refetch();
        setRefresh(false);
    }

    const renderItem = ({ item }) => (
        <Photo {...item} />
    );

    const HeaderRightMessage = ()=> 
        (<TouchableOpacity onPress={()=> navigation.navigate("Messages")}>
            <MessageIcon name="paper-plane-outline" size={28} />
        </TouchableOpacity>)

    useEffect(()=>{
        navigation.setOptions({
            headerRight: HeaderRightMessage,
        })
    },[])

    return (
        <ScreenLayout loading={loading}>
            <FlatList 
                onEndReachedThreshold={0.2}
                onEndReached={()=> fetchMore({ 
                    variables: {
                        offset: data?.seeFeed?.length,
                    }
                })}
                refreshing={refresh}
                onRefresh={refreshToRefetch}
                style={{width: "100%"}}
                showsVerticalScrollIndicator={false}
                data={data?.seeFeed}
                renderItem={renderItem}
                keyExtractor={item => "" + item.id}
            />
        </ScreenLayout>
    )
}

export default Feed;
