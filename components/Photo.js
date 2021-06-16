import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {useWindowDimensions, Image} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {gql, useMutation} from '@apollo/client';

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

const BottomContainer = styled.View`
    padding: 0px 10px;
    margin-top: 7px;
`

const Actions = styled.View`
    flex-direction: row;
    align-items: center;
`

const Action = styled.TouchableOpacity`
    margin-right:10px;
`

const Icon = styled(Ionicons)`
    color: ${props => props.colorIsLiked ? "#E1306C" : props.theme.icon.color};
`

const Likes = styled.Text`
    margin: 7px 0px;
    font-weight: 600;
    color: ${props => props.theme.boxColor.color};
    
`

const Caption = styled.View`
    flex-direction: row;
    
`

const CaptionText = styled.Text`
    color: ${props => props.theme.boxColor.color};
    margin-left: 10px;
`

const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id: Int!) {
        toggleLike(id: $id) {
            ok
            error
        }
    }
`

function Photo({id, user, file, isLiked, likes, caption}) {
    const navigation = useNavigation();
    const {width, height} = useWindowDimensions();
    const [imageHeight, setImageHeight] = useState(height - 450);

    useEffect(()=> {
        // get each image size using getSize
        Image.getSize(file, (width, height) => {

            // set state 
            setImageHeight(height / 3);
        });
    }, [file]);

    const updateToggleLike = (cache, result) => {
        const { data : { toggleLike : {ok}}} = result;
        if(ok) {
            const fragmentId = `Photo:${id}`;

            cache.modify({
                id: fragmentId,
                fields : {
                    isLiked(prev) {
                        return !prev
                    },
                    likes(prev) {
                        if(isLiked) {
                            return prev - 1;
                        } 
                        return prev + 1; 
                    }
                }
            })
        };
    };

    const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
            id: id,
        },
        update: updateToggleLike,
    })

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
            <BottomContainer>
                <Actions>
                    <Action onPress={toggleLike}>
                        <Icon name={isLiked ? "heart" : "heart-outline"} colorIsLiked={isLiked} size={22} />
                    </Action>
                    <Action onPress={()=>navigation.navigate("Comments")}>
                        <Icon name="chatbubble-outline" size={22}/>
                    </Action>
                </Actions>
                <TouchableOpacity onPress={()=> navigation.navigate("Likes")}>
                    <Likes>{likes === 1 ? `${likes} like` : `${likes} likes`}</Likes>
                </TouchableOpacity>
                <Caption>
                    <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
                        <Username>{user.username}</Username>
                    </TouchableOpacity>
                    <CaptionText>{caption}</CaptionText>
                </Caption>
            </BottomContainer>
        </Container>
    )
}

Photo.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }),
    caption: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number,
}

export default Photo;
