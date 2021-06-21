import React, {useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import {gql, useQuery} from '@apollo/client';
import NotificationRow from '../components/NotificationRow';

const SEE_NOTIFICATION_QUERY = gql`
    query seeNotification {
        seeNotification {
            id
            payload
            createdAt
        }
    }
`

function Notification() {
    const [refresh, setRefresh] = useState(false);
    const {data, loading, refetch} = useQuery(SEE_NOTIFICATION_QUERY);

    const refreshToRefetch = async()=> {
        setRefresh(true);
        await refetch();
        setRefresh(false);
    }
    

    const renderItem = ({ item }) => (
        <NotificationRow {...item} />
    );
    console.log("see noti", data);
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
                data={data?.seeNotification}
                renderItem={renderItem}
                keyExtractor={item => "" + item.id}
            />
        </ScreenLayout>
    )
}

export default Notification
