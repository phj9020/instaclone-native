import React, {useRef, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';
import ScreenLayout from '../components/ScreenLayout';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import ErrorText from '../components/auth/ErrorText';

const Avatar = styled.Image`
    width: 90px;
    height: 90px;
    border-radius: 45px;
    margin-bottom: 30px;
`

const TextInput = styled.TextInput`
    width: 90%;
    color: white;
    padding: 10px 10px;
    border: 1px solid white;
    margin-bottom: 15px;
`

const EditButton = styled.TouchableOpacity`
    width: 90%;
    background-color: ${Platform.OS === "web" ? "#0095f6" : props => props.theme.accent.backgroundColor};
    padding: 15px 15px;
    border-radius: 5px;
    opacity: ${props => props.disabled ? "0.5" : "1"};
`

const ButtonText = styled.Text`
    color: ${Platform.OS === "web" ? "white" : props => props.theme.colors.color};
    font-weight: 600;
    font-size: 16px;
    text-align:center;
`
const EDIT_PROFILE_MUTATION = gql`
    mutation editProfile(
        $firstName: String
        $lastName: String
        $username: String
        $email: String
        $password: String
        $bio: String
        $avatar: Upload
    ) {
        editProfile(
            firstName: $firstName,
            lastName: $lastName,
            username: $username,
            email: $email,
            password: $password,
            bio: $bio,
            avatar: $avatar,
        ) {
            ok
            error
            id
        }
    }
`

function EditProfile({route, navigation}) {
    const [error, setError] = useState();
    console.log(route);
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            firstName: route?.params?.firstName,
            lastName: route?.params?.lastName,
            bio: route?.params?.bio,
            username: route?.params?.username
        }
    });

    const lastNameRef = useRef();
    const usernameRef = useRef();
    const bioRef = useRef();

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    }

    useEffect(() => {
        register("firstName");
        register("lastName");
        register("username");
        register("bio");
    }, [])

    const [editProfile, {loading}] = useMutation(EDIT_PROFILE_MUTATION, {
        onCompleted: async(data) => {
            const {editProfile : {ok, error}} = data;
            if(!ok) {
                setError(error);
            } else {
                navigation.navigate("Me");
            }
        }
    })

    const onValid = (data) => {
        if(!loading) {
            editProfile({
                variables: {
                    ...data
                }
            });
        }
    };


    return (
        <DismissKeyboard>
            <ScreenLayout loading={false}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 20}
                    style={{width:"100%", alignItems: "center"}}>
                    {error ? <ErrorText>{error}</ErrorText> : null }
                    {route?.params?.avatar === null ? <DefaultAvatar source={require("../assets/profile.jpg")} /> : 
                    <Avatar source={{uri: route?.params?.avatar}} />
                    }
                    <TextInput
                        value={watch("firstName")}
                        placeholder="First name"
                        placeholderTextColor="rgba(255,255,255, 0.8)" 
                        returnKeyType="next"
                        onSubmitEditing={()=> onNext(lastNameRef)}
                        onChangeText={(text) => setValue("firstName", text)}
                    />
                    <TextInput
                        ref={lastNameRef}
                        value={watch("lastName")}
                        placeholder="Last name"
                        placeholderTextColor="rgba(255,255,255, 0.8)" 
                        returnKeyType="next"
                        onSubmitEditing={()=> onNext(usernameRef)}
                        onChangeText={(text) => setValue("lastName", text)}
                    />
                    <TextInput
                        ref={usernameRef}
                        value={watch("username")}
                        placeholder="Username"
                        placeholderTextColor="rgba(255,255,255, 0.8)" 
                        returnKeyType="next"
                        onSubmitEditing={()=> onNext(bioRef)}
                        onChangeText={(text) => setValue("username", text)}
                    />
                    <TextInput
                        ref={bioRef}
                        value={watch("bio")}
                        placeholder="Bio"
                        placeholderTextColor="rgba(255,255,255, 0.8)" 
                        returnKeyType="next"
                        onChangeText={(text) => setValue("bio", text)}
                        onSubmitEditing={handleSubmit(onValid)}
                    />
                    <EditButton 
                        onPress={handleSubmit(onValid)}
                        disabled={!watch("firstName") || !watch("lastName") || !watch("username") || !watch("bio")} 
                    >
                        <ButtonText>Edit Profile</ButtonText>
                    </EditButton>
                </KeyboardAvoidingView>
            </ScreenLayout>
        </DismissKeyboard>
    )
}

export default EditProfile;
