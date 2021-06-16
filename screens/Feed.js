import React, {useState} from 'react';
import { FlatList, Text, View } from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {PHOTO_FRAGMENT, COMMENT_FRAGMENT} from '../fragments';
import ScreenLayout from '../components/ScreenLayout';
import Photo from '../components/Photo';

const FEED_QUERY = gql`
    query seeFeed($offset: Int!) {
        seeFeed(offset: $offset) {
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
