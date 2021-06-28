import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {FlatList, KeyboardAvoidingView} from 'react-native';
import {gql, useQuery, useMutation} from '@apollo/client';
import ScreenLayout from '../components/ScreenLayout';
import { useForm } from 'react-hook-form';


const MessageContainer = styled.View`
    background-color: ${props => props.theme.boxColor.backgroundColor};
    padding: 10px;
    flex-direction: ${props => props.outGoing ? "row-reverse" : "row"};
    align-items: center;
`

const Author = styled.View``

const Avatar = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`

const Message = styled.Text`
    color: ${props => props.theme.boxColor.color};
    border: 1px solid ${props => props.outGoing ? props.theme.accent.backgroundColor : "lightgray"};
    border-radius: 10px;
    padding: 5px 10px;
    margin: 0px 10px;
`
const MessageInput = styled.TextInput`
    width: 95%;
    padding: 10px 20px;
    border: 1px ${props => props.theme.accent.backgroundColor};
    border-radius: 1000px;
    margin-top: 10px;
    margin-bottom: 20px;
    color: white;
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

const SEND_MESSAGE_MUTATION = gql`
    mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
        sendMessage(payload:$payload, roomId:$roomId, userId:$userId) {
            ok
            error
            id
        }
    }
`

function Room({navigation, route, youAndIRoomNumber, talkingToUserId, username}) {
    const {handleSubmit, register, setValue} = useForm();
    const {data, loading} = useQuery(SEE_ROOM_QUERY, {
        variables: {
            id: route?.params?.roomId || youAndIRoomNumber
        }
    });

    
    const [sendMessage, {loading: sendingMessage}] = useMutation(SEND_MESSAGE_MUTATION);
    
    useEffect(()=> {
        if(!talkingToUserId) {
            navigation.setOptions({
                title: `Chat with ${route?.params?.talkingTo?.username}`,
            });      
        }
    },[]);

    useEffect(()=> {
        register("payload", {
            required: true,
        });
    },[register]); 

    const onValid = (data) => {
        if(talkingToUserId){
            sendMessage({
                variables: {
                    payload : data?.payload,
                    userId: talkingToUserId,
                }
            })
        } else {
            sendMessage({
                variables: {
                    payload : data?.payload,
                    roomId: route?.params?.roomId,
                }
            })
        }
    }

    const renderItem = ({item}) => (
        <MessageContainer outGoing={item?.user?.username !== route?.params?.talkingTo?.username && item?.user?.username !== username}>
            <Author>
                <Avatar source={{uri: item?.user?.avatar}} />
            </Author>
            <Message outGoing={item?.user?.username !== route?.params?.talkingTo?.username && item?.user?.username !== username}>
                {item?.payload}
            </Message>
        </MessageContainer>
    )

    return (
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior="height"
            keyboardVerticalOffset={95}
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
                    onChangeText={(text) => setValue("payload", text)}
                    placeholderTextColor="white"
                    placeholder="Write a Message..."
                    returnKeyLabel="Send Message"
                    returnkeyType="send"
                    onSubmitEditing={handleSubmit(onValid)}
                />
            </ScreenLayout>
        </KeyboardAvoidingView>
    )
}

export default Room;
