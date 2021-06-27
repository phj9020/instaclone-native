import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {FlatList, KeyboardAvoidingView} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import ScreenLayout from '../components/ScreenLayout';

const MessageContainer = styled.View`
    background-color: ${props => props.theme.boxColor.backgroundColor};
    padding: 10px 15px;
    flex-direction: row;
    align-items: center;
`

const Author = styled.View`
    flex-direction: row;
    align-items: center;
`

const Avatar = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-right: 10px;
`
const Username = styled.Text`
    color: ${props => props.theme.boxColor.color};
    margin-right: 10px;
`
const Message = styled.Text`
    color: ${props => props.theme.boxColor.color};
`
const MessageInput = styled.TextInput`
    width: 100%;
    background-color: white;
    padding: 15px 20px;
`

const SEE_ROOM_QUERY = gql`
    query seeRoom($id: Int!) {
        seeRoom(id: $id) {
            messages(offset: 0) {
                id
                payload
                user {
                    username
                    avatar
                }
                read
            }
        }
    }
`

function Room({navigation, route}) {
    console.log(route);

    const {data, loading} = useQuery(SEE_ROOM_QUERY, {
        variables: {
            id: route?.params?.roomId
        }
    });

    console.log(data);

    useEffect(()=> {
        navigation.setOptions({
            title: `Chat with ${route?.params?.talkingTo?.username}`
        });
    },[]);

    const renderItem = ({item}) => (
        <MessageContainer>
            <Author>
                <Avatar source={{uri: item?.user?.avatar}} />
                <Username>{item?.user?.username}</Username>
            </Author>
            <Message>
                {item?.payload}
            </Message>
        </MessageContainer>
    )

    return (
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior="height"
            keyboardVerticalOffset={100}
        >
            <ScreenLayout loading={loading}>
                <FlatList
                    // inverted
                    style={{width: "100%"}} 
                    data={data?.seeRoom?.messages}
                    keyExtractor={item => "" + item.id}
                    renderItem={renderItem}
                />
                <MessageInput
                    placeholderTextColor="black"
                    placeholder="Write a Message..."
                    returnKeyLabel="Send Message"
                    returnkeyType="send"
                />
            </ScreenLayout>
        </KeyboardAvoidingView>
    )
}

export default Room;
