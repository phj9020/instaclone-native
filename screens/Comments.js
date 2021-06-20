import React, {useEffect, useState} from 'react';
import DismissKeyboard from '../components/DismissKeyboard';
import styled from 'styled-components/native';
import { KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import {gql, useQuery, useMutation} from '@apollo/client';
import CommentList from '../components/CommentList';
import { useForm } from "react-hook-form";
import useMe from '../hooks/useMe';
import ScreenLayout from '../components/ScreenLayout';

const SEE_PHOTO_COMMENTS_QUERY = gql`
    query seePhotoComments($id: Int!, $offset:Int!) {
        seePhotoComments(id: $id, offset:$offset) {
            id
            user {
                id
                username
                avatar
            }
            payload
            isMine
            createdAt
        }
    }
`
const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($photoId:Int!, $payload:String!) {
        createComment(photoId:$photoId, payload:$payload) {
            ok
            id
        }
    }
`

const CommentWriteContainer = styled.View`
    width: 100%;
    background-color: black;
    padding: 10px 10px;
`

const TextInput = styled.TextInput`
    color: white;
`

function Comments({route}) {
    const {data: meData} = useMe();
    const [refresh, setRefresh] = useState(false);
    const {photoId} = route?.params
    const {register, handleSubmit, watch, setValue, getValues} = useForm();


    const {data, loading:seePhotoCommentloading, refetch, fetchMore} = useQuery(SEE_PHOTO_COMMENTS_QUERY, {
        variables: {
            id: photoId,
            offset: 0,
        }
    });

    console.log(data?.seePhotoComments?.length);

    const createCommentUpdate = (cache, result) => {
        const {comment} = getValues();
        setValue("comment", "");
        const {data : {createComment: {ok, id}}} = result;

        if(ok && meData?.me) {
            const newComment = {
                __typename: "Comment",
                createdAt: Date.now() + "",
                id: id,
                isMine: true,
                payload: comment,
                user: {
                    ...meData.me
                }
            };

            const newCacheComment = cache.writeFragment({
                data: newComment,
                fragment: gql`
                    fragment BSName on Comment {
                        id
                        createdAt
                        isMine
                        payload
                        user {
                            username
                            avatar
                        }
                    }
                `
            });

            cache.modify({
                id: `Photo:${photoId}`,
                fields: {
                    commentNumber(prev) {
                        return prev + 1
                    },
                    comments(prev) {
                        return [...prev, newCacheComment]
                    }
                }
            });

            refetch();
        }
    };

    const [createComment, {loading}] = useMutation(CREATE_COMMENT_MUTATION, {
        update: createCommentUpdate,
    });

    const onValid = (data) => {
        const {comment} = data;

        if(!loading) {
            createComment({
                variables: {
                    photoId,
                    payload: comment,
                }
            })
        }
    }

    useEffect(()=>{
        register("comment", {
            required: true,
        })
    },[register])
    
    const refreshToRefetch = async()=> {
        setRefresh(true);
        await refetch();
        setRefresh(false);
    }

    const renderItem = ({ item }) => (
        <CommentList {...item} />
    );


    return (
        <DismissKeyboard>
            <ScreenLayout loading={seePhotoCommentloading} >
                <FlatList
                    onEndReachedThreshold={0.1}
                    onEndReached={()=> fetchMore({ 
                        variables: {
                            id: photoId,
                            offset: data?.seePhotoComments?.length,
                        }
                    })}
                    refreshing={refresh}
                    onRefresh={refreshToRefetch}
                    style={{flex: 1, width: "100%", height: "100%"}}
                    data={data?.seePhotoComments}
                    renderItem={renderItem}
                    keyExtractor={item => "" + item.id}
                    />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "height" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 150 : 150}
                    style={{width:"100%", alignItems: "center"}}>
                    <CommentWriteContainer>
                        <TextInput 
                            value={watch("comment")}
                            placeholder="Write a Comment" 
                            placeholderTextColor="rgba(255,255,255, 0.8)" 
                            onChangeText={(text) => setValue("comment", text)}
                            returnKeyType="done"
                            onSubmitEditing={handleSubmit(onValid)}
                        />
                    </CommentWriteContainer>
                </KeyboardAvoidingView>
            </ScreenLayout>
        </DismissKeyboard>
    )
}

export default Comments;
