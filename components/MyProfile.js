import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {useWindowDimensions} from 'react-native';

const Container = styled.View`
    background-color: ${props => props.theme.boxColor.backgroundColor};
    padding: 20px 0px;
`
const ProfileContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 0px 15px;
`
const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
`
const ProfileInfo = styled.View`
    padding-left: 20px;
    flex-direction: row;
    align-items: center;
`
const Col = styled.View`
    /* width: 29%; */
    padding: 0px 10px;
    align-items: center;
`
const Followers = styled.Text`
    color: ${props => props.theme.boxColor.color};
    font-weight:bold;
`
const FollowersText = styled.Text`
    color: ${props => props.theme.boxColor.color};
`
const Followings = styled.Text`
    color: ${props => props.theme.boxColor.color};
    font-weight: bold;
`
const FollowingsText = styled.Text`
    color: ${props => props.theme.boxColor.color};
`
const PhotoNum = styled.Text`
    color: ${props => props.theme.boxColor.color};
    font-weight: bold;
`
const PhotoNumText = styled.Text`
    color: ${props => props.theme.boxColor.color};
`
const ProfileBioContainer = styled.View`
    padding: 0px 15px;
    margin-top: 20px;
`
const Name = styled.Text`
    color: ${props => props.theme.boxColor.color};
`
const Username= styled.Text`
    color: ${props => props.theme.boxColor.color};
    margin-top: 5px;
`
const Bio = styled.Text`
    color: ${props => props.theme.boxColor.color};
    margin-top: 5px;
`
const PhotoContainer = styled.View`
    width: 100%;
    margin-top: 15px;
    flex-direction: row;
    flex-wrap: wrap;
`
const PhotoTouch = styled.TouchableOpacity`
    width:33.1%;
    margin:0.1%;
`
const PhotoFeed = styled.Image`
    width:100%;
    height:140px;
`

function MyProfile({ 
    id,
    avatar,
    bio,
    firstName,
    lastName,
    username,
    photos,
    totalFollowers,
    totalFollowings,
    isMe,
}) {
    const {width, height} = useWindowDimensions();
    const navigation = useNavigation();

    return (
        <Container style={{height:height}}>
            <ProfileContainer>
                <Avatar source={{uri: avatar}} />
                <ProfileInfo>
                    <Col>
                        <PhotoNum>{photos.length}</PhotoNum>
                        <PhotoNumText>Posts</PhotoNumText>
                    </Col>
                    <Col>
                        <Followers>{totalFollowers}</Followers>
                        <FollowersText>Followers</FollowersText>
                    </Col>
                    <Col>
                        <Followings>{totalFollowings}</Followings>
                        <FollowingsText>Followings</FollowingsText>
                    </Col>
                </ProfileInfo>
            </ProfileContainer>
            <ProfileBioContainer>
                <Name>{firstName} {lastName}</Name>
                <Username>{username}</Username>
                {bio? <Bio>{bio}</Bio> : null}
            </ProfileBioContainer>
            <PhotoContainer>
                {photos?.map(feed => 
                    <PhotoTouch key={feed.id} onPress={()=> navigation.navigate("Photo")}>
                        <PhotoFeed key={feed.id} resizeMode="cover" source={{uri: feed.file}} />
                    </PhotoTouch>
                )}
            </PhotoContainer>
        </Container>
    )
}

MyProfile.propTypes = {
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    avatar: PropTypes.string,
    photos: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.number.isRequired,
        file: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        commentNumber: PropTypes.number.isRequired,
        isLiked: PropTypes.bool.isRequired
        })
    ),
    isMe: PropTypes.bool,
    totalFollowings: PropTypes.number,
    totalFollowers: PropTypes.number,
}

export default MyProfile;
