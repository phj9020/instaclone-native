import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import useMe from '../hooks/useMe';
import { useNavigation } from '@react-navigation/native';


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


function RoomItem({unreadTotal, users, id}) {
    const {data: meData} = useMe();
    const navigation = useNavigation();

    // compare with users Array thats not match my username
    const talkingTo = users.find(user => user.username !== meData?.me?.username);

    return (
        <RoomsContainer onPress={()=> navigation.navigate("Room", { 
            roomId: id,
            talkingTo: talkingTo
        })}>
            <Col>
                <Avatar source={{uri: talkingTo?.avatar}} />
                <Data>
                    <Username>{talkingTo?.username}</Username>
                    <UnreadText>{unreadTotal} unread {unreadTotal ===  1 ? "Message" : "Messages"}</UnreadText>
                </Data>
            </Col>
            <Col>
                {unreadTotal !== 0 ? <UnreadDot /> : null}
            </Col>
        </RoomsContainer>
    )
}

RoomItem.propTypes = {
    id: PropTypes.number,
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        avatar: PropTypes.string,
        username: PropTypes.string,
    })),
    unreadTotal: PropTypes.number,
};

export default RoomItem;
