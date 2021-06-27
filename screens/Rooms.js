import React from 'react';
import styled from 'styled-components/native';
import {View, FlatList} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import ScreenLayout from '../components/ScreenLayout';
import { ROOM_FRAGMENT } from '../fragments';
import useMe from '../hooks/useMe';

const RoomsContainer = styled.TouchableOpacity`
    width: 100%;
    background-color: ${props => props.theme.boxColor.backgroundColor};
    padding: 15px;
    flex-direction: row;
    justify-content: space-between;
`

const Col = styled.View`
    flex-direction: row;
    align-items: center;
`

const Avatar = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-right: 20px;
`

const Data = styled.View``

const Username = styled.Text`
    color: ${props => props.theme.boxColor.color};
    font-weight: bold;
    font-size: 16px;
`

const UnreadText = styled.Text`
    font-size: 12px;
    font-weight: 500;
    margin-top: 2px;
    color: ${props => props.theme.boxColor.color};
`

const UnreadDot = styled.View`
    width:10px;
    height:10px;
    border-radius: 5px;
    background-color: ${props => props.theme.accent.backgroundColor};
`


const SEE_ROOMS_QUERY = gql`
    query seeRooms {
        seeRooms {
            ...RoomFragment
        }
    }
    ${ROOM_FRAGMENT}
`;

function Rooms({navigation}) {
    const {data: meData} = useMe();
    const {data, loading} = useQuery(SEE_ROOMS_QUERY);

    const renderItem = ({item})=> {
        // compare with users Array thats not match my username
        const notMe = item?.users.find(user => user.username !== meData?.me?.username);
        return (
            <RoomsContainer onPress={()=> navigation.navigate("Room", { roomId: item?.id})}>
                <Col>
                    <Avatar source={{uri: notMe?.avatar}} />
                    <Data>
                        <Username>{notMe?.username}</Username>
                        <UnreadText>{item?.unreadTotal} unread {item.unreadTotal ===  1 ? "Message" : "Messages"}</UnreadText>
                    </Data>
                </Col>
                <Col>
                    {item?.unreadTotal !== 0 ? <UnreadDot /> : null}
                </Col>
            </RoomsContainer>
        )
    }

    return (
        <ScreenLayout loading={loading}>
            <FlatList
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
