import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {FlatList, KeyboardAvoidingView} from 'react-native';
import {gql, useQuery, useMutation, useSubscription, useApolloClient} from '@apollo/client';
import ScreenLayout from '../components/ScreenLayout';
import { useForm } from 'react-hook-form';
import useMe from '../hooks/useMe';
import { Ionicons } from '@expo/vector-icons';


const MessageContainer = styled.View`
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
    color: white;
    border: 1px solid ${props => props.outGoing ? props.theme.accent.backgroundColor : "lightgray"};
    border-radius: 10px;
    padding: 5px 10px;
    margin: 0px 10px;
`
const InputContainer = styled.View`
    width:95%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const MessageInput = styled.TextInput`
    width: 85%;
    padding: 10px 20px;
    border: 1px ${props => props.theme.accent.backgroundColor};
    border-radius: 1000px;
    margin-top: 10px;
    margin-bottom: 20px;
    color: white;
    margin-right: 20px;
`
const SendButton = styled.TouchableOpacity`
    position: relative;
    top: -5px;
`

const ROOM_UPDATES_SUBSCRIPTION = gql`
    subscription roomUpdates($id: Int!) {
        roomUpdates(id: $id) {
            id
            payload
            user {
                username
                avatar
            }
            read
        }
    }
`

const SEE_ROOM_QUERY = gql`
    query seeRoom($id: Int!) {
        seeRoom(id: $id) {
            id
            messages {
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
            roomId
        }
    }
`

function Room({navigation, route, youAndIRoomNumber, talkingToUserId, username}) {
    const [createdRoomId, setCreatedRoomId] = useState();
    const {handleSubmit, register, setValue, getValues, watch} = useForm();
    const {data: meData} = useMe();

    const {data, loading, subscribeToMore} = useQuery(SEE_ROOM_QUERY, {
        variables: {
            id: route?.params?.roomId || youAndIRoomNumber || createdRoomId
        }
    });

    const client = useApolloClient();
    const updateQuery = (prevQuery, options) => {
        const {subscriptionData: {data : {roomUpdates : message}}} = options;
        if(message.id) {
            const incomingMessage = client.cache.writeFragment({
                fragment: gql`
                    fragment NewMessage on Message {
                        id
                        payload
                        user {
                            username
                            avatar
                        }
                        read
                    }
                `,
                data: message,
            });

            if(youAndIRoomNumber === undefined && route?.params?.roomId === undefined){
                client.cache.modify({
                    id: `Room:${roomId}`,
                    fields: {
                        messages(prev) {
                            const existingMessage = prev.find(
                                (aMessage) => aMessage.__ref === incomingMessage.__ref
                            );
                            if (existingMessage) {
                                return prev;
                            }
                            return [...prev, incomingMessage];
                        },
                    },
                });
            } else if(route?.params?.roomId) {
                client.cache.modify({
                    id: `Room:${route.params.roomId}`,
                    fields: {
                        messages(prev) {
                            const existingMessage = prev.find(
                                (aMessage) => aMessage.__ref === incomingMessage.__ref
                            );
                            if (existingMessage) {
                                return prev;
                            }
                            return [...prev, incomingMessage];
                        },
                    },
                });
            } else if(youAndIRoomNumber) {
                client.cache.modify({
                    id: `Room:${youAndIRoomNumber}`,
                    fields: {
                        messages(prev) {
                            const existingMessage = prev.find(
                                (aMessage) => aMessage.__ref === incomingMessage.__ref
                            );
                            if (existingMessage) {
                                return prev;
                            }
                            return [...prev, incomingMessage];
                        },
                    },
                });
            }
        }
    }

    // subscribe to more update from SEE_ROOM_QUERY
    useEffect(() => {
        if(data?.seeRoom) {
            subscribeToMore({
                document: ROOM_UPDATES_SUBSCRIPTION,
                variables: {
                    id: route?.params?.roomId || youAndIRoomNumber || createdRoomId
                },
                updateQuery: updateQuery,
            })
        }
    },[data])

    const updateSendMessage = (cache, result)=> {
        const {data : {sendMessage : {ok, id, roomId}}} = result;
        console.log(result);

        if(ok && meData) {
            const {payload} = getValues();
            setValue("payload", "");

            // create fake obj
            const messageObj = {
                id: id,
                payload: payload,
                user: {
                    username: meData?.me?.username,
                    avatar: meData?.me?.avatar,
                },
                read: true,
                __typename: "Message",
            };

            // put fake obj in cache : wrtieFragment put this message on the cache
            const messageFragment = cache.writeFragment({
                fragment: gql`
                    fragment NewMessage on Message {
                        id
                        payload
                        user {
                            username
                            avatar
                        }
                        read
                    }
                `,
                data: messageObj,
            });

            console.log("youAndIRoomNumber", youAndIRoomNumber);
            console.log("route?.params?.roomId ", route?.params?.roomId );

            // sendMessage하면서 자동으로 생성된 roomId를 가져와서 state저장
            if(youAndIRoomNumber === undefined && route?.params?.roomId === undefined){
                setCreatedRoomId(roomId);
                cache.modify({
                    id: `Room:${roomId}`,
                    fields: {
                        messages(prev) {
                            return [...prev, messageFragment];
                        },
                    },
                });
            } else if(route?.params?.roomId) {
                cache.modify({
                    id: `Room:${route.params.roomId}`,
                    fields: {
                        messages(prev) {
                            return [...prev, messageFragment];
                        },
                    },
                });
            } else if(youAndIRoomNumber) {
                cache.modify({
                    id: `Room:${youAndIRoomNumber}`,
                    fields: {
                        messages(prev) {
                            return [...prev, messageFragment];
                        },
                    },
                });
            }
        }
    }
    
    const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION, {
        update: updateSendMessage,
    });
    
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
        if(youAndIRoomNumber === undefined && route?.params?.roomId === undefined){
            sendMessage({
                variables: {
                    payload : data?.payload,
                    userId: talkingToUserId,
                }
            })
        } else if(youAndIRoomNumber){
            // send messages through their profile 
            sendMessage({
                variables: {
                    payload : data?.payload,
                    roomId: youAndIRoomNumber,
                }
            })
        } else if(route?.params?.roomId) {
            // send message through rooms 
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
    
    // if data seeroom message 가 있다면 그걸 배열에 펼치고 , 없다면 빈배열을 준다 
    const messages = [...(data?.seeRoom?.messages ?? [])]
    messages.reverse();

    return (
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior="height"
            keyboardVerticalOffset={95}
        >
            <ScreenLayout loading={loading}>
                <FlatList
                    inverted
                    style={{width: "100%"}} 
                    data={messages}
                    keyExtractor={item => "" + item.id}
                    renderItem={renderItem}
                />
                <InputContainer>
                    <MessageInput
                        onChangeText={(text) => setValue("payload", text)}
                        placeholderTextColor="white"
                        placeholder="Write a Message..."
                        returnKeyLabel="Send Message"
                        returnkeyType="send"
                        value={watch("payload")}
                        onSubmitEditing={handleSubmit(onValid)}
                    />
                    <SendButton onPress={handleSubmit(onValid)} disabled={!Boolean(watch("payload"))}>
                        <Ionicons name="send" color={!Boolean(watch("payload")) ? "lightgray" : "white"} size={22} />
                    </SendButton>
                </InputContainer>
            </ScreenLayout>
        </KeyboardAvoidingView>
    )
}

export default Room;
