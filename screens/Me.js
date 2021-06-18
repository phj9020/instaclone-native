import React, {useState,useEffect} from 'react';
import {Text, View, ScrollView, RefreshControl} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import ScreenLayout from '../components/ScreenLayout';
import {PHOTO_FRAGMENT} from '../fragments';
import MyProfile from '../components/MyProfile';

const ME_QUERY = gql`
    query me {
        me {
            id
            firstName
            lastName
            username
            bio
            avatar
            photos {
                ...PhotoFragment
            }
            isMe
            totalFollowings
            totalFollowers
        }
    }
    ${PHOTO_FRAGMENT}
`


function Me({navigation}) {
    const [refresh, setRefresh] = useState(false);
    const { data, loading, refetch } = useQuery(ME_QUERY);
    // console.log(data);

    const refreshToRefetch = async()=> {
        setRefresh(true);
        await refetch();
        setRefresh(false);
    };

    useEffect(()=>{
        navigation.setOptions({
            title: `${data?.me?.username}'s Profile`
        })
    },[data])


    return (
        <ScreenLayout loading={loading}>
            <ScrollView 
                style={{width: "100%"}}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={refreshToRefetch}
                    />
                }
            >
                <MyProfile 
                    id={data?.me?.id} 
                    avatar={data?.me?.avatar} 
                    bio={data?.me?.bio}
                    firstName={data?.me?.firstName}
                    lastName={data?.me?.lastName}
                    username={data?.me?.username}
                    photos={data?.me?.photos}
                    totalFollowers={data?.me?.totalFollowers}
                    totalFollowings={data?.me?.totalFollowings}
                    isMe={data?.me?.isMe}
                />
            </ScrollView>
        </ScreenLayout>
    )
}

export default Me;
