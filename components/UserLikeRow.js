import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {gql, useMutation} from '@apollo/client';
import useMe from '../hooks/useMe';

const Wrapper = styled.View`
    padding: 10px 15px;
`
const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const Profile = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`

const Avatar = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`

const Text = styled.Text`
    color: white;
    font-weight: 600;
    margin-left: 20px;
`
const ButtonContainer = styled.View``

const Button = styled.TouchableOpacity`
    background-color: ${props => props.theme.accent.backgroundColor};
    align-items:center;
    justify-content: center;
    padding: 7px 10px;
    border-radius: 4px;
`

const ButtonText = styled.Text`
    color: white;
    font-weight:600;
    font-size: 12px;
`

const FOLLOW_USER_MUTATION = gql`
    mutation followUser($username:String!){
        followUser(username: $username) {
            ok
            error
            id
        }
    }
`

const UNFOLLOW_USER_MUTATION = gql`
    mutation unfollowUser($username:String!) {
        unfollowUser(username: $username) {
            ok
            error
            id
        }
    }
`

function UserLikeRow({id, username, avatar, isFollowing, isMe}) {
    const navigation = useNavigation();
    const {data:meData} = useMe();
    const fragmentId = `User:${id}`;
    const myFragmentId = `User:${meData?.me?.id}`;

    const followUserUpdate = (cache, result) => {
        const {data: {followUser: {ok}}} = result;
        if(ok) {
            cache.modify({
                id: fragmentId,
                fields: {
                    isFollowing() {
                        return true
                    },
                }
            });
            // change my followings 
            cache.modify({
                id: myFragmentId,
                fields: {
                    totalFollowings(prev){
                        return prev + 1;
                    }
                }
            });
        }
    }

    const unfollowUserUpdate = (cache, result) => {
        const {data: {unfollowUser : {ok}}} = result;

        if(ok) {
            cache.modify({
                id: fragmentId,
                fields: {
                    isFollowing() {
                        return false
                    },
                }
            });
            // change my followings 
            cache.modify({
                id: myFragmentId,
                fields: {
                    totalFollowings(prev){
                        return prev - 1;
                    }
                }
            });
        }
    }

    const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
        variables: {
            username,
        },
        update: followUserUpdate,
        //뭔가 여기서 보내야 할듯? notification 
        // onCompleted: (data) => { navigation.navigate("Notification", { dataname: data } )}
    });

    const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
        variables:{
            username,
        },
        update: unfollowUserUpdate
    });

    return (
        <Wrapper>
            <Row>
                <Profile onPress={()=> navigation.navigate("Profile", {
                    username, id, 
                })}>
                    <Avatar resizeMode="cover" source={{uri: avatar}} />
                    <Text>{username}</Text>
                </Profile>
                <ButtonContainer>
                    {!isMe ? <Button onPress={isFollowing ? unfollowUser : followUser}>
                        <ButtonText>{isFollowing ? "Unfollow" : "Follow"}</ButtonText>
                    </Button> : null}
                </ButtonContainer>
            </Row>
        </Wrapper>
    )
}

UserLikeRow.propTypes = {
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    isFollowing: PropTypes.bool.isRequired,
    isMe: PropTypes.bool.isRequired,
}

export default UserLikeRow;
