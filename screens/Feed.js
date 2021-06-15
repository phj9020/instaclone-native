import React, {useState} from 'react';
import { FlatList, Text, View } from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {PHOTO_FRAGMENT, COMMENT_FRAGMENT} from '../fragments';
import ScreenLayout from '../components/ScreenLayout';
import Photo from '../components/Photo';

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
    // create state for refresh 
    const [refresh, setRefresh] = useState(false);
    const {data, loading, refetch} = useQuery(FEED_QUERY, {
        variables: {
            page: 1,
        }
    });

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
                refreshing={refresh}
                onRefresh={refreshToRefetch}
                style={{width: "100%"}}
                showsVerticalScrollIndicator={false}
                data={data?.seeFeed}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </ScreenLayout>
    )
}

export default Feed;
