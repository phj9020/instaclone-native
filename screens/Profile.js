import React, {useEffect, useState} from 'react';
import { gql, useQuery } from "@apollo/client";
import {Text, View, ScrollView, RefreshControl} from 'react-native';
import MyProfile from '../components/MyProfile';
import ScreenLayout from '../components/ScreenLayout';
import useMe from '../hooks/useMe';
import { PHOTO_FRAGMENT, USER_FRAGMENT } from '../fragments';

const SEE_PROFILE_QUERY = gql`
    query seeProfile($username: String!) {
        seeProfile(username: $username) {
            ...UserFragment
            bio,
            firstName,
            lastName,
            totalFollowers,
            totalFollowings,
            isMe,
            isFollowing,
            photos {
                ...PhotoFragment
            }
        }
    }
    ${PHOTO_FRAGMENT}
    ${USER_FRAGMENT}
`


function Profile({navigation, route}) {
    // const {data : {me : {username: myUsername}}} = useMe();
    const {username} = route?.params;
    const [refresh, setRefresh] = useState(false);

    const {data, loading, refetch} = useQuery(SEE_PROFILE_QUERY, {
        variables:{
            username: username
        }
    });

    console.log(data);



    const refreshToRefetch = async()=> {
        setRefresh(true);
        await refetch();
        setRefresh(false);
    };

    useEffect(() => {
        if(username) {
            navigation.setOptions({
                title: `${username}`,
            })
        }
    },[])
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
                <MyProfile {...data?.seeProfile} />
            </ScrollView>
        </ScreenLayout>
    )
}

export default Profile
