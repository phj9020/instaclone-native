import React, {useState, useEffect} from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import ScreenLayout from '../components/ScreenLayout';
import {PHOTO_FRAGMENT} from '../fragments';
import MyProfile from '../components/MyProfile';
import useMe from '../hooks/useMe';




function Me({navigation}) {
    const {data, loading, refetch } = useMe();
    const [refresh, setRefresh] = useState(false);
    
    const refreshToRefetch = async()=> {
        setRefresh(true);
        await refetch();
        setRefresh(false);
    };
    
    useEffect(()=>{
        navigation.setOptions({
                title: `My Profile`,
        })
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
