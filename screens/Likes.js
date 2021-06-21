import React, {useState} from 'react';
import { FlatList, Text, View } from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {USER_FRAGMENT} from '../fragments';
import ScreenLayout from '../components/ScreenLayout';
import UserLikeRow from '../components/UserLikeRow';

const SEE_PHOTO_LIKES_QUERY = gql`
    query seePhotoLikes ($id: Int!) {
        seePhotoLikes(id: $id) {
            ...UserFragment
        }
    }
    ${USER_FRAGMENT}
`

function Likes({route, navigation}) {
    const [refresh, setRefresh] = useState(false);
    const {photoId} = route?.params;

    const {data, loading, refetch} = useQuery(SEE_PHOTO_LIKES_QUERY, {
        variables : {
            id: photoId
        },
        skip: !photoId,
    });

    const refreshToRefetch = async()=> {
        setRefresh(true);
        await refetch();
        setRefresh(false);
    }
    

    const renderItem = ({ item }) => (
        <UserLikeRow {...item} />
    );

    return (
        <ScreenLayout loading={loading}>
            <FlatList 
                ItemSeparatorComponent={() => 
                    <View 
                    style={{ 
                        width: "100%", 
                        height: 1, 
                        backgroundColor: "rgba(255,255,255,0.2)"}}>
                    </View>
                }
                refreshing={refresh}
                onRefresh={refreshToRefetch}
                style={{width: "100%"}}
                data={data?.seePhotoLikes}
                renderItem={renderItem}
                keyExtractor={item => "" + item.id}
            />
        </ScreenLayout>
    )
}

export default Likes;
