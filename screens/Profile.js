import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, RefreshControl} from 'react-native';
import MyProfile from '../components/MyProfile';
import ScreenLayout from '../components/ScreenLayout';
import useMe from '../hooks/useMe';


function Profile({navigation, route}) {
    const {data : {me : {username: myUsername}}} = useMe();
    const {id, username} = route?.params;
    const [refresh, setRefresh] = useState(false);

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
        <ScreenLayout loading={false}>
            <ScrollView 
                style={{width: "100%"}}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={refreshToRefetch}
                    />
                }
            >

                {/* 
                    To Do;
                    if isMe render MyProfile else see Others Profile using seeProfile 
                    
                */}

            </ScrollView>
        </ScreenLayout>
    )
}

export default Profile
