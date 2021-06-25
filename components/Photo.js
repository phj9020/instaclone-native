import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {useWindowDimensions, Image} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {gql, useMutation} from '@apollo/client';
import useMe from '../hooks/useMe';

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
const DefaultAvatar = styled.Image`
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
    font-weight: 600;
    color: ${props => props.theme.boxColor.color};
    margin: 7px 0px;
    
`

const Caption = styled.View`
    flex-direction: row;
`

const CaptionText = styled.Text`
    color: ${props => props.theme.boxColor.color};
    margin-left: 10px;
`

const CommentContainer = styled.View``

const CommentNumber = styled.Text`
    color: ${props => props.theme.boxColor.color};
    margin: 10px 0px;
    font-size: 10px;
`

const CommentsBlock = styled.View`
    flex-direction: row;
    padding: 5px 0px;
`

const Comments = styled.Text`
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

const CREATE_NOTIFICATION_MUTATION = gql`
    mutation createNotification($userId: Int!, $payload: String!) {
        createNotification(userId: $userId, payload:$payload) {
            ok
            id
        }
    }
`

function Photo({id, user, file, isLiked, likes, caption, comments, commentNumber, isFullView}) {
    const navigation = useNavigation();
    const {data:meData} = useMe();
    const {width, height} = useWindowDimensions();
    const [imageHeight, setImageHeight] = useState(height - 450);

    useEffect(()=> {
        // get each image size using getSize
        Image.getSize(file, (width, height) => {

            // set state 
            setImageHeight(height / 6);
        });
    }, []);

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
        onCompleted: async(data) => {
            const {toggleLike : {ok}} =data;
            if(ok) {
                if(isLiked) {
                    // send notification
                    createNotification();
                }
            }
        }
    });

    const [createNotification] =useMutation(CREATE_NOTIFICATION_MUTATION, {
        variables: {
            userId : user?.id,
            payload: `${meData?.me?.username} Likes your Photo`
        }
    });

    const goToProfile = ()=> {
        return navigation.navigate("Profile", {
            username: user.username,
            id: user.id,
        })
    };

    return (
        <Container>
            <Header onPress={goToProfile}>
                {user?.avatar === null ? 
                    <DefaultAvatar source={require("../assets/profile.jpg")} />
                : 
                    <UserAvatar resizeMode="cover" 
                        source={{uri: user?.avatar}}
                        />
                }
                <Username>{user?.username}</Username>
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
                    <Action onPress={()=>navigation.navigate("Comments", {photoId: id, userId : user?.id})}>
                        <Icon name="chatbubble-outline" size={22}/>
                    </Action>
                </Actions>
                <TouchableOpacity onPress={()=> navigation.navigate("Likes", {photoId: id})}>
                    <Likes>{likes === 1 ? `${likes} like` : `${likes} likes`}</Likes>
                </TouchableOpacity>
                <Caption>
                    <TouchableOpacity onPress={goToProfile}>
                        <Username>{user?.username}</Username>
                    </TouchableOpacity>
                    <CaptionText>{caption}</CaptionText>
                </Caption>
                <CommentNumber>{commentNumber === 1 ? "1 Comment" : `${commentNumber} Comments`} </CommentNumber>
                {isFullView ? 
                    <CommentContainer>
                        {comments?.map(item => 
                            <CommentsBlock key={item.id}>
                                <Username>{item.user?.username}</Username>
                                <Comments>{item.payload}</Comments>
                            </CommentsBlock>
                        )}
                    </CommentContainer>
                : null}
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
    caption: PropTypes.string,
    file: PropTypes.string,
    isLiked: PropTypes.bool,
    likes: PropTypes.number,
    isFullView: PropTypes.bool,
    commentNumber: PropTypes.number,
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        payload: PropTypes.string,
        user: PropTypes.shape({
            avatar: PropTypes.string,
            username: PropTypes.string.isRequired,
        })
    }))

}

export default Photo;
