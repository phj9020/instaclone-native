import React from 'react';
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

    const {data, loading} = useQuery(FEED_QUERY, {
        variables: {
            page: 1,
        }
    });

    console.log(data);

    const renderItem = ({ item }) => (
        <Photo {...item} />
    );

    return (
        <ScreenLayout loading={loading}>
            <FlatList 
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
