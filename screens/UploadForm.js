import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, TouchableOpacity} from 'react-native';
import DismissKeyboard from '../components/DismissKeyboard';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from "@apollo/client";
import { FEED_PHOTO } from '../fragments';

const Container = styled.View`
    flex:1;
    background-color: black;
    padding: 0px 20px;
`

const Photo = styled.Image`
    height: 350px;
`

const CaptionContainer = styled.View`
    margin-top: 30px;
`

const Caption = styled.TextInput`
    background-color: ${props => props.theme.boxColor.backgroundColor};
    color: black;
    padding: 5px 10px;
    border-radius: 7px;
`
const HeaderRightText = styled.Text`
    color: ${props => props.theme.accent.backgroundColor};
    font-weight: bold;
    margin-right: 5px;
`

const UPLOAD_PHOTO_MUTATION = gql`
    mutation uploadPhoto($file: Upload!, $caption: String) {
        uploadPhoto(file: $file, caption: $caption) {
            ...FeedPhoto
        }
    }
    ${FEED_PHOTO}
`

function UploadForm({navigation, route}) {
    const {register, handleSubmit, setValue} = useForm();
    const {file} = route?.params;


    const [uploadPhoto, {loading}] = useMutation(UPLOAD_PHOTO_MUTATION)

    const HeaderRight = () => (
        <TouchableOpacity onPress={handleSubmit(onValid)}>
            <HeaderRightText>Done</HeaderRightText>
        </TouchableOpacity>
    );

    const HeaderRightLoading = () => <ActivityIndicator style={{marginRight: 5}} size="small" color="#0095f6" />

    useEffect(() => {
        register("caption")
    },[])
    
    useEffect(() => {
        navigation.setOptions({
            headerRight: loading ?  HeaderRightLoading : HeaderRight,
            ...(loading && { headerLeft: ()=> null }),
        });
    },[loading])

    const onValid = (data) => {
        // console.log(data);
        uploadPhoto({
            variables: {
                // to do file upload variables
                file: {},
                caption: data?.caption
            }
        })
    };

    return (
        <DismissKeyboard>
            <Container>
                <Photo resizeMode="contain" source={{uri: file}} />
                <CaptionContainer>
                    <Caption 
                        returnKeyType="done"
                        placeholder="Write a caption"
                        placeholderTextColor="rgba(0,0,0, 0.5)"
                        onChangeText={(text) => setValue("caption", text)}
                        onSubmitEditing={handleSubmit(onValid)}
                    />
                </CaptionContainer>
            </Container>
        </DismissKeyboard>
    )
}

export default UploadForm;
