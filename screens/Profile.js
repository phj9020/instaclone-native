import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import { gql, useQuery } from "@apollo/client";
import {ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import MyProfile from '../components/MyProfile';
import ScreenLayout from '../components/ScreenLayout';
import useMe from '../hooks/useMe';
import { PHOTO_FRAGMENT, USER_FRAGMENT, ROOM_FRAGMENT } from '../fragments';
import { Ionicons } from '@expo/vector-icons'; 

const MessageIcon = styled(Ionicons)`
    color: white;
    margin-right: 15px;
`

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

const SEE_ROOMS_QUERY = gql`
    query seeRooms {
        seeRooms {
            id
            users{
                username
            }
        }
    }
`;


function Profile({navigation, route}) {
    // const {data : {me : {username: myUsername}}} = useMe();
    const {username} = route?.params;
    const [refresh, setRefresh] = useState(false);

    const {data, loading, refetch} = useQuery(SEE_PROFILE_QUERY, {
        variables:{
            username: username
        }
    });

    const {data:roomsData} = useQuery(SEE_ROOMS_QUERY);

    // 상대방 username이 있는 방을 찾고 해당 방 id 를 넘겨줘야한다.
    const findYouAndIObject = roomsData?.seeRooms?.find(room => room.users.some(item => item.username === username));
    const findYouAndIRoomNumber = findYouAndIObject?.id;
    console.log("너와나 룸넘버",findYouAndIRoomNumber);


    let talkingToUserId = data?.seeProfile?.id;
    
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
    },[]);
    
    const HeaderRightMessage = ()=> 
        (<TouchableOpacity onPress={()=> navigation.navigate("Messages", {
            directMessage: true,
            talkingToUserId: talkingToUserId,
            username: username,
            youAndIRoomNumber: findYouAndIRoomNumber,
        })}>
            <MessageIcon name="paper-plane-outline" size={28} />
        </TouchableOpacity>)

    useEffect(()=>{
        navigation.setOptions({
            headerRight: data?.seeProfile?.isMe ? null : HeaderRightMessage,
        })
    },[talkingToUserId]);

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
