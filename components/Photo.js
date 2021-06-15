import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {useWindowDimensions, Image} from 'react-native';
import { TouchableOpacity } from 'react-native';

const Container = styled.View`
    padding-bottom: 20px;
    background-color: ${props => props.theme.boxColor.backgroundColor};
`
const Header = styled.TouchableOpacity`
    padding: 15px 10px;
    flex-direction: row;
    align-items: center;
`
const UserAvatar = styled.Image`
    margin-right: 10px;
    width:25px;
    height:25px;
    border-radius: 13px;
`
const Username = styled.Text`
    color: ${props => props.theme.boxColor.color};
    font-weight: 600;
`

const File = styled.Image``

const Actions = styled.View``

const Action = styled.TouchableOpacity``

const Likes = styled.Text`
    margin: 5px 0px;
    color: ${props => props.theme.boxColor.color};
    padding: 0px 10px;
`

const Caption = styled.View`
    flex-direction: row;
    padding: 0px 10px;
`

const CaptionText = styled.Text`
    color: ${props => props.theme.boxColor.color};
    margin-left: 10px;
`

function Photo({id, user, file, isLiked, likes, caption}) {
    const navigation = useNavigation();
    const {width, height} = useWindowDimensions();
    const [imageHeight, setImageHeight] = useState(height - 450);

    useEffect(()=> {
        // get each image size using getSize
        Image.getSize(file, (width, height) => {
            console.log(height);
            // set state 
            setImageHeight(height / 3);
        });
    }, [file]);


    return (
        <Container>
            <Header onPress={()=> navigation.navigate("Profile")}>
                <UserAvatar resizeMode="cover" 
                    source={{uri: user.avatar}}
                    />
                <Username>{user.username}</Username>
            </Header>
            <File style={{
                width,
                height: imageHeight,
                }} resizeMode="cover" source={{uri:file}} />
            <Actions>
                <Action />
                <Action />
            </Actions>
            <Likes>{likes === 1 ? `${likes} like` : `${likes} likes`}</Likes>
            <Caption>
                <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
                    <Username>{user.username}</Username>
                </TouchableOpacity>
                <CaptionText>{caption}</CaptionText>
            </Caption>
        </Container>
    )
}

Photo.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }),
    caption: PropTypes.string,
    file: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number,
}

export default Photo;
