import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import ScreenLayout from '../components/ScreenLayout';
import { ROOM_FRAGMENT } from '../fragments';
import RoomItem from '../components/RoomItem';


const SEE_ROOMS_QUERY = gql`
    query seeRooms {
        seeRooms {
            ...RoomFragment
        }
    }
    ${ROOM_FRAGMENT}
`;

function Rooms() {
    const [refresh, setRefresh] = useState(false);
    const {data, loading, refetch} = useQuery(SEE_ROOMS_QUERY);

    const refreshToRefetch = async()=> {
        setRefresh(true);
        await refetch();
        setRefresh(false);
    }

    const renderItem = ({item})=> {
        return (
            <RoomItem {...item} />
        )
    };

    return (
        <ScreenLayout loading={loading}>
            <FlatList
                refreshing={refresh}
                onRefresh={refreshToRefetch}
                ItemSeparatorComponent={() => (
                    <View style={{width: "100%", height:1, backgroundColor:"rgba(255,255,255, 0.2)"}}></View>
                )}
                style={{width: "100%"}}
                data={data?.seeRooms}
                renderItem={renderItem}
                keyExtractor={item => "" + item.id}
            />
        </ScreenLayout>
    )
}

export default Rooms;
