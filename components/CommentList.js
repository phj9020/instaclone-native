import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import moment from 'moment';

const Container = styled.View`
    padding: 0px 5px;
    background-color: ${props=> props.theme.boxColor.backgroundColor}
`

const CommentContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px 0px;
`

const Col = styled.View``

const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 5px;
`

const DefaultAvatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 5px;
`

const Username = styled.Text`
    color: ${props => props.theme.boxColor.color};
    font-size: 12px;
`

const Date = styled.Text`
    font-size: 12px;
    color: ${props => props.theme.boxColor.color};
`

const Payload = styled.Text`
    color: ${props => props.theme.boxColor.color};
    margin-left: 5px;
`


function CommentList({id, user, payload, isMine, createdAt}) {

    return (
        <Container>
            <CommentContainer>
                <Col>
                    {user?.avatar === null ? <DefaultAvatar source={require("../assets/profile.jpg")} /> : 
                        <Avatar source={{uri: user?.avatar}}/>
                    }
                </Col>
                <Col>
                    <Username key={user?.id}>{user?.username}</Username>
                    <Date>{moment.unix(createdAt / 1000).endOf('day').fromNow()}</Date>
                </Col>
                <Col>
                    <Payload>{payload}</Payload>
                </Col>
            </CommentContainer>
            
        </Container>
    )
}

CommentList.propTypes = {
    id: PropTypes.number,
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string
    }),
    payload: PropTypes.string,
    isMine: PropTypes.bool,
    createdAt: PropTypes.string
}

export default CommentList;
